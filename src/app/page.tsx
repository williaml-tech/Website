import Header from '@/components/Header';
import HeroSwiper from '@/components/HeroSwiper';
import Services from '@/components/Services';
import BeforeAfter from '@/components/BeforeAfter';
import Promotions from '@/components/Promotions';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section with Swiper */}
        <HeroSwiper />
        {/* Our Services */}
        <div className="mt-6 sm:mt-16 lg:mt-28">
          <Services />
        </div>
        {/* Before / After */}
        <div className="mt-6 sm:mt-12 lg:mt-20">
          <BeforeAfter />
        </div>
        {/* Current Promotions */}
        <div className="mt-6 sm:mt-12 lg:mt-20">
          <Promotions />
        </div>
      </main>
      <Footer />
    </div>
  );
}
