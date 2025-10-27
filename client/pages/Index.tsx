import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FileText, Users, CheckCircle, Download } from "lucide-react";

export default function Index() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Inscription Simple",
      description: "Créez votre compte en quelques minutes avec vos informations personnelles",
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Déclaration de Naissance",
      description: "Déclarez la naissance de votre enfant en ligne facilement",
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Suivi en Temps Réel",
      description: "Suivez le statut de votre dossier à chaque étape du processus",
    },
    {
      icon: <Download className="w-8 h-8" />,
      title: "Téléchargement Sécurisé",
      description: "Obtenez votre acte de naissance numériquement en toute sécurité",
    },
  ];

  const steps = [
    {
      number: "1",
      title: "Inscription",
      description: "Créez un compte avec vos données personnelles",
    },
    {
      number: "2",
      title: "Vérification",
      description: "Activez votre compte via OTP ou email",
    },
    {
      number: "3",
      title: "Déclaration",
      description: "Remplissez le formulaire de déclaration de naissance",
    },
    {
      number: "4",
      title: "Documents",
      description: "Téléversez les pièces justificatives requises",
    },
    {
      number: "5",
      title: "Vérification",
      description: "La mairie et l'hôpital vérifient votre dossier",
    },
    {
      number: "6",
      title: "Acte",
      description: "Téléchargez votre acte de naissance validé",
    },
  ];

  return (
    <div className="min-h-screen bg-background relative">
      {/* Senegalese Administrative Background */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-r from-primary via-accent to-secondary"></div>
        <div className="absolute bottom-20 right-0 w-96 h-96 bg-primary rounded-full opacity-30"></div>
      </div>

      {/* Senegalese Flag Top Stripe */}
      <div className="h-1 bg-gradient-to-r from-primary via-accent to-secondary fixed top-0 left-0 right-0 z-50"></div>

      {/* Header Navigation */}
      <header className="border-b border-border sticky top-1 bg-card z-50 shadow-md relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-lg">
              C
            </div>
            <h1 className="text-2xl font-bold text-foreground">CIVILE-APP</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={() => navigate("/login")}
              className="text-foreground hover:bg-secondary/10"
            >
              Connexion
            </Button>
            <Button
              onClick={() => navigate("/register")}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              S'inscrire
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-secondary/5 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Déclarez la naissance de votre enfant
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            CIVILE-APP est une plateforme numérique qui simplifie la déclaration de naissance
            de votre enfant. Remplissez votre dossier en ligne et suivez son traitement en temps réel.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate("/register")}
              className="bg-primary hover:bg-primary/90 text-white text-lg px-8"
            >
              Commencer maintenant
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/login")}
              className="text-primary border-primary hover:bg-primary/5 text-lg px-8"
            >
              Je suis déjà inscrit
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-12 text-center">
            Nos avantages
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-card rounded-lg border border-border p-8 text-center hover:shadow-md transition-shadow"
              >
                <div className="flex justify-center mb-4 text-primary">{feature.icon}</div>
                <h4 className="text-lg font-semibold text-foreground mb-3">{feature.title}</h4>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-12 text-center">
            Comment ça marche ?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white font-bold text-lg">
                      {step.number}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-lg font-semibold text-foreground mb-2">{step.title}</h4>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-6 w-0.5 h-24 bg-border"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl sm:text-4xl font-bold mb-6">
            Prêt à commencer ?
          </h3>
          <p className="text-lg mb-8 text-primary-foreground/90">
            Créez votre compte maintenant et déclarez la naissance de votre enfant en quelques minutes.
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/register")}
            className="bg-white text-primary hover:bg-white/90 text-lg px-8"
          >
            S'inscrire gratuitement
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold text-foreground mb-4">CIVILE-APP</h4>
              <p className="text-muted-foreground text-sm">
                Plateforme numérique pour la déclaration de naissance
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Déclaration</a></li>
                <li><a href="#" className="hover:text-primary">Suivi</a></li>
                <li><a href="#" className="hover:text-primary">Téléchargement</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Aide</a></li>
                <li><a href="#" className="hover:text-primary">Contact</a></li>
                <li><a href="#" className="hover:text-primary">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Légal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Politique</a></li>
                <li><a href="#" className="hover:text-primary">Conditions</a></li>
                <li><a href="#" className="hover:text-primary">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 CIVILE-APP. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
