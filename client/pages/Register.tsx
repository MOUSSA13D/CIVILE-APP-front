import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";

export default function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"form" | "verification">("form");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    telephone: "",
    adresse: "",
    email: "",
    motDePasse: "",
    confirmMotDePasse: "",
  });

  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.nom.trim()) newErrors.nom = "Le nom est requis";
    if (!formData.prenom.trim()) newErrors.prenom = "Le prénom est requis";
    if (!formData.telephone.trim()) newErrors.telephone = "Le numéro de téléphone est requis";
    if (!/^\d{9,}$/.test(formData.telephone.replace(/\s/g, ""))) {
      newErrors.telephone = "Le numéro de téléphone doit contenir au moins 9 chiffres";
    }
    if (!formData.adresse.trim()) newErrors.adresse = "L'adresse est requise";
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email invalide";
    }
    if (!formData.motDePasse) newErrors.motDePasse = "Le mot de passe est requis";
    if (formData.motDePasse.length < 8) {
      newErrors.motDePasse = "Le mot de passe doit contenir au moins 8 caractères";
    }
    if (formData.motDePasse !== formData.confirmMotDePasse) {
      newErrors.confirmMotDePasse = "Les mots de passe ne correspondent pas";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep("verification");
    }, 1500);
  };

  const handleVerification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp.trim()) {
      setErrors({ otp: "Le code OTP est requis" });
      return;
    }

    setLoading(true);
    // Simulate verification
    setTimeout(() => {
      setLoading(false);
      // Navigate to dashboard after successful registration
      navigate("/dashboard");
    }, 1500);
  };

  if (step === "verification") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <button
            onClick={() => setStep("form")}
            className="flex items-center gap-2 text-primary hover:text-primary/80 mb-8"
          >
            <ChevronLeft className="w-5 h-5" />
            Retour
          </button>

          <div className="bg-card rounded-lg border border-border p-8 shadow-sm">
            <h2 className="text-3xl font-bold text-foreground mb-2">Vérification</h2>
            <p className="text-muted-foreground mb-8">
              Nous avons envoyé un code OTP à {formData.telephone}. Veuillez le saisir ci-dessous.
            </p>

            <form onSubmit={handleVerification} className="space-y-6">
              <div>
                <Label htmlFor="otp" className="text-foreground font-medium mb-2 block">
                  Code OTP
                </Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Entrez le code OTP"
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value);
                    setErrors({});
                  }}
                  className="text-center text-2xl tracking-widest"
                  maxLength={6}
                  disabled={loading}
                />
                {errors.otp && <p className="text-destructive text-sm mt-2">{errors.otp}</p>}
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white"
                disabled={loading}
              >
                {loading ? "Vérification..." : "Vérifier"}
              </Button>
            </form>

            <p className="text-center text-muted-foreground text-sm mt-6">
              Vous n'avez pas reçu le code ?{" "}
              <button className="text-primary hover:text-primary/80 font-medium">
                Renvoyer
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="mb-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-primary hover:text-primary/80"
          >
            <ChevronLeft className="w-5 h-5" />
            Retour à l'accueil
          </button>
        </div>

        <div className="bg-card rounded-lg border border-border p-8 sm:p-12 shadow-sm">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
            Créer un compte
          </h1>
          <p className="text-muted-foreground mb-8">
            Inscrivez-vous pour commencer la déclaration de naissance de votre enfant
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="nom" className="text-foreground font-medium mb-2 block">
                  Nom *
                </Label>
                <Input
                  id="nom"
                  type="text"
                  placeholder="Votre nom de famille"
                  value={formData.nom}
                  onChange={(e) => {
                    setFormData({ ...formData, nom: e.target.value });
                    if (errors.nom) setErrors({ ...errors, nom: "" });
                  }}
                  disabled={loading}
                />
                {errors.nom && <p className="text-destructive text-sm mt-2">{errors.nom}</p>}
              </div>

              <div>
                <Label htmlFor="prenom" className="text-foreground font-medium mb-2 block">
                  Prénom *
                </Label>
                <Input
                  id="prenom"
                  type="text"
                  placeholder="Votre prénom"
                  value={formData.prenom}
                  onChange={(e) => {
                    setFormData({ ...formData, prenom: e.target.value });
                    if (errors.prenom) setErrors({ ...errors, prenom: "" });
                  }}
                  disabled={loading}
                />
                {errors.prenom && <p className="text-destructive text-sm mt-2">{errors.prenom}</p>}
              </div>
            </div>

            <div>
              <Label htmlFor="telephone" className="text-foreground font-medium mb-2 block">
                Numéro de téléphone *
              </Label>
              <Input
                id="telephone"
                type="tel"
                placeholder="+225 00 00 00 00"
                value={formData.telephone}
                onChange={(e) => {
                  setFormData({ ...formData, telephone: e.target.value });
                  if (errors.telephone) setErrors({ ...errors, telephone: "" });
                }}
                disabled={loading}
              />
              {errors.telephone && <p className="text-destructive text-sm mt-2">{errors.telephone}</p>}
            </div>

            <div>
              <Label htmlFor="adresse" className="text-foreground font-medium mb-2 block">
                Adresse *
              </Label>
              <Input
                id="adresse"
                type="text"
                placeholder="Votre adresse complète"
                value={formData.adresse}
                onChange={(e) => {
                  setFormData({ ...formData, adresse: e.target.value });
                  if (errors.adresse) setErrors({ ...errors, adresse: "" });
                }}
                disabled={loading}
              />
              {errors.adresse && <p className="text-destructive text-sm mt-2">{errors.adresse}</p>}
            </div>

            <div>
              <Label htmlFor="email" className="text-foreground font-medium mb-2 block">
                Email (optionnel)
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="votre.email@exemple.com"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: "" });
                }}
                disabled={loading}
              />
              {errors.email && <p className="text-destructive text-sm mt-2">{errors.email}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="motDePasse" className="text-foreground font-medium mb-2 block">
                  Mot de passe *
                </Label>
                <div className="relative">
                  <Input
                    id="motDePasse"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.motDePasse}
                    onChange={(e) => {
                      setFormData({ ...formData, motDePasse: e.target.value });
                      if (errors.motDePasse) setErrors({ ...errors, motDePasse: "" });
                    }}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.motDePasse && <p className="text-destructive text-sm mt-2">{errors.motDePasse}</p>}
              </div>

              <div>
                <Label htmlFor="confirmMotDePasse" className="text-foreground font-medium mb-2 block">
                  Confirmer le mot de passe *
                </Label>
                <div className="relative">
                  <Input
                    id="confirmMotDePasse"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.confirmMotDePasse}
                    onChange={(e) => {
                      setFormData({ ...formData, confirmMotDePasse: e.target.value });
                      if (errors.confirmMotDePasse) setErrors({ ...errors, confirmMotDePasse: "" });
                    }}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmMotDePasse && <p className="text-destructive text-sm mt-2">{errors.confirmMotDePasse}</p>}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white text-base py-6"
              disabled={loading}
            >
              {loading ? "Inscription en cours..." : "S'inscrire"}
            </Button>

            <p className="text-center text-muted-foreground">
              Vous avez déjà un compte ?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-primary hover:text-primary/80 font-medium"
              >
                Connectez-vous
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
