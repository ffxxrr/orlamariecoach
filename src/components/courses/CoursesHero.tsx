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
              <span className="text-xl">👥</span>
              <span className="text-medium-text">500+ Students Trained</span>
            </div>
            
            <div className="h-4 w-px bg-light-border hidden md:block"></div>
            
            <div className="flex items-center gap-2">
              <span className="text-xl">⭐</span>
              <span className="text-medium-text">4.9/5 Average Rating</span>
            </div>
            
            <div className="h-4 w-px bg-light-border hidden md:block"></div>
            
            <div className="flex items-center gap-2">
              <span className="text-xl">🌍</span>
              <span className="text-medium-text">Students from 30+ Countries</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
