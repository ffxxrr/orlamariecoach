export default function AboutOMMethod() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-6xl mb-4 block">ॐ</span>
          <h2 className="font-crimson text-3xl md:text-4xl text-forest-deep mb-6">
            The OM Method
          </h2>
          <div className="w-20 h-1 bg-forest-deep/20 mx-auto mb-8"></div>
          <p className="text-medium-text max-w-3xl mx-auto">
            A personalised approach to mindfulness practice that harmoniously blends traditional wisdom 
            with modern application, making meditation accessible and relevant to your daily life.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-pure-light rounded-lg p-8 shadow-sm">
            <div className="w-16 h-16 bg-forest-deep/10 rounded-full flex items-center justify-center mb-6">
              <span className="text-3xl">🌱</span>
            </div>
            <h3 className="text-xl text-forest-deep font-medium mb-3">
              Observe
            </h3>
            <p className="text-medium-text">
              Learn to observe your thoughts, emotions, and physical sensations with gentle, 
              non-judgmental awareness. This foundational skill creates space between stimulus and response, 
              allowing for more intentional choices.
            </p>
          </div>
          
          <div className="bg-pure-light rounded-lg p-8 shadow-sm">
            <div className="w-16 h-16 bg-forest-deep/10 rounded-full flex items-center justify-center mb-6">
              <span className="text-3xl">🧠</span>
            </div>
            <h3 className="text-xl text-forest-deep font-medium mb-3">
              Mindfulness
            </h3>
            <p className="text-medium-text">
              Cultivate present-moment awareness through formal meditation practices and informal 
              mindful moments throughout your day. This dual approach integrates mindfulness seamlessly 
              into your lifestyle.
            </p>
          </div>
          
          <div className="bg-pure-light rounded-lg p-8 shadow-sm">
            <div className="w-16 h-16 bg-forest-deep/10 rounded-full flex items-center justify-center mb-6">
              <span className="text-3xl">♥️</span>
            </div>
            <h3 className="text-xl text-forest-deep font-medium mb-3">
              Meaning
            </h3>
            <p className="text-medium-text">
              Connect your mindfulness practice with what matters most to you. By aligning practice 
              with your values and intentions, meditation becomes a powerful tool for creating a more 
              meaningful, purposeful life.
            </p>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-medium-text italic max-w-3xl mx-auto">
            "The OM Method creates harmony between your inner world and daily life, making meditation 
            not just a practice, but a way of being."
          </p>
          <p className="text-forest-deep font-medium mt-4">— Orla Marie</p>
        </div>
      </div>
    </section>
  )
}
