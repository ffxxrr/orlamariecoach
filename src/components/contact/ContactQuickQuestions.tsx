import Link from 'next/link'

const questionCategories = [
  {
    id: 1,
    icon: "🧘‍♀️",
    title: "Getting Started with Meditation",
    description: "Perfect for complete beginners who want to understand the basics and find the right approach for their lifestyle.",
    questions: [
      "I've never meditated before - where do I start?",
      "How much time do I need to practice daily?",
      "What if I can't stop my mind from racing?",
      "Which technique would work best for me?"
    ],
    linkText: "Ask About Starting"
  },
  {
    id: 2,
    icon: "🎓",
    title: "Course Recommendations",
    description: "Get personalised advice on which online course would be the perfect fit for your experience level and goals.",
    questions: [
      "Which course is right for my experience level?",
      "What's included in the courses?",
      "Can I switch between courses?",
      "Do you offer payment plans?"
    ],
    linkText: "Course Guidance"
  },
  {
    id: 3,
    icon: "🌱",
    title: "Deepening Your Practice",
    description: "For those with some meditation experience who want to take their practice to the next level with personalised guidance.",
    questions: [
      "How can I deepen my existing practice?",
      "I'm stuck in my meditation - what next?",
      "Can you help me with specific challenges?",
      "How do I integrate Celtic spirituality?"
    ],
    linkText: "Deepen Practice"
  },
  {
    id: 4,
    icon: "🏢",
    title: "Workplace & Stress Management",
    description: "Practical meditation solutions for busy professionals dealing with stress, focus issues, and work-life balance.",
    questions: [
      "How can meditation help with work stress?",
      "I'm too busy - can meditation still work?",
      "Quick techniques for stressful moments?",
      "Building a sustainable practice with a busy schedule?"
    ],
    linkText: "Workplace Solutions"
  }
]

export default function ContactQuickQuestions() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-crimson text-3xl md:text-4xl text-forest-deep mb-4">
            What Can I Help You With?
          </h2>
          
          <p className="text-medium-text max-w-2xl mx-auto">
            I love answering questions about meditation and helping people find their perfect path to inner peace. 
            Here are some common areas where I provide guidance.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {questionCategories.map((category) => (
            <div 
              key={category.id}
              className="bg-pure-light rounded-xl p-6 border border-living-green/10 shadow-sm 
                         hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-sage-calm to-living-green rounded-full 
                              flex items-center justify-center text-white text-2xl mb-4 mx-auto">
                <span>{category.icon}</span>
              </div>
              
              <h3 className="font-crimson text-xl text-forest-deep mb-3 text-center">
                {category.title}
              </h3>
              
              <p className="text-medium-text mb-4 text-center">
                {category.description}
              </p>
              
              <div className="bg-white/70 rounded-lg p-4 mb-6 flex-grow">
                <h4 className="text-forest-deep font-medium text-sm mb-2">Common Questions:</h4>
                <ul className="space-y-1">
                  {category.questions.map((question, index) => (
                    <li key={index} className="flex items-start gap-2 text-medium-text text-sm">
                      <span className="text-living-green mt-1">•</span>
                      <span>"{question}"</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <Link
                href="#contact-form"
                className="btn btn-secondary text-center self-center"
              >
                {category.linkText}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
