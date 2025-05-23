import { BrandSystem } from '@/components/brand'

export const metadata = {
  title: 'Brand System | OrlaMarieCoach',
  description: 'OrlaMarieCoach brand guidelines, logo usage, and design system',
}

export default function BrandPage() {
  return (
    <main className="py-12 px-4 bg-light-border min-h-screen">
      <BrandSystem />
    </main>
  )
}
