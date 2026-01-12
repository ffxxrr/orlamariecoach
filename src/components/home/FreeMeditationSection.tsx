export default function FreeMeditationSection() {
  return (
    <section id="insight-timer" className="py-16 px-4 bg-gradient-to-br from-pure-light to-light-border relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-living-green/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-sage-calm/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-6xl mx-auto">
        {/* Insight Timer Widget */}
        <div className="text-center mb-8">
          <h2 className="font-crimson text-3xl md:text-4xl text-forest-deep mb-3">
            Listen on Insight Timer
          </h2>
          <p className="text-medium-text max-w-2xl mx-auto">
            Explore guided meditations on one of the world&apos;s most popular meditation platforms.
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          <iframe
            style={{ borderRadius: '16px' }}
            width="100%"
            height="455"
            title="Insight Timer Embed: Orla Mullan"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            src="https://widgets.insighttimer.com/publisher/tCmOCMYVtsRBSOLCDIBDCmgiXk43?created_at=1768209500&cid=tCmOCMYVtsRBSOLCDIBDCmgiXk43"
          />
        </div>
      </div>
    </section>
  )
}
