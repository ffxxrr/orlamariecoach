export default function CoursesHero() {
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
          OM Method Mindfulness Courses
        </h1>
        
        <p className="text-lg md:text-xl text-medium-text mb-8 max-w-3xl mx-auto">
          Structured programmes designed to help you establish a sustainable meditation practice
          and integrate mindfulness into your daily life.
        </p>
        
        <div className="flex justify-center">
          <div className="flex flex-wrap items-center gap-6 bg-white/70 backdrop-blur-sm px-6 py-3 rounded-full shadow-sm">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-forest-deep/10 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-forest-deep"><path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4S8 5.79 8 8s1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
              </div>
              <span className="text-medium-text">500+ Students Trained</span>
            </div>
            
            <div className="h-4 w-px bg-light-border hidden md:block"></div>
            
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-forest-deep/10 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-forest-deep"><path fill="currentColor" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
              </div>
              <span className="text-medium-text">4.9/5 Average Rating</span>
            </div>
            
            <div className="h-4 w-px bg-light-border hidden md:block"></div>
            
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-forest-deep/10 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-forest-deep"><path fill="currentColor" d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 18.93V20h-2v.93A8.001 8.001 0 014.07 13H5v-2H4.07A8.001 8.001 0 0111 3.07V4h2V3.07A8.001 8.001 0 0119.93 11H19v2h.93A8.001 8.001 0 0113 20.93z"/></svg>
              </div>
              <span className="text-medium-text">Students from 30+ Countries</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
