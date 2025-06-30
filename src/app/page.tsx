import Footer from '@/components/footer'
import Hero from '@/components/hero'
import TopCategories from '@/components/topCategories'

export default async function Home() {
  return (
    <section className="flex flex-col items-center justify-start min-h-screen min-w-screen">
      <Hero />
      <TopCategories />
      <Footer />
    </section>
  )
}
