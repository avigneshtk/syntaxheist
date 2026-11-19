
export default function Home() {
  return (
    <main className="min-h-screen bg-[#080b08] text-white flex flex-col items-center justify-center px-6">
      <div className="text-center space-y-6">
        <p className="text-[#72ff75] text-sm tracking-[0.4em] uppercase">
          IEEE FISAT Student Branch Presents
        </p>

        <h1 className="text-6xl md:text-8xl font-black tracking-tighter">
          SYNTAX<span className="text-[#72ff75]">HEIST</span>
        </h1>

        <p className="text-gray-400 text-lg md:text-xl tracking-wide">
          BREAK THE CODE. BUILD THE FUTURE.
        </p>

        <div className="pt-6">
          <span className="border border-[#72ff75]/40 px-5 py-3 rounded-full text-sm text-[#72ff75]">
            24 HOURS. LIMITLESS INNOVATION.
          </span>
        </div>
      </div>
    </main>
  );
}
