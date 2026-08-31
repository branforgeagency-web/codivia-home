import CodiviaLogo from '../ui/CodiviaLogo.jsx'

export default function Footer() {
  return (
    <footer id="contact" className="bg-charcoal border-t border-bone/10 pt-12 sm:pt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 gap-8 pb-12 sm:grid-cols-2 lg:grid-cols-4 sm:gap-12 sm:pb-16">
          <div>
            <CodiviaLogo variant="compact" theme="dark" height={34} showTagline={true} />
            <p className="mt-4 max-w-xs text-xs sm:text-sm leading-relaxed text-bone/60">
              A practice-first medical coding platform — real workflows, de-identified charts,
              direct enrolment.
            </p>
          </div>

          <div>
            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-bone/40">Platform</p>
            <ul className="mt-3 sm:mt-4 space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-bone/70">
              <li><a href="#departments" className="hover:text-accent transition">Departments</a></li>
              <li><a href="#journey" className="hover:text-accent transition">How it works</a></li>
              <li><a href="#demo" className="hover:text-accent transition">Try a code</a></li>
              <li><a href="#pricing" className="hover:text-accent transition">Pricing</a></li>
            </ul>
          </div>

          <div>
            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-bone/40">Company</p>
            <ul className="mt-3 sm:mt-4 space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-bone/70">
              <li><a href="#faq" className="hover:text-accent transition">FAQ &amp; Policies</a></li>
              <li><a href="#hero" className="hover:text-accent transition">Placement statistics</a></li>
              <li><a href="mailto:hello@codivia.in" className="hover:text-accent transition">hello@codivia.in</a></li>
            </ul>
          </div>

          <div>
            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-bone/40">HQ — Coimbatore</p>
            <address className="mt-3 sm:mt-4 space-y-1 text-xs sm:text-sm not-italic leading-relaxed text-bone/70">
              <p>CODIVIA, ThoughtFlows</p>
              <p>Coimbatore, Tamil Nadu, India</p>
              <p className="pt-2"><a href="tel:+910000000000" className="hover:text-accent transition">+91-000-000-0000</a></p>
            </address>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-bone/10 py-6 sm:py-8 text-[11px] sm:text-xs text-bone/45 sm:flex-row text-center sm:text-left">
          <p>© {new Date().getFullYear()} CODIVIA. A product of ThoughtFlows. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <a href="#" className="hover:text-bone/80 transition">Privacy Policy</a>
            <a href="#" className="hover:text-bone/80 transition">Terms of Service</a>
            <a href="#" className="hover:text-bone/80 transition">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
