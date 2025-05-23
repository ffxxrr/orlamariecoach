import { Logo } from '@/components/brand'
import CelticTriskelion from './CelticTriskelion'

export default function BrandSystem() {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-sm">
      <h1 className="text-3xl font-crimson text-forest-deep mb-8">OrlaMarieCoach Brand System</h1>
      
      {/* Logo Variants */}
      <section className="mb-12">
        <h2 className="text-2xl font-crimson text-forest-deep mb-4 border-b pb-2">Logo Variants</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="p-6 border border-light-border rounded-lg">
            <h3 className="text-lg font-medium mb-4">Default - With Text</h3>
            <Logo withText={true} />
          </div>
          
          <div className="p-6 border border-light-border rounded-lg">
            <h3 className="text-lg font-medium mb-4">Default - Icon Only</h3>
            <Logo withText={false} />
          </div>
          
          <div className="p-6 border border-light-border rounded-lg bg-deep-text">
            <h3 className="text-lg font-medium mb-4 text-white">Dark Variant</h3>
            <Logo variant="dark" withText={true} />
          </div>
          
          <div className="p-6 border border-light-border rounded-lg bg-sage-calm/10">
            <h3 className="text-lg font-medium mb-4">Light Variant</h3>
            <Logo variant="light" withText={true} />
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 border border-light-border rounded-lg">
            <h3 className="text-sm font-medium mb-2">Extra Small</h3>
            <Logo size="sm" />
          </div>
          
          <div className="p-4 border border-light-border rounded-lg">
            <h3 className="text-sm font-medium mb-2">Small</h3>
            <Logo size="md" />
          </div>
          
          <div className="p-4 border border-light-border rounded-lg">
            <h3 className="text-sm font-medium mb-2">Medium</h3>
            <Logo size="lg" />
          </div>
          
          <div className="p-4 border border-light-border rounded-lg">
            <h3 className="text-sm font-medium mb-2">Large</h3>
            <Logo size="xl" />
          </div>
        </div>
      </section>
      
      {/* Celtic Triskelion Symbol */}
      <section className="mb-12">
        <h2 className="text-2xl font-crimson text-forest-deep mb-4 border-b pb-2">Celtic Triskelion Symbol</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 border border-light-border rounded-lg">
            <h3 className="text-lg font-medium mb-4">Favicon Design</h3>
            <div className="flex justify-center">
              <CelticTriskelion size={100} />
            </div>
          </div>
          
          <div className="p-6 border border-light-border rounded-lg">
            <h3 className="text-lg font-medium mb-4">Symbol Meaning</h3>
            <ul className="space-y-2">
              <li><strong>Mind, Body, Spirit:</strong> Alignment of whole being</li>
              <li><strong>Past, Present, Future:</strong> Time awareness in meditation</li>
              <li><strong>Earth, Water, Air:</strong> Connection to natural elements</li>
            </ul>
          </div>
        </div>
      </section>
      
      {/* Color System */}
      <section className="mb-12">
        <h2 className="text-2xl font-crimson text-forest-deep mb-4 border-b pb-2">Brand Colors</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="h-24 bg-forest-deep rounded-lg shadow-sm mb-2"></div>
            <div className="text-sm">
              <p className="font-medium">Forest Deep</p>
              <p className="text-medium-text">#2d5a27</p>
            </div>
          </div>
          
          <div>
            <div className="h-24 bg-sage-calm rounded-lg shadow-sm mb-2"></div>
            <div className="text-sm">
              <p className="font-medium">Sage Calm</p>
              <p className="text-medium-text">#4a7c59</p>
            </div>
          </div>
          
          <div>
            <div className="h-24 bg-living-green rounded-lg shadow-sm mb-2"></div>
            <div className="text-sm">
              <p className="font-medium">Living Green</p>
              <p className="text-medium-text">#7fb069</p>
            </div>
          </div>
          
          <div>
            <div className="h-24 bg-ocean-breath rounded-lg shadow-sm mb-2"></div>
            <div className="text-sm">
              <p className="font-medium">Ocean Breath</p>
              <p className="text-medium-text">#5a9bb5</p>
            </div>
          </div>
          
          <div>
            <div className="h-24 bg-earth-warmth rounded-lg shadow-sm mb-2"></div>
            <div className="text-sm">
              <p className="font-medium">Earth Warmth</p>
              <p className="text-medium-text">#d4a574</p>
            </div>
          </div>
          
          <div>
            <div className="h-24 bg-pure-light rounded-lg shadow-sm mb-2 border border-light-border"></div>
            <div className="text-sm">
              <p className="font-medium">Pure Light</p>
              <p className="text-medium-text">#f8fffe</p>
            </div>
          </div>
          
          <div>
            <div className="h-24 bg-deep-text rounded-lg shadow-sm mb-2"></div>
            <div className="text-sm">
              <p className="font-medium">Deep Text</p>
              <p className="text-medium-text">#2c3e50</p>
            </div>
          </div>
          
          <div>
            <div className="h-24 bg-medium-text rounded-lg shadow-sm mb-2"></div>
            <div className="text-sm">
              <p className="font-medium">Medium Text</p>
              <p className="text-medium-text">#5a7c5a</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Typography */}
      <section>
        <h2 className="text-2xl font-crimson text-forest-deep mb-4 border-b pb-2">Typography</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 border border-light-border rounded-lg">
            <h3 className="text-lg font-medium mb-4">Crimson Pro (Headings)</h3>
            <div className="space-y-4">
              <p className="font-crimson text-4xl">Mindful Living</p>
              <p className="font-crimson text-3xl">Find Your Center</p>
              <p className="font-crimson text-2xl">The OM Method</p>
              <p className="font-crimson text-xl">Peaceful Journey</p>
            </div>
          </div>
          
          <div className="p-6 border border-light-border rounded-lg">
            <h3 className="text-lg font-medium mb-4">Inter (Body Text)</h3>
            <div className="space-y-4">
              <p className="text-base">Discover the transformative power of mindfulness with personalised guidance rooted in traditional wisdom and modern understanding.</p>
              <p className="text-sm">Our approach combines ancient practices with contemporary science for holistic well-being.</p>
              <p className="font-medium">Create a foundation for lasting inner peace and balanced living.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
