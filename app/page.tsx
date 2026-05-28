import { Hero } from '@/components/sections/Hero';
import { AuthorityBar } from '@/components/sections/AuthorityBar';
import { Configurador } from '@/components/configurador/Configurador';
import { ProvaSocial } from '@/components/sections/ProvaSocial';
import { IrrigaBox } from '@/components/sections/IrrigaBox';
import { FAQ } from '@/components/sections/FAQ';
import { Footer } from '@/components/sections/Footer';

export default function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <AuthorityBar />
        <Configurador />
        <ProvaSocial />
        <IrrigaBox />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
