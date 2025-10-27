import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LogOut, Eye, CheckCircle, AlertCircle, Clock, MoreVertical, Send } from "lucide-react";

interface Declaration {
  id: string;
  enfantNom: string;
  dateNaissance: string;
  pere: string;
  mere: string;
  dateDeclaration: string;
  statut: "Reçue" | "En vérification" | "En attente hôpital" | "Approuvée" | "Rejetée";
  completude: number; // percentage
  documents: {
    certificat: boolean;
    cartePere: boolean;
    carteMere: boolean;
    justificatif: boolean;
  };
}

interface Modal {
  type: "details" | "approve" | "reject" | null;
  declarationId: string | null;
  rejectionReason?: string;
}

export default function DashboardMairie() {
  const navigate = useNavigate();
  const [modal, setModal] = useState<Modal>({ type: null, declarationId: null });
  const [rejectionReason, setRejectionReason] = useState("");
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const [declarations] = useState<Declaration[]>([
    {
      id: "1",
      enfantNom: "Marie Dupont",
      dateNaissance: "2024-01-15",
      pere: "Jean Dupont",
      mere: "Anne Dupont",
      dateDeclaration: "2024-01-18",
      statut: "Reçue",
      completude: 100,
      documents: {
        certificat: true,
        cartePere: true,
        carteMere: true,
        justificatif: true,
      },
    },
    {
      id: "2",
      enfantNom: "Pierre Dupont",
      dateNaissance: "2024-03-20",
      pere: "Marc Dufour",
      mere: "Sophie Dufour",
      dateDeclaration: "2024-03-22",
      statut: "En attente hôpital",
      completude: 100,
      documents: {
        certificat: true,
        cartePere: true,
        carteMere: true,
        justificatif: true,
      },
    },
    {
      id: "3",
      enfantNom: "Sophie Dupont",
      dateNaissance: "2024-05-10",
      pere: "Paul Martin",
      mere: "Isabelle Martin",
      dateDeclaration: "2024-05-12",
      statut: "Reçue",
      completude: 75,
      documents: {
        certificat: true,
        cartePere: true,
        carteMere: false,
        justificatif: true,
      },
    },
    {
      id: "4",
      enfantNom: "Luc Moreau",
      dateNaissance: "2024-02-14",
      pere: "Thomas Moreau",
      mere: "Marie Moreau",
      dateDeclaration: "2024-02-16",
      statut: "Approuvée",
      completude: 100,
      documents: {
        certificat: true,
        cartePere: true,
        carteMere: true,
        justificatif: true,
      },
    },
  ]);

  const handleLogout = () => {
    navigate("/");
  };

  const handleViewDetails = (id: string) => {
    setModal({ type: "details", declarationId: id });
  };

  const handleApprove = (id: string) => {
    setModal({ type: "approve", declarationId: id });
  };

  const handleReject = (id: string) => {
    setModal({ type: "reject", declarationId: id, rejectionReason: "" });
  };

  const handleSendToHospital = (id: string) => {
    setLoadingId(id);
    setTimeout(() => {
      setLoadingId(null);
      setModal({ type: null, declarationId: null });
    }, 1500);
  };

  const handleApproveSubmit = (id: string) => {
    setLoadingId(id);
    setTimeout(() => {
      setLoadingId(null);
      setModal({ type: null, declarationId: null });
    }, 1500);
  };

  const handleRejectSubmit = (id: string) => {
    if (!rejectionReason.trim()) return;
    setLoadingId(id);
    setTimeout(() => {
      setLoadingId(null);
      setRejectionReason("");
      setModal({ type: null, declarationId: null });
    }, 1500);
  };

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case "Approuvée":
        return { bg: "bg-green-50", text: "text-green-700", border: "border-green-200", icon: CheckCircle };
      case "En attente hôpital":
        return { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", icon: Clock };
      case "Reçue":
      case "En vérification":
        return { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200", icon: Clock };
      case "Rejetée":
        return { bg: "bg-red-50", text: "text-red-700", border: "border-red-200", icon: AlertCircle };
      default:
        return { bg: "bg-gray-50", text: "text-gray-700", border: "border-gray-200", icon: Clock };
    }
  };

  const currentDeclaration = declarations.find((d) => d.id === modal.declarationId);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
              M
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">CIVILE-APP</h1>
              <p className="text-xs text-muted-foreground">Mairie</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Déconnexion
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-border p-6 sm:p-8 mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
            Tableau de bord de la Mairie
          </h1>
          <p className="text-muted-foreground">
            Vérifiez et validez les déclarations de naissance
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
            <p className="text-sm font-semibold text-muted-foreground uppercase mb-2">En attente</p>
            <p className="text-3xl font-bold text-primary">
              {declarations.filter((d) => d.statut === "Reçue").length}
            </p>
          </div>
          <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
            <p className="text-sm font-semibold text-muted-foreground uppercase mb-2">En vérification hôpital</p>
            <p className="text-3xl font-bold text-blue-600">
              {declarations.filter((d) => d.statut === "En attente hôpital").length}
            </p>
          </div>
          <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
            <p className="text-sm font-semibold text-muted-foreground uppercase mb-2">Approuvées</p>
            <p className="text-3xl font-bold text-green-600">
              {declarations.filter((d) => d.statut === "Approuvée").length}
            </p>
          </div>
          <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
            <p className="text-sm font-semibold text-muted-foreground uppercase mb-2">Rejetées</p>
            <p className="text-3xl font-bold text-red-600">
              {declarations.filter((d) => d.statut === "Rejetée").length}
            </p>
          </div>
        </div>

        {/* Declarations Table */}
        <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
          <div className="border-b border-border p-6">
            <h2 className="text-xl font-bold text-foreground">Déclarations en attente</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/30 border-b border-border">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-foreground">Enfant</th>
                  <th className="px-6 py-4 text-left font-semibold text-foreground">Parents</th>
                  <th className="px-6 py-4 text-left font-semibold text-foreground">Date déclaration</th>
                  <th className="px-6 py-4 text-left font-semibold text-foreground">Complétude</th>
                  <th className="px-6 py-4 text-left font-semibold text-foreground">Statut</th>
                  <th className="px-6 py-4 text-left font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {declarations.map((declaration) => {
                  const statusInfo = getStatusColor(declaration.statut);
                  const StatusIcon = statusInfo.icon;
                  return (
                    <tr key={declaration.id} className="hover:bg-muted/50 transition-colors border-b border-border">
                      <td className="px-6 py-4">
                        <p className="font-medium text-foreground">{declaration.enfantNom}</p>
                        <p className="text-xs text-muted-foreground">
                          Né(e) le {new Date(declaration.dateNaissance).toLocaleDateString("fr-FR")}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-foreground">{declaration.pere}</p>
                        <p className="text-xs text-muted-foreground">{declaration.mere}</p>
                      </td>
                      <td className="px-6 py-4">
                        {new Date(declaration.dateDeclaration).toLocaleDateString("fr-FR")}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-grow bg-muted rounded-full h-2">
                            <div
                              className="bg-primary rounded-full h-2 transition-all"
                              style={{ width: `${declaration.completude}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-semibold text-foreground min-w-fit">
                            {declaration.completude}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${statusInfo.bg} ${statusInfo.border}`}>
                          <StatusIcon className={`w-4 h-4 ${statusInfo.text}`} />
                          <span className={`text-xs font-medium ${statusInfo.text}`}>
                            {declaration.statut}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleViewDetails(declaration.id)}
                            className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                            Voir
                          </button>
                          {declaration.statut === "Reçue" && declaration.completude === 100 && (
                            <>
                              <button
                                onClick={() => handleSendToHospital(declaration.id)}
                                disabled={loadingId === declaration.id}
                                className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-secondary hover:bg-secondary/10 rounded transition-colors disabled:opacity-50"
                              >
                                <Send className="w-4 h-4" />
                                Envoyer
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Modals */}
      {modal.type === "details" && currentDeclaration && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card rounded-lg border border-border max-w-2xl w-full p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-foreground mb-6">Détails de la déclaration</h2>

            <div className="space-y-6 mb-8">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Enfant</p>
                  <p className="font-semibold text-foreground">{currentDeclaration.enfantNom}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Date de naissance</p>
                  <p className="font-semibold text-foreground">
                    {new Date(currentDeclaration.dateNaissance).toLocaleDateString("fr-FR")}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Père</p>
                  <p className="font-semibold text-foreground">{currentDeclaration.pere}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Mère</p>
                  <p className="font-semibold text-foreground">{currentDeclaration.mere}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-3">Documents</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className={`w-5 h-5 rounded ${currentDeclaration.documents.certificat ? "bg-green-500" : "bg-red-500"}`}></div>
                    <span className="text-foreground">Certificat d'accouchement</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className={`w-5 h-5 rounded ${currentDeclaration.documents.cartePere ? "bg-green-500" : "bg-red-500"}`}></div>
                    <span className="text-foreground">Carte d'identité du père</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className={`w-5 h-5 rounded ${currentDeclaration.documents.carteMere ? "bg-green-500" : "bg-red-500"}`}></div>
                    <span className="text-foreground">Carte d'identité de la mère</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className={`w-5 h-5 rounded ${currentDeclaration.documents.justificatif ? "bg-green-500" : "bg-red-500"}`}></div>
                    <span className="text-foreground">Justificatif de domicile</span>
                  </div>
                </div>
              </div>
            </div>

            {currentDeclaration.completude === 100 && currentDeclaration.statut === "Reçue" && (
              <div className="flex gap-4">
                <Button
                  onClick={() => {
                    setModal({ type: null, declarationId: null });
                    handleSendToHospital(currentDeclaration.id);
                  }}
                  disabled={loadingId === currentDeclaration.id}
                  className="flex-1 bg-secondary hover:bg-secondary/90 text-white"
                >
                  {loadingId === currentDeclaration.id ? "Envoi en cours..." : "Envoyer à l'hôpital"}
                </Button>
                <Button
                  onClick={() => setModal({ type: null, declarationId: null })}
                  variant="outline"
                  className="flex-1"
                >
                  Fermer
                </Button>
              </div>
            )}

            {currentDeclaration.completude < 100 && (
              <div className="flex gap-4">
                <Button
                  onClick={() => handleReject(currentDeclaration.id)}
                  className="flex-1 bg-destructive hover:bg-destructive/90 text-white"
                >
                  Rejeter le dossier
                </Button>
                <Button
                  onClick={() => setModal({ type: null, declarationId: null })}
                  variant="outline"
                  className="flex-1"
                >
                  Fermer
                </Button>
              </div>
            )}

            {(currentDeclaration.completude === 100 && currentDeclaration.statut !== "Reçue") && (
              <Button
                onClick={() => setModal({ type: null, declarationId: null })}
                variant="outline"
                className="w-full"
              >
                Fermer
              </Button>
            )}
          </div>
        </div>
      )}

      {modal.type === "reject" && currentDeclaration && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card rounded-lg border border-border max-w-md w-full p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-foreground mb-4">Rejeter la déclaration</h2>
            <p className="text-muted-foreground mb-6">
              Veuillez indiquer le motif du rejet afin que le parent puisse corriger son dossier.
            </p>

            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Motif du rejet..."
              className="w-full px-4 py-3 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary mb-6"
              rows={4}
            ></textarea>

            <div className="flex gap-4">
              <Button
                onClick={() => handleRejectSubmit(currentDeclaration.id)}
                disabled={!rejectionReason.trim() || loadingId === currentDeclaration.id}
                className="flex-1 bg-destructive hover:bg-destructive/90 text-white"
              >
                {loadingId === currentDeclaration.id ? "Rejet en cours..." : "Confirmer le rejet"}
              </Button>
              <Button
                onClick={() => {
                  setModal({ type: null, declarationId: null });
                  setRejectionReason("");
                }}
                variant="outline"
                className="flex-1"
              >
                Annuler
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
