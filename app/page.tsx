import Image from "next/image";
import { FichaForm } from "./ficha-form";
import { Flame } from "./flame";

export default function Home() {
  return (
    <div className="relative isolate min-h-dvh flex-1 overflow-x-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(210,31,40,0.35),transparent_52%),radial-gradient(ellipse_at_bottom,rgba(255,106,0,0.18),transparent_46%)]" />

      <Flame
        id="flame-side-l"
        className="pointer-events-none absolute top-16 -left-2 hidden h-[min(78vh,640px)] w-36 opacity-95 drop-shadow-[0_0_18px_rgba(255,106,0,0.55)] lg:block"
      />
      <Flame
        id="flame-side-r"
        className="pointer-events-none absolute top-16 -right-2 hidden h-[min(78vh,640px)] w-36 -scale-x-100 opacity-95 drop-shadow-[0_0_18px_rgba(255,106,0,0.55)] lg:block"
      />

      <main className="relative z-10 mx-auto flex w-full max-w-xl flex-col items-center px-3 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(2.5rem,env(safe-area-inset-bottom))] sm:px-6">
        <Image
          src="/brasao-notfars.png"
          alt="Brasão da guilda NotFars"
          width={969}
          height={1024}
          priority
          className="h-auto w-[min(78vw,440px)] drop-shadow-[0_18px_30px_rgba(0,0,0,0.45)]"
        />

        <div className="-mt-1 flex w-full max-w-full items-center justify-center gap-2 sm:gap-3">
          <Flame id="flame-title-l" className="h-12 w-6 shrink-0 drop-shadow-[0_0_10px_rgba(255,140,0,0.8)] sm:h-16 sm:w-8" />
          <div className="min-w-0 text-center">
            <p className="font-display text-xl tracking-[0.06em] text-[#f0c14b] uppercase sm:text-3xl sm:tracking-[0.12em]">
              Recrutamento
            </p>
            <p className="font-display text-base tracking-[0.16em] text-[#fff1c9] uppercase sm:text-lg sm:tracking-[0.28em]">
              Guilda
            </p>
          </div>
          <Flame
            id="flame-title-r"
            className="h-12 w-6 shrink-0 -scale-x-100 drop-shadow-[0_0_10px_rgba(255,140,0,0.8)] sm:h-16 sm:w-8"
          />
        </div>

        <h1 className="font-pixel mt-3 text-center text-[0.72rem] leading-relaxed text-[#ff4b2e] sm:text-xl">
          NOTFARS
        </h1>
        <p className="mt-2 text-center text-xs tracking-[0.22em] text-[#f0c14b] uppercase sm:text-sm sm:tracking-[0.35em]">
          Free Fire
        </p>
        <p className="mt-4 max-w-sm px-1 text-center text-sm leading-6 text-[#f4e6c8]">
          Entra na guilda. Manda teu nome ou ID, a patente, o nível e a função que você joga melhor.
        </p>

        <div className="mt-6 w-full">
          <FichaForm />
        </div>
      </main>
    </div>
  );
}
