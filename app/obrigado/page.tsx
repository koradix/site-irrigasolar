import type { Metadata } from 'next';
import { ObrigadoView } from './ObrigadoView';

export const metadata: Metadata = {
  title: 'Obrigado — Irrigasolar',
  description: 'Sua configuração foi recebida. A proposta chega no seu WhatsApp em até 10 minutos.',
  robots: { index: false, follow: false },
};

export default function ObrigadoPage() {
  return <ObrigadoView />;
}
