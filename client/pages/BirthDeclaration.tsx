import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Upload } from "lucide-react";

type FormStep = "pere" | "mere" | "enfant" | "adresse" | "documents" | "confirmation";

interface FormData {
  pere: {
    nom: string;
    prenom: string;
    numeroIdentification: string;
  };
  mere: {
    nom: string;
    prenom: string;
    numeroIdentification: string;
  };
  enfant: {
    nom: string;
    sexe: string;
    dateNaissance: string;
    hopital: string;
  };
  adresse: {
    adresseComplete: string;
    codePostal: string;
    ville: string;
  };
  documents: {
    certificat: File | null;
    carteIdentitePere: File | null;
    carteIdentiteMere: File | null;
    justificatifDomicile: File | null;
  };
}

export default function BirthDeclaration() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<FormStep>("pere");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    pere: { nom: "", prenom: "", numeroIdentification: "" },
    mere: { nom: "", prenom: "", numeroIdentification: "" },
    enfant: { nom: "", sexe: "", dateNaissance: "", hopital: "" },
    adresse: { adresseComplete: "", codePostal: "", ville: "" },
    documents: {
      certificat: null,
      carteIdentitePere: null,
      carteIdentiteMere: null,
      justificatifDomicile: null,
    },
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const steps: FormStep[] = ["pere", "mere", "enfant", "adresse", "documents", "confirmation"];
  const stepTitles = {
    pere: "Informations du père",
    mere: "Informations de la mère",
    enfant: "Informations de l'enfant",
    adresse: "Adresse du domicile",
    documents: "Pièces justificatives",
    confirmation: "Confirmation",
  };

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {};

    switch (currentStep) {
      case "pere":
        if (!formData.pere.nom.trim()) newErrors.nom = "Le nom est requis";
        if (!formData.pere.prenom.trim()) newErrors.prenom = "Le prénom est requis";
        if (!formData.pere.numeroIdentification.trim())
          newErrors.numeroIdentification = "Le numéro d'identification est requis";
        break;
      case "mere":
        if (!formData.mere.nom.trim()) newErrors.nom = "Le nom est requis";
        if (!formData.mere.prenom.trim()) newErrors.prenom = "Le prénom est requis";
        if (!formData.mere.numeroIdentification.trim())
          newErrors.numeroIdentification = "Le numéro d'identification est requis";
        break;
      case "enfant":
        if (!formData.enfant.nom.trim()) newErrors.nom = "Le nom est requis";
        if (!formData.enfant.sexe) newErrors.sexe = "Le sexe est requis";
        if (!formData.enfant.dateNaissance) newErrors.dateNaissance = "La date de naissance est requise";
        if (!formData.enfant.hopital.trim()) newErrors.hopital = "L'hôpital de naissance est requis";
        break;
      case "adresse":
        if (!formData.adresse.adresseComplete.trim())
          newErrors.adresseComplete = "L'adresse est requise";
        if (!formData.adresse.codePostal.trim())
          newErrors.codePostal = "Le code postal est requis";
        if (!formData.adresse.ville.trim()) newErrors.ville = "La ville est requise";
        break;
      case "documents":
        if (!formData.documents.certificat)
          newErrors.certificat = "Le certificat d'accouchement est requis";
        if (!formData.documents.carteIdentitePere)
          newErrors.carteIdentitePere = "La carte d'identité du père est requise";
        if (!formData.documents.carteIdentiteMere)
          newErrors.carteIdentiteMere = "La carte d'identité de la mère est requise";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (!validateStep()) return;

    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
      setErrors({});
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePreviousStep = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
      setErrors({});
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleFileChange = (field: keyof FormData["documents"], file: File | null) => {
    setFormData({
      ...formData,
      documents: {
        ...formData.documents,
        [field]: file,
      },
    });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard");
    }, 2000);
  };

  const currentIndex = steps.indexOf(currentStep);
  const progress = ((currentIndex + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card shadow-sm sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-primary hover:text-primary/80"
          >
            <ChevronLeft className="w-5 h-5" />
            Retour
          </button>
          <h1 className="text-2xl font-bold text-foreground">Déclaration de naissance</h1>
          <div className="w-8"></div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            {steps.map((step, index) => (
              <div
                key={step}
                className={`flex-1 ${index < currentIndex ? "bg-green-500" : index === currentIndex ? "bg-primary" : "bg-muted"
                  } h-2 mx-1 rounded-full transition-colors`}
              ></div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Étape {currentIndex + 1} sur {steps.length}: {stepTitles[currentStep]}
          </p>
        </div>

        {/* Form Content */}
        <div className="bg-card rounded-lg border border-border p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-foreground mb-8">{stepTitles[currentStep]}</h2>

          {/* Père */}
          {currentStep === "pere" && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="pere_nom" className="text-foreground font-medium mb-2 block">
                  Nom du père *
                </Label>
                <Input
                  id="pere_nom"
                  placeholder="Nom de famille"
                  value={formData.pere.nom}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      pere: { ...formData.pere, nom: e.target.value },
                    });
                    if (errors.nom) setErrors({ ...errors, nom: "" });
                  }}
                />
                {errors.nom && <p className="text-destructive text-sm mt-2">{errors.nom}</p>}
              </div>

              <div>
                <Label htmlFor="pere_prenom" className="text-foreground font-medium mb-2 block">
                  Prénom du père *
                </Label>
                <Input
                  id="pere_prenom"
                  placeholder="Prénom"
                  value={formData.pere.prenom}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      pere: { ...formData.pere, prenom: e.target.value },
                    });
                    if (errors.prenom) setErrors({ ...errors, prenom: "" });
                  }}
                />
                {errors.prenom && <p className="text-destructive text-sm mt-2">{errors.prenom}</p>}
              </div>

              <div>
                <Label htmlFor="pere_id" className="text-foreground font-medium mb-2 block">
                  Numéro d'identification *
                </Label>
                <Input
                  id="pere_id"
                  placeholder="Numéro de carte d'identité ou passeport"
                  value={formData.pere.numeroIdentification}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      pere: { ...formData.pere, numeroIdentification: e.target.value },
                    });
                    if (errors.numeroIdentification)
                      setErrors({ ...errors, numeroIdentification: "" });
                  }}
                />
                {errors.numeroIdentification && (
                  <p className="text-destructive text-sm mt-2">{errors.numeroIdentification}</p>
                )}
              </div>
            </div>
          )}

          {/* Mère */}
          {currentStep === "mere" && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="mere_nom" className="text-foreground font-medium mb-2 block">
                  Nom de la mère *
                </Label>
                <Input
                  id="mere_nom"
                  placeholder="Nom de famille"
                  value={formData.mere.nom}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      mere: { ...formData.mere, nom: e.target.value },
                    });
                    if (errors.nom) setErrors({ ...errors, nom: "" });
                  }}
                />
                {errors.nom && <p className="text-destructive text-sm mt-2">{errors.nom}</p>}
              </div>

              <div>
                <Label htmlFor="mere_prenom" className="text-foreground font-medium mb-2 block">
                  Prénom de la mère *
                </Label>
                <Input
                  id="mere_prenom"
                  placeholder="Prénom"
                  value={formData.mere.prenom}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      mere: { ...formData.mere, prenom: e.target.value },
                    });
                    if (errors.prenom) setErrors({ ...errors, prenom: "" });
                  }}
                />
                {errors.prenom && <p className="text-destructive text-sm mt-2">{errors.prenom}</p>}
              </div>

              <div>
                <Label htmlFor="mere_id" className="text-foreground font-medium mb-2 block">
                  Numéro d'identification *
                </Label>
                <Input
                  id="mere_id"
                  placeholder="Numéro de carte d'identité ou passeport"
                  value={formData.mere.numeroIdentification}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      mere: { ...formData.mere, numeroIdentification: e.target.value },
                    });
                    if (errors.numeroIdentification)
                      setErrors({ ...errors, numeroIdentification: "" });
                  }}
                />
                {errors.numeroIdentification && (
                  <p className="text-destructive text-sm mt-2">{errors.numeroIdentification}</p>
                )}
              </div>
            </div>
          )}

          {/* Enfant */}
          {currentStep === "enfant" && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="enfant_nom" className="text-foreground font-medium mb-2 block">
                  Nom de l'enfant *
                </Label>
                <Input
                  id="enfant_nom"
                  placeholder="Nom complet de l'enfant"
                  value={formData.enfant.nom}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      enfant: { ...formData.enfant, nom: e.target.value },
                    });
                    if (errors.nom) setErrors({ ...errors, nom: "" });
                  }}
                />
                {errors.nom && <p className="text-destructive text-sm mt-2">{errors.nom}</p>}
              </div>

              <div>
                <Label htmlFor="enfant_sexe" className="text-foreground font-medium mb-2 block">
                  Sexe *
                </Label>
                <select
                  id="enfant_sexe"
                  value={formData.enfant.sexe}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      enfant: { ...formData.enfant, sexe: e.target.value },
                    });
                    if (errors.sexe) setErrors({ ...errors, sexe: "" });
                  }}
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Sélectionnez le sexe</option>
                  <option value="M">Masculin</option>
                  <option value="F">Féminin</option>
                </select>
                {errors.sexe && <p className="text-destructive text-sm mt-2">{errors.sexe}</p>}
              </div>

              <div>
                <Label htmlFor="enfant_date" className="text-foreground font-medium mb-2 block">
                  Date de naissance *
                </Label>
                <Input
                  id="enfant_date"
                  type="date"
                  value={formData.enfant.dateNaissance}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      enfant: { ...formData.enfant, dateNaissance: e.target.value },
                    });
                    if (errors.dateNaissance)
                      setErrors({ ...errors, dateNaissance: "" });
                  }}
                />
                {errors.dateNaissance && (
                  <p className="text-destructive text-sm mt-2">{errors.dateNaissance}</p>
                )}
              </div>

              <div>
                <Label htmlFor="enfant_hopital" className="text-foreground font-medium mb-2 block">
                  Hôpital de naissance *
                </Label>
                <Input
                  id="enfant_hopital"
                  placeholder="Nom de l'hôpital"
                  value={formData.enfant.hopital}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      enfant: { ...formData.enfant, hopital: e.target.value },
                    });
                    if (errors.hopital) setErrors({ ...errors, hopital: "" });
                  }}
                />
                {errors.hopital && (
                  <p className="text-destructive text-sm mt-2">{errors.hopital}</p>
                )}
              </div>
            </div>
          )}

          {/* Adresse */}
          {currentStep === "adresse" && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="adresse" className="text-foreground font-medium mb-2 block">
                  Adresse complète *
                </Label>
                <Input
                  id="adresse"
                  placeholder="Votre adresse complète"
                  value={formData.adresse.adresseComplete}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      adresse: { ...formData.adresse, adresseComplete: e.target.value },
                    });
                    if (errors.adresseComplete)
                      setErrors({ ...errors, adresseComplete: "" });
                  }}
                />
                {errors.adresseComplete && (
                  <p className="text-destructive text-sm mt-2">{errors.adresseComplete}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="codePostal" className="text-foreground font-medium mb-2 block">
                    Code postal *
                  </Label>
                  <Input
                    id="codePostal"
                    placeholder="Code postal"
                    value={formData.adresse.codePostal}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        adresse: { ...formData.adresse, codePostal: e.target.value },
                      });
                      if (errors.codePostal)
                        setErrors({ ...errors, codePostal: "" });
                    }}
                  />
                  {errors.codePostal && (
                    <p className="text-destructive text-sm mt-2">{errors.codePostal}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="ville" className="text-foreground font-medium mb-2 block">
                    Ville *
                  </Label>
                  <Input
                    id="ville"
                    placeholder="Ville"
                    value={formData.adresse.ville}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        adresse: { ...formData.adresse, ville: e.target.value },
                      });
                      if (errors.ville) setErrors({ ...errors, ville: "" });
                    }}
                  />
                  {errors.ville && (
                    <p className="text-destructive text-sm mt-2">{errors.ville}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Documents */}
          {currentStep === "documents" && (
            <div className="space-y-6">
              <div>
                <Label className="text-foreground font-medium mb-2 block">
                  Certificat d'accouchement *
                </Label>
                <label className="flex items-center justify-center border-2 border-dashed border-border rounded-lg p-8 hover:border-primary transition-colors cursor-pointer bg-muted/50">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange("certificat", e.target.files?.[0] || null)}
                    className="hidden"
                  />
                  <div className="text-center">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    {formData.documents.certificat ? (
                      <p className="text-foreground font-medium">
                        {formData.documents.certificat.name}
                      </p>
                    ) : (
                      <>
                        <p className="text-foreground font-medium">Cliquez pour téléverser</p>
                        <p className="text-sm text-muted-foreground">ou glissez-déposez votre fichier</p>
                      </>
                    )}
                  </div>
                </label>
                {errors.certificat && (
                  <p className="text-destructive text-sm mt-2">{errors.certificat}</p>
                )}
              </div>

              <div>
                <Label className="text-foreground font-medium mb-2 block">
                  Carte d'identité du père *
                </Label>
                <label className="flex items-center justify-center border-2 border-dashed border-border rounded-lg p-8 hover:border-primary transition-colors cursor-pointer bg-muted/50">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange("carteIdentitePere", e.target.files?.[0] || null)}
                    className="hidden"
                  />
                  <div className="text-center">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    {formData.documents.carteIdentitePere ? (
                      <p className="text-foreground font-medium">
                        {formData.documents.carteIdentitePere.name}
                      </p>
                    ) : (
                      <>
                        <p className="text-foreground font-medium">Cliquez pour téléverser</p>
                        <p className="text-sm text-muted-foreground">ou glissez-déposez votre fichier</p>
                      </>
                    )}
                  </div>
                </label>
                {errors.carteIdentitePere && (
                  <p className="text-destructive text-sm mt-2">{errors.carteIdentitePere}</p>
                )}
              </div>

              <div>
                <Label className="text-foreground font-medium mb-2 block">
                  Carte d'identité de la mère *
                </Label>
                <label className="flex items-center justify-center border-2 border-dashed border-border rounded-lg p-8 hover:border-primary transition-colors cursor-pointer bg-muted/50">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange("carteIdentiteMere", e.target.files?.[0] || null)}
                    className="hidden"
                  />
                  <div className="text-center">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    {formData.documents.carteIdentiteMere ? (
                      <p className="text-foreground font-medium">
                        {formData.documents.carteIdentiteMere.name}
                      </p>
                    ) : (
                      <>
                        <p className="text-foreground font-medium">Cliquez pour téléverser</p>
                        <p className="text-sm text-muted-foreground">ou glissez-déposez votre fichier</p>
                      </>
                    )}
                  </div>
                </label>
                {errors.carteIdentiteMere && (
                  <p className="text-destructive text-sm mt-2">{errors.carteIdentiteMere}</p>
                )}
              </div>

              <div>
                <Label className="text-foreground font-medium mb-2 block">
                  Justificatif de domicile (optionnel)
                </Label>
                <label className="flex items-center justify-center border-2 border-dashed border-border rounded-lg p-8 hover:border-primary transition-colors cursor-pointer bg-muted/50">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange("justificatifDomicile", e.target.files?.[0] || null)}
                    className="hidden"
                  />
                  <div className="text-center">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    {formData.documents.justificatifDomicile ? (
                      <p className="text-foreground font-medium">
                        {formData.documents.justificatifDomicile.name}
                      </p>
                    ) : (
                      <>
                        <p className="text-foreground font-medium">Cliquez pour téléverser</p>
                        <p className="text-sm text-muted-foreground">ou glissez-déposez votre fichier</p>
                      </>
                    )}
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* Confirmation */}
          {currentStep === "confirmation" && (
            <div className="space-y-6">
              <div className="bg-secondary/10 border border-secondary/30 rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-4">Résumé de votre déclaration</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Père</p>
                    <p className="text-foreground font-medium">
                      {formData.pere.prenom} {formData.pere.nom}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Mère</p>
                    <p className="text-foreground font-medium">
                      {formData.mere.prenom} {formData.mere.nom}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Enfant</p>
                    <p className="text-foreground font-medium">{formData.enfant.nom}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Date de naissance</p>
                    <p className="text-foreground font-medium">
                      {new Date(formData.enfant.dateNaissance).toLocaleDateString("fr-FR")}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Adresse</p>
                    <p className="text-foreground font-medium">
                      {formData.adresse.adresseComplete}, {formData.adresse.codePostal}{" "}
                      {formData.adresse.ville}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  ✓ En confirmant, vous certifiez l'exactitude des informations fournies et acceptez
                  les conditions d'utilisation de CIVILE-APP.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between">
            <Button
              onClick={handlePreviousStep}
              disabled={currentIndex === 0}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-5 h-5" />
              Précédent
            </Button>

            {currentIndex < steps.length - 1 ? (
              <Button
                onClick={handleNextStep}
                className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2"
              >
                Suivant
                <ChevronRight className="w-5 h-5" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                {loading ? "Soumission en cours..." : "Soumettre la déclaration"}
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
