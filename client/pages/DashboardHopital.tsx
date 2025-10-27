import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LogOut, Eye, CheckCircle, AlertCircle, Clock, FileText } from "lucide-react";

interface VerificationRequest {
  id: string;
  enfantNom: string;
  dateNaissance: string;
  pere: string;
  mere: string;
  dateRecue: string;
  statut: "En attente" | "Vérifiée" | "Rejetée";
  certificatValide?: boolean;
  motif?: string;
}

interface Modal {
  type: "details" | "verify" | "reject" | null;
  requestId: string | null;
}

export default function DashboardHopital() {
  const navigate = useNavigate();
  const [modal, setModal] = useState<Modal>({ type: null, requestId: null });
  const [rejectionReason, setRejectionReason] = useState("");
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const [verificationRequests] = useState<VerificationRequest[]>([
    {
      id: "1",
      enfantNom: "Marie Dupont",
      dateNaissance: "2024-01-15",
      pere: "Jean Dupont",
      mere: "Anne Dupont",
      dateRecue: "2024-01-20",
      statut: "En attente",
    },
    {
      id: "2",
      enfantNom: "Pierre Dupont",
      dateNaissance: "2024-03-20",
      pere: "Marc Dufour",
      mere: "Sophie Dufour",
      dateRecue: "2024-03-25",
      statut: "En attente",
    },
    {
      id: "3",
      enfantNom: "Luc Moreau",
      dateNaissance: "2024-02-14",
      pere: "Thomas Moreau",
      mere: "Marie Moreau",
      dateRecue: "2024-02-20",
      statut: "Vérifiée",
      certificatValide: true,
    },
    {
      id: "4",
      enfantNom: "Alice Leclerc",
      dateNaissance: "2024-04-10",
      pere: "Robert Leclerc",
      mere: "Florence Leclerc",
      dateRecue: "2024-04-15",
      statut: "Rejetée",
      certificatValide: false,
      motif: "Certificat d'accouchement ne correspond pas aux informations déclarées",
    },
  ]);

  const handleLogout = () => {
    navigate("/");
  };

  const handleViewDetails = (id: string) => {
    setModal({ type: "details", requestId: id });
  };

  const handleVerify = (id: string) => {
    setModal({ type: "verify", requestId: id });
  };

  const handleReject = (id: string) => {
    setModal({ type: "reject", requestId: id });
  };

  const handleApproveVerification = (id: string) => {
    setLoadingId(id);
    setTimeout(() => {
      setLoadingId(null);
      setModal({ type: null, requestId: null });
    }, 1500);
  };

  const handleRejectVerification = (id: string) => {
    if (!rejectionReason.trim()) return;
    setLoadingId(id);
    setTimeout(() => {
      setLoadingId(null);
      setRejectionReason("");
      setModal({ type: null, requestId: null });
    }, 1500);
  };

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case "Vérifiée":
        return { bg: "bg-green-50", text: "text-green-700", border: "border-green-200", icon: CheckCircle };
      case "En attente":
        return { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200", icon: Clock };
      case "Rejetée":
        return { bg: "bg-red-50", text: "text-red-700", border: "border-red-200", icon: AlertCircle };
      default:
        return { bg: "bg-gray-50", text: "text-gray-700", border: "border-gray-200", icon: FileText };
    }
  };

  const currentRequest = verificationRequests.find((r) => r.id === modal.requestId);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center text-white font-bold">
              H
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">CIVILE-APP</h1>
              <p className="text-xs text-muted-foreground">Hôpital</p>
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
        <div className="bg-gradient-to-r from-secondary/10 to-primary/10 rounded-lg border border-border p-6 sm:p-8 mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
            Tableau de bord de l'Hôpital
          </h1>
          <p className="text-muted-foreground">
            Vérifiez l'authenticité des certificats d'accouchement
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
            <p className="text-sm font-semibold text-muted-foreground uppercase mb-2">En attente</p>
            <p className="text-3xl font-bold text-yellow-600">
              {verificationRequests.filter((r) => r.statut === "En attente").length}
            </p>
          </div>
          <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
            <p className="text-sm font-semibold text-muted-foreground uppercase mb-2">Approuvées</p>
            <p className="text-3xl font-bold text-green-600">
              {verificationRequests.filter((r) => r.statut === "Vérifiée").length}
            </p>
          </div>
          <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
            <p className="text-sm font-semibold text-muted-foreground uppercase mb-2">Rejetées</p>
            <p className="text-3xl font-bold text-red-600">
              {verificationRequests.filter((r) => r.statut === "Rejetée").length}
            </p>
          </div>
        </div>

        {/* Verification Requests Table */}
        <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
          <div className="border-b border-border p-6">
            <h2 className="text-xl font-bold text-foreground">Demandes de vérification</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/30 border-b border-border">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-foreground">Enfant</th>
                  <th className="px-6 py-4 text-left font-semibold text-foreground">Parents</th>
                  <th className="px-6 py-4 text-left font-semibold text-foreground">Date reçue</th>
                  <th className="px-6 py-4 text-left font-semibold text-foreground">Statut</th>
                  <th className="px-6 py-4 text-left font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {verificationRequests.map((request) => {
                  const statusInfo = getStatusColor(request.statut);
                  const StatusIcon = statusInfo.icon;
                  return (
                    <tr key={request.id} className="hover:bg-muted/50 transition-colors border-b border-border">
                      <td className="px-6 py-4">
                        <p className="font-medium text-foreground">{request.enfantNom}</p>
                        <p className="text-xs text-muted-foreground">
                          Né(e) le {new Date(request.dateNaissance).toLocaleDateString("fr-FR")}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-foreground">{request.pere}</p>
                        <p className="text-xs text-muted-foreground">{request.mere}</p>
                      </td>
                      <td className="px-6 py-4">
                        {new Date(request.dateRecue).toLocaleDateString("fr-FR")}
                      </td>
                      <td className="px-6 py-4">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${statusInfo.bg} ${statusInfo.border}`}>
                          <StatusIcon className={`w-4 h-4 ${statusInfo.text}`} />
                          <span className={`text-xs font-medium ${statusInfo.text}`}>
                            {request.statut}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleViewDetails(request.id)}
                            className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                            Voir
                          </button>
                          {request.statut === "En attente" && (
                            <button
                              onClick={() => handleVerify(request.id)}
                              className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-secondary hover:bg-secondary/10 rounded transition-colors"
                            >
                              <CheckCircle className="w-4 h-4" />
                              Vérifier
                            </button>
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

        {/* Info Box */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-3">Processus de vérification</h3>
          <ol className="space-y-2 text-sm text-blue-800">
            <li>1. Recevoir la demande de vérification de la mairie</li>
            <li>2. Consulter le dossier médical de l'accouchement</li>
            <li>3. Vérifier l'authenticité du certificat</li>
            <li>4. Valider ou rejeter avec motif</li>
            <li>5. Retourner la réponse à la mairie</li>
          </ol>
        </div>
      </main>

      {/* Modals */}
      {modal.type === "details" && currentRequest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card rounded-lg border border-border max-w-2xl w-full p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-foreground mb-6">Détails de la demande de vérification</h2>

            <div className="space-y-6 mb-8">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Enfant</p>
                  <p className="font-semibold text-foreground">{currentRequest.enfantNom}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Date de naissance</p>
                  <p className="font-semibold text-foreground">
                    {new Date(currentRequest.dateNaissance).toLocaleDateString("fr-FR")}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Père</p>
                  <p className="font-semibold text-foreground">{currentRequest.pere}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Mère</p>
                  <p className="font-semibold text-foreground">{currentRequest.mere}</p>
                </div>
              </div>

              {currentRequest.statut === "Rejetée" && currentRequest.motif && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-sm font-semibold text-red-900 mb-2">Motif du rejet</p>
                  <p className="text-sm text-red-800">{currentRequest.motif}</p>
                </div>
              )}

              {currentRequest.statut === "Vérifiée" && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <p className="text-sm font-semibold text-green-900">Certificat validé</p>
                  </div>
                </div>
              )}
            </div>

            {currentRequest.statut === "En attente" && (
              <div className="flex gap-4">
                <Button
                  onClick={() => handleVerify(currentRequest.id)}
                  className="flex-1 bg-secondary hover:bg-secondary/90 text-white"
                >
                  Valider le certificat
                </Button>
                <Button
                  onClick={() => handleReject(currentRequest.id)}
                  className="flex-1 bg-destructive hover:bg-destructive/90 text-white"
                >
                  Rejeter
                </Button>
                <Button
                  onClick={() => setModal({ type: null, requestId: null })}
                  variant="outline"
                  className="flex-1"
                >
                  Fermer
                </Button>
              </div>
            )}

            {currentRequest.statut !== "En attente" && (
              <Button
                onClick={() => setModal({ type: null, requestId: null })}
                variant="outline"
                className="w-full"
              >
                Fermer
              </Button>
            )}
          </div>
        </div>
      )}

      {modal.type === "verify" && currentRequest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card rounded-lg border border-border max-w-md w-full p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-foreground mb-4">Valider le certificat</h2>
            <p className="text-muted-foreground mb-6">
              Vous êtes sur le point de valider le certificat d'accouchement pour {currentRequest.enfantNom}. Le dossier sera alors renvoyé à la mairie pour fabrication de l'acte de naissance.
            </p>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-green-900">
                ✓ Le certificat d'accouchement est authentique et correspond aux informations déclarées.
              </p>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={() => handleApproveVerification(currentRequest.id)}
                disabled={loadingId === currentRequest.id}
                className="flex-1 bg-secondary hover:bg-secondary/90 text-white"
              >
                {loadingId === currentRequest.id ? "Validation en cours..." : "Confirmer la validation"}
              </Button>
              <Button
                onClick={() => {
                  setModal({ type: null, requestId: null });
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

      {modal.type === "reject" && currentRequest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card rounded-lg border border-border max-w-md w-full p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-foreground mb-4">Rejeter le certificat</h2>
            <p className="text-muted-foreground mb-6">
              Veuillez indiquer le motif du rejet. La mairie en notifiera le parent.
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
                onClick={() => handleRejectVerification(currentRequest.id)}
                disabled={!rejectionReason.trim() || loadingId === currentRequest.id}
                className="flex-1 bg-destructive hover:bg-destructive/90 text-white"
              >
                {loadingId === currentRequest.id ? "Rejet en cours..." : "Confirmer le rejet"}
              </Button>
              <Button
                onClick={() => {
                  setModal({ type: null, requestId: null });
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
