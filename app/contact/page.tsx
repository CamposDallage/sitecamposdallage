import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';

export default function ContactPage() {
  return (
    <>
      <section className="bg-primary-950 text-white py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contactez-<span className="text-gradient">nous</span></h1>
        </div>
      </section>
      <section className="section">
        <div className="container grid lg:grid-cols-[1fr,400px] gap-10">
          <div className="card p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-6">Envoyez-nous un message</h2>
            <form className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div><label className="label">Nom *</label><input required className="input" /></div>
                <div><label className="label">Email *</label><input type="email" required className="input" /></div>
              </div>
              <div><label className="label">Message *</label><textarea required rows={6} className="input"></textarea></div>
              <button type="submit" className="btn-primary w-full"><Send className="w-5 h-5" />Envoyer</button>
            </form>
          </div>
          <div className="space-y-4">
            <div className="card p-6">
              <h3 className="font-bold mb-4">Nos coordonnées</h3>
              <div className="space-y-4 text-sm">
                <div className="flex gap-3"><Phone className="w-5 h-5 text-accent-600" /><div><div className="font-medium">Téléphone</div><a href="tel:+33760000000" className="text-concrete-600">07 6X XX XX XX</a></div></div>
                <div className="flex gap-3"><Mail className="w-5 h-5 text-accent-600" /><div><div className="font-medium">Email</div><span className="text-concrete-600">contact@camposdallage.com</span></div></div>
                <div className="flex gap-3"><MapPin className="w-5 h-5 text-accent-600" /><div><div className="font-medium">Zone</div><span className="text-concrete-600">Rennes, Bretagne</span></div></div>
                <div className="flex gap-3"><Clock className="w-5 h-5 text-accent-600" /><div><div className="font-medium">Horaires</div><span className="text-concrete-600">Lun-Ven : 8h-18h</span></div></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
