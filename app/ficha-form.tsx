"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { Flame } from "./flame";

const PATENTES = [
  "Bronze I",
  "Bronze II",
  "Bronze III",
  "Prata I",
  "Prata II",
  "Prata III",
  "Ouro I",
  "Ouro II",
  "Ouro III",
  "Platina I",
  "Platina II",
  "Platina III",
  "Diamante I",
  "Diamante II",
  "Diamante III",
  "Heróico",
  "Mestre",
  "Grão-Mestre",
  "Desafiante",
];

const FUNCOES = ["Rush", "Suporte", "Atirador", "Granadeiro", "Defensor", "Coringa"];

type Modo = "nick" | "id";

type Ficha = {
  modo: Modo;
  identificador: string;
  patente: string;
  level: string;
  chamado: string;
  funcao: string;
};

type Field = "identificador" | "patente" | "level" | "chamado" | "funcao";

const inputClass =
  "h-12 w-full rounded-xl border border-[#e7c25a]/45 bg-[#0c090d] px-4 text-base text-[#f8efd8] outline-none transition placeholder:text-[#8d7d66] focus:border-[#f0c14b] focus:ring-2 focus:ring-[#f0c14b]/40";

export function FichaForm() {
  const [modo, setModo] = useState<Modo>("nick");
  const [identificador, setIdentificador] = useState("");
  const [patente, setPatente] = useState("");
  const [level, setLevel] = useState("");
  const [chamado, setChamado] = useState("");
  const [funcao, setFuncao] = useState("");
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [ficha, setFicha] = useState<Ficha | null>(null);

  function escolherModo(next: Modo) {
    setModo(next);
    setIdentificador((atual) => (next === "id" ? atual.replace(/\D/g, "") : atual));
    setErrors((atual) => ({ ...atual, identificador: undefined }));
  }

  function validate(): Partial<Record<Field, string>> {
    const next: Partial<Record<Field, string>> = {};
    const valor = identificador.trim();

    if (modo === "nick") {
      if (!valor) next.identificador = "Coloca teu nome no Free Fire.";
    } else if (!/^\d{4,12}$/.test(valor)) {
      next.identificador = "O ID é o número do perfil, sem letras.";
    }

    if (!patente) next.patente = "Escolhe a patente.";
    const levelNumber = Number(level);
    if (!level || !Number.isInteger(levelNumber) || levelNumber < 1 || levelNumber > 200) {
      next.level = "Coloca o nível da conta.";
    }
    if (!chamado.trim()) next.chamado = "Diz como a guilda deve te chamar.";
    if (!funcao) next.funcao = "Escolhe a função que você joga melhor.";

    return next;
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setFicha({
      modo,
      identificador: identificador.trim(),
      patente,
      level: String(Number(level)),
      chamado: chamado.trim(),
      funcao,
    });
  }

  if (ficha) {
    return (
      <section className="guild-card" aria-live="polite">
        <header className="guild-card-cap">
          <Flame id="flame-cap-ok-l" className="h-8 w-4 shrink-0 sm:h-10 sm:w-5" />
          <p className="font-pixel text-[clamp(0.5rem,2.5vw,0.75rem)] tracking-[0.08em] text-[#fff4d2]">
            FICHA PRONTA
          </p>
          <Flame id="flame-cap-ok-r" className="h-8 w-4 shrink-0 -scale-x-100 sm:h-10 sm:w-5" />
        </header>
        <div className="space-y-4 px-3.5 py-5 sm:px-7 sm:py-6">
          <p className="text-center text-sm leading-6 text-[#f3e2bc]">
            Confere e tira um print. Manda pra liderança da guilda.
          </p>
          <dl className="space-y-3 text-sm">
            <Linha rotulo={ficha.modo === "nick" ? "Nome" : "ID"} valor={ficha.identificador} />
            <Linha rotulo="Patente" valor={ficha.patente} />
            <Linha rotulo="Nível" valor={ficha.level} />
            <Linha rotulo="Chamar de" valor={ficha.chamado} />
            <Linha rotulo="Função" valor={ficha.funcao} />
          </dl>
          <button
            type="button"
            className="guild-button"
            onClick={() => setFicha(null)}
          >
            Editar ficha
          </button>
        </div>
      </section>
    );
  }

  return (
    <form className="guild-card" onSubmit={onSubmit} noValidate>
      <header className="guild-card-cap">
        <Flame id="flame-cap-l" className="h-8 w-4 shrink-0 sm:h-10 sm:w-5" />
        <p className="font-pixel text-[clamp(0.48rem,2.35vw,0.75rem)] tracking-[0.06em] text-[#fff4d2]">
          FICHA DE ENTRADA
        </p>
        <Flame id="flame-cap-r" className="h-8 w-4 shrink-0 -scale-x-100 sm:h-10 sm:w-5" />
      </header>

      <div className="space-y-5 px-3.5 py-5 sm:px-7 sm:py-6">
        <div>
          <span className="field-label" id="identificador-label">
            Nome ou ID do jogador
          </span>
          <div className="mt-2 grid grid-cols-2 gap-2" role="group" aria-label="Tipo de identificação">
            <ModoButton ativo={modo === "nick"} onClick={() => escolherModo("nick")}>
              Nome
            </ModoButton>
            <ModoButton ativo={modo === "id"} onClick={() => escolherModo("id")}>
              ID
            </ModoButton>
          </div>
          <input
            className={`${inputClass} mt-2`}
            aria-labelledby="identificador-label"
            name="identificador"
            inputMode={modo === "id" ? "numeric" : "text"}
            autoComplete="off"
            maxLength={modo === "id" ? 12 : 16}
            placeholder={modo === "id" ? "Número do perfil" : "Seu nome no Free Fire"}
            value={identificador}
            aria-invalid={Boolean(errors.identificador)}
            aria-describedby="identificador-ajuda"
            onChange={(event) => {
              const value = event.target.value;
              setIdentificador(modo === "id" ? value.replace(/\D/g, "") : value);
            }}
          />
          <p id="identificador-ajuda" className="mt-2 text-xs leading-5 text-[#cbb892]">
            Se o nome não couber, usa o ID. É o número do perfil pra te achar.
          </p>
          <Erro mensagem={errors.identificador} />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="field-label">Patente</span>
            <select
              className={`${inputClass} guild-select mt-2`}
              name="patente"
              value={patente}
              aria-invalid={Boolean(errors.patente)}
              onChange={(event) => setPatente(event.target.value)}
            >
              <option value="">Escolhe a patente</option>
              {PATENTES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <Erro mensagem={errors.patente} />
          </label>

          <label className="block">
            <span className="field-label">Nível</span>
            <input
              className={`${inputClass} mt-2`}
              name="level"
              inputMode="numeric"
              placeholder="Nível da conta"
              value={level}
              aria-invalid={Boolean(errors.level)}
              onChange={(event) => setLevel(event.target.value.replace(/\D/g, "").slice(0, 3))}
            />
            <Erro mensagem={errors.level} />
          </label>
        </div>

        <label className="block">
          <span className="field-label">Como a guilda deve te chamar</span>
          <input
            className={`${inputClass} mt-2`}
            name="chamado"
            autoComplete="nickname"
            maxLength={24}
            placeholder="O nome dentro da guilda"
            value={chamado}
            aria-invalid={Boolean(errors.chamado)}
            onChange={(event) => setChamado(event.target.value)}
          />
          <Erro mensagem={errors.chamado} />
        </label>

        <fieldset>
          <legend className="field-label">Função que você joga melhor</legend>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {FUNCOES.map((item) => {
              const ativo = funcao === item;
              return (
                <label
                  key={item}
                  className={`flex min-h-11 cursor-pointer items-center justify-center rounded-xl border px-1 text-center text-[0.8rem] leading-tight font-semibold transition sm:text-sm ${
                    ativo
                      ? "border-[#f0c14b] bg-gradient-to-b from-[#ef3a30] to-[#a30f16] text-white shadow-[inset_0_0_0_1px_rgba(255,220,120,0.35)]"
                      : "border-[#e7c25a]/35 bg-[#0c090d] text-[#f3e2bc] hover:border-[#f0c14b]"
                  }`}
                >
                  <input
                    className="sr-only"
                    type="radio"
                    name="funcao"
                    value={item}
                    checked={ativo}
                    onChange={() => setFuncao(item)}
                  />
                  {item}
                </label>
              );
            })}
          </div>
          <Erro mensagem={errors.funcao} />
        </fieldset>

        <button type="submit" className="guild-button">
          Enviar ficha
        </button>
      </div>
    </form>
  );
}

function ModoButton({
  ativo,
  onClick,
  children,
}: {
  ativo: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={ativo}
      onClick={onClick}
      className={`h-11 rounded-lg border text-sm font-semibold tracking-wide transition ${
        ativo
          ? "border-[#f0c14b] bg-[#f0c14b] text-[#1a1006]"
          : "border-[#e7c25a]/40 bg-transparent text-[#f3e2bc] hover:border-[#f0c14b]"
      }`}
    >
      {children}
    </button>
  );
}

function Erro({ mensagem }: { mensagem?: string }) {
  if (!mensagem) return null;
  return (
    <p role="alert" className="mt-2 text-xs font-medium text-[#ffb4a8]">
      {mensagem}
    </p>
  );
}

function Linha({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-[#e7c25a]/25 pb-2">
      <dt className="shrink-0 text-[#cbb892]">{rotulo}</dt>
      <dd className="min-w-0 text-right font-semibold break-words text-[#fff6dc]">{valor}</dd>
    </div>
  );
}
