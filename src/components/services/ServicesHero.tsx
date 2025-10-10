export default function ServicesHero() {
  return (
    <section className="relative bg-gradient-to-br from-pure-light to-light-border py-20 px-4 overflow-hidden z-0">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-80">
        <div 
          className="w-full h-full bg-no-repeat bg-cover bg-center"
          style={{
            background: 'linear-gradient(135deg, rgba(74, 124, 89, 0.05) 0%, rgba(127, 176, 105, 0.05) 100%)'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h1 className="font-crimson text-4xl md:text-5xl font-light text-forest-deep mb-6 leading-tight">
          The OM Method Services
        </h1>
        
        <p className="text-lg md:text-xl text-medium-text mb-8 max-w-3xl mx-auto">
          Personalised mindfulness and meditation services designed to meet you where you are
          and guide you toward greater balance, clarity, and wellbeing.
        </p>
        
        <div className="flex justify-center">
          <div className="flex items-center gap-3 bg-white/70 backdrop-blur-sm px-6 py-3 rounded-full shadow-sm">
            <span className="text-forest-deep font-medium">As featured in:</span>
            <div className="flex items-center gap-4">
              <div className="text-medium-text font-semibold">Irish Times</div>
              <div className="h-4 w-px bg-light-border"></div>
              <div className="text-medium-text font-semibold">Mindful Magazine</div>
              <div className="h-4 w-px bg-light-border"></div>
              <div className="text-medium-text font-semibold">RTE Lifestyle</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
