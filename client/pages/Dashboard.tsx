import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LogOut, Plus, Eye, Download, Clock, CheckCircle, AlertCircle, FileText } from "lucide-react";

interface Declaration {
  id: string;
  enfantNom: string;
  dateNaissance: string;
  statut: "En cours" | "En attente" | "Validé" | "Rejeté";
  dateDeclaration: string;
  mère: string;
  père: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [parentInfo] = useState({
    nom: "Dupont",
    prenom: "Jean",
    email: "jean.dupont@exemple.com",
    telephone: "+225 07 00 00 00",
  });

  const [declarations] = useState<Declaration[]>([
    {
      id: "1",
      enfantNom: "Marie Dupont",
      dateNaissance: "2024-01-15",
      statut: "Validé",
      dateDeclaration: "2024-01-18",
      mère: "Anne Dupont",
      père: "Jean Dupont",
    },
    {
      id: "2",
      enfantNom: "Pierre Dupont",
      dateNaissance: "2024-03-20",
      statut: "En attente",
      dateDeclaration: "2024-03-22",
      mère: "Anne Dupont",
      père: "Jean Dupont",
    },
    {
      id: "3",
      enfantNom: "Sophie Dupont",
      dateNaissance: "2024-05-10",
      statut: "En cours",
      dateDeclaration: "2024-05-12",
      mère: "Anne Dupont",
      père: "Jean Dupont",
    },
  ]);

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case "Validé":
        return { bg: "bg-green-50", text: "text-green-700", border: "border-green-200", icon: CheckCircle };
      case "En attente":
        return { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", icon: Clock };
      case "En cours":
        return { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200", icon: Clock };
      case "Rejeté":
        return { bg: "bg-red-50", text: "text-red-700", border: "border-red-200", icon: AlertCircle };
      default:
        return { bg: "bg-gray-50", text: "text-gray-700", border: "border-gray-200", icon: FileText };
    }
  };

  const handleLogout = () => {
    navigate("/");
  };

  const handleNewDeclaration = () => {
    navigate("/birth-declaration");
  };

  const handleViewDetails = (id: string) => {
    navigate(`/declaration/${id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-lg">
              C
            </div>
            <h1 className="text-2xl font-bold text-foreground">CIVILE-APP</h1>
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
            Bienvenue, {parentInfo.prenom}
          </h1>
          <p className="text-muted-foreground mb-6">
            Gérez vos demandes de déclaration de naissance et téléchargez vos actes
          </p>
          <Button
            onClick={handleNewDeclaration}
            className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Nouvelle déclaration
          </Button>
        </div>

        {/* Profile Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-4">
              Informations du compte
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Nom complet</p>
                <p className="font-medium text-foreground">
                  {parentInfo.prenom} {parentInfo.nom}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Email</p>
                <p className="font-medium text-foreground text-sm break-all">{parentInfo.email}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Téléphone</p>
                <p className="font-medium text-foreground">{parentInfo.telephone}</p>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-4">
              Statistiques
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Déclarations totales</p>
                <p className="text-2xl font-bold text-primary">{declarations.length}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Actes validés</p>
                <p className="text-2xl font-bold text-green-600">
                  {declarations.filter((d) => d.statut === "Validé").length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-4">
              Frais de téléchargement
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Prix par téléchargement</p>
                <p className="text-2xl font-bold text-primary">250 F CFA</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Paiement via Wave ou Orange Money
              </p>
            </div>
          </div>
        </div>

        {/* Declarations List */}
        <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
          <div className="border-b border-border p-6">
            <h2 className="text-xl font-bold text-foreground">Mes déclarations de naissance</h2>
          </div>

          {declarations.length === 0 ? (
            <div className="p-12 text-center">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground mb-4">
                Vous n'avez pas encore de déclaration
              </p>
              <Button
                onClick={handleNewDeclaration}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                Créer une déclaration
              </Button>
            </div>
          ) : (
            <div className="divide-y divide-border overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/30 border-b border-border">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-foreground">
                      Enfant
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-foreground">
                      Date de naissance
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-foreground">
                      Statut
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {declarations.map((declaration) => {
                    const statusInfo = getStatusColor(declaration.statut);
                    const StatusIcon = statusInfo.icon;
                    return (
                      <tr key={declaration.id} className="hover:bg-muted/50 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-foreground">
                              {declaration.enfantNom}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {declaration.mère} & {declaration.père}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-foreground">
                          {new Date(declaration.dateNaissance).toLocaleDateString("fr-FR")}
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
                              Détails
                            </button>
                            {declaration.statut === "Validé" && (
                              <button
                                onClick={() => navigate(`/download/${declaration.id}`)}
                                className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-green-600 hover:bg-green-50 rounded transition-colors"
                              >
                                <Download className="w-4 h-4" />
                                Télécharger
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
          )}
        </div>

        {/* Process Information */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 mb-3">Processus de vérification</h3>
            <ol className="space-y-2 text-sm text-blue-800">
              <li>1. Vérification de la mairie</li>
              <li>2. Vérification de l'hôpital</li>
              <li>3. Fabrication de l'acte</li>
              <li>4. Téléchargement disponible</li>
            </ol>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
            <h3 className="font-semibold text-amber-900 mb-3">Documents requis</h3>
            <ul className="space-y-2 text-sm text-amber-800">
              <li>✓ Certificat d'accouchement</li>
              <li>✓ Cartes d'identité des parents</li>
              <li>✓ Justificatif de domicile</li>
            </ul>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-12 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 CIVILE-APP. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
