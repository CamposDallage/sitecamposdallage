import { CheckCircle2, Users, Award, ThumbsUp, FileText, Calendar, Camera, ShieldCheck } from 'lucide-react';

const reasons = [
  { icon: Award, title: 'Expérience dans le béton', description: "Plus de 15 ans d'expertise." },
  { icon: Users, title: 'Pour pros et particuliers', description: "Sous-traitance et accompagnement complet." },
  { icon: ThumbsUp, title: 'Multiples finitions', description: 'Imprimé, désactivé, drainant, quartzé, poli, résine...' },
  { icon: CheckCircle2, title: 'Accompagnement de A à Z', description: "De la préparation à la finition." },
  { icon: FileText, title: 'Devis provisoire en ligne', description: 'Estimation instantanée.' },
  { icon: Calendar, title: 'Rendez-vous en ligne', description: 'Réservation directe.' },
  { icon: Camera, title: 'Photos et vidéos', description: 'Réalisations en haute qualité.' },
  { icon: ShieldCheck, title: 'Qualité garantie', description: 'Matériaux professionnels.' }
];

export default function WhyChooseUs() {
  return (
    <section className="section bg-primary-950 text-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Pourquoi choisir <span className="text-gradient">CamposDallage</span> ?</h2>
          <p className="text-concrete-300 text-lg">Une entreprise sérieuse, expérimentée et à l'écoute.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((r, i) => (
            <div key={i} className="bg-primary-900/50 border border-primary-800 rounded-xl p-6 hover:bg-primary-900 transition-colors">
              <div className="w-12 h-12 bg-accent-500 rounded-lg flex items-center justify-center mb-4">
                <r.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">{r.title}</h3>
              <p className="text-concrete-400 text-sm">{r.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
