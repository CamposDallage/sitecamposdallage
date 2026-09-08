import type { Metadata } from 'next';
import BookingCalendar from '@/components/BookingCalendar';

export const metadata: Metadata = {
  title: 'Prendre rendez-vous - CamposDallage',
  description: 'Réservez un rendez-vous avec un expert CamposDallage.'
};

export default function RendezVousPage() {
  return (
    <>
      <section className="bg-primary-950 text-white py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Prendre <span className="text-gradient">rendez-vous</span></h1>
          <p className="text-xl text-white/80">Choisissez le créneau qui vous convient.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <BookingCalendar />
        </div>
      </section>
    </>
  );
}
