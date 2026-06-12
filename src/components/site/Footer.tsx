import { TickerText } from "./TickerText";

export function Footer() {
  return (
    <footer className="relative px-6 md:px-10 pt-16 pb-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between label opacity-70 mb-10">
          <span>Hoang Tran · Portfolio</span>
          <span>© 2026</span>
        </div>
      </div>
      <div className="px-6 md:px-10">
        <TickerText
          as="h2"
          className="font-display leading-[0.85] tracking-tight text-center whitespace-nowrap text-[20vw] block"
          duration={700}
          letterStagger={50}
        >
          Hoang Tran
        </TickerText>
      </div>

      <div className="max-w-7xl mx-auto mt-6 flex items-center justify-between label opacity-50">
        <span>Full-Stack · AI · Serverless</span>
        <span>Dekkov</span>
      </div>
    </footer>
  );
}

