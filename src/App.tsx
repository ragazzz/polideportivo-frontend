import { AuthProvider } from "./shared/context/AuthContext";
import { useAuth } from "./shared/hooks/useAuth";
import { LoginPage } from "./features/auth/LoginPage";
import { MapContainer } from "./features/map/MapContainer";
import { IconSprite } from "./features/map/IconSprite";
import { useState } from "react";
import { DetailView } from "./features/calendar/DetailView";
import { useReservations } from "./shared/hooks/useReservations";
import logoUnemi from "../src/assets/logo-unemi.png";

function AppContent() {
  const { isAuthenticated, isAdmin, loading, logout } = useAuth();
  const [ selectedFacility, setSelectedFacility ] = useState<string | null>(null);
  const { reservations } = useReservations(300000);

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="text-2xl">Cargando...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <div className="w-screen h-screen relative">

      <div className="absolute top-4 left-0 z-50 bg-amber-50 rounded-r-4xl py-1 px-5">
        <img src={logoUnemi} alt="Logo del Centro para la Formación y Promoción del Deporte Universitario" width="400" draggable={false} />
      </div>
      {/* Botón de logout */}
      <div className="absolute top-2 right-1 z-50 w-60 h-40 flex justify-end group">
        <button
          onClick={logout}
          className="px-4 py-2 cursor-pointer font-semibold h-10 bg-neutral-400 text-white rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-700 transition-colors"
          style={{ userSelect: 'none' }}
        >
          Cerrar Sesión
        </button>
      </div>

      <IconSprite />

      {/* Mapa */}
      <MapContainer 
        onFacilityClick={setSelectedFacility}
        reservations={reservations}
        isAdmin={isAdmin}
      />
      
      {/* Modal de detalles */}
      <DetailView
        facilityId={selectedFacility || ''}
        reservations={reservations}
        open={!!selectedFacility}
        onClose={() => setSelectedFacility(null)}
      />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App
