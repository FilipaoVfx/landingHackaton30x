import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { HowItWorks } from '@/components/HowItWorks'
import { ConversationTimeline } from '@/components/ConversationTimeline'
import { ReasoningEngine } from '@/components/ReasoningEngine'
import { Channels } from '@/components/Channels'
import { Confianza } from '@/components/Confianza'
import { DashboardPreview } from '@/components/DashboardPreview'
import { CTA } from '@/components/CTA'
import { Footer } from '@/components/Footer'

export default function App() {
  return (
    <div className="min-h-screen text-ink antialiased">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <ConversationTimeline />
        <ReasoningEngine />
        <Channels />
        <Confianza />
        <DashboardPreview />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
