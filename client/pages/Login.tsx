import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Eye, EyeOff, Users, Building2, Hospital } from "lucide-react";

type UserRole = "parent" | "mairie" | "hopital";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedRole, setSelectedRole] = useState<UserRole>("parent");

  const [loginData, setLoginData] = useState({
    identifier: "", // Can be email or phone
    motDePasse: "",
  });

  const roles: { value: UserRole; label: string; icon: React.ReactNode; description: string }[] = [
    {
      value: "parent",
      label: "Parent",
      icon: <Users className="w-5 h-5" />,
      description: "Déclarer une naissance",
    },
    {
      value: "mairie",
      label: "Mairie",
      icon: <Building2 className="w-5 h-5" />,
      description: "Vérifier les dossiers",
    },
    {
      value: "hopital",
      label: "Hôpital",
      icon: <Hospital className="w-5 h-5" />,
      description: "Vérifier les certificats",
    },
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const { identifier, motDePasse } = loginData;

    if (!identifier.trim()) {
      newErrors.identifier = "L'email ou le numéro de téléphone est requis";
    }

    if (!motDePasse) {
      newErrors.motDePasse = "Le mot de passe est requis";
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
      // Navigate to appropriate dashboard based on role
      if (selectedRole === "parent") {
        navigate("/dashboard");
      } else if (selectedRole === "mairie") {
        navigate("/dashboard-mairie");
      } else if (selectedRole === "hopital") {
        navigate("/dashboard-hopital");
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Senegalese Administration Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-accent rounded-full opacity-50"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="mb-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-primary hover:text-primary/80"
          >
            <ChevronLeft className="w-5 h-5" />
            Retour à l'accueil
          </button>
        </div>

        <div className="bg-card rounded-lg border border-border p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-foreground mb-2">Connexion</h1>
          <p className="text-muted-foreground mb-8">
            Sélectionnez votre profil et connectez-vous
          </p>

          {/* Role Selector */}
          <div className="mb-8 space-y-3">
            {roles.map((role) => (
              <button
                key={role.value}
                onClick={() => setSelectedRole(role.value)}
                className={`w-full flex items-center gap-4 p-4 rounded-lg border-2 transition-all ${
                  selectedRole === role.value
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50 bg-muted/30"
                }`}
              >
                <div
                  className={`flex-shrink-0 ${
                    selectedRole === role.value ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {role.icon}
                </div>
                <div className="flex-grow text-left">
                  <p className={`font-semibold ${selectedRole === role.value ? "text-primary" : "text-foreground"}`}>
                    {role.label}
                  </p>
                  <p className="text-xs text-muted-foreground">{role.description}</p>
                </div>
                <div
                  className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedRole === role.value
                      ? "border-primary bg-primary"
                      : "border-border"
                  }`}
                >
                  {selectedRole === role.value && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
              </button>
            ))}
          </div>

          <div className="border-t border-border my-8"></div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="identifier" className="text-foreground font-medium mb-2 block">
                Email ou Numéro de téléphone
              </Label>
              <Input
                id="identifier"
                type="text"
                placeholder="email@exemple.com ou +225 00 00 00 00"
                value={loginData.identifier}
                onChange={(e) => {
                  setLoginData({ ...loginData, identifier: e.target.value });
                  if (errors.identifier) setErrors({ ...errors, identifier: "" });
                }}
                disabled={loading}
              />
              {errors.identifier && (
                <p className="text-destructive text-sm mt-2">{errors.identifier}</p>
              )}
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="motDePasse" className="text-foreground font-medium">
                  Mot de passe
                </Label>
                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  className="text-sm text-primary hover:text-primary/80"
                >
                  Mot de passe oublié ?
                </button>
              </div>
              <div className="relative">
                <Input
                  id="motDePasse"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={loginData.motDePasse}
                  onChange={(e) => {
                    setLoginData({ ...loginData, motDePasse: e.target.value });
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
              {errors.motDePasse && (
                <p className="text-destructive text-sm mt-2">{errors.motDePasse}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white text-base py-6"
              disabled={loading}
            >
              {loading ? "Connexion en cours..." : "Se connecter"}
            </Button>

            <p className="text-center text-muted-foreground">
              Vous n'avez pas de compte ?{" "}
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="text-primary hover:text-primary/80 font-medium"
              >
                S'inscrire
              </button>
            </p>
          </form>

          {/* Info Box */}
          <div className="mt-8 bg-secondary/10 border border-secondary/30 rounded-lg p-4">
            <p className="text-sm text-foreground font-semibold mb-2">Démonstration:</p>
            <div className="text-xs text-foreground space-y-1">
              {selectedRole === "parent" && (
                <>
                  <p>Email: <code className="bg-muted px-1">parent@test.com</code></p>
                  <p>Mot de passe: <code className="bg-muted px-1">password123</code></p>
                </>
              )}
              {selectedRole === "mairie" && (
                <>
                  <p>Email: <code className="bg-muted px-1">mairie@example.com</code></p>
                  <p>Mot de passe: <code className="bg-muted px-1">mairie123</code></p>
                </>
              )}
              {selectedRole === "hopital" && (
                <>
                  <p>Email: <code className="bg-muted px-1">hopital@hospital.com</code></p>
                  <p>Mot de passe: <code className="bg-muted px-1">hopital123</code></p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
