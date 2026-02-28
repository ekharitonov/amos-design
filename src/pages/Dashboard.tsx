import { useState } from "react";
import { Link } from "react-router-dom";
import PageMain from "@/components/dashboard/pages/PageMain";
import PageTeam from "@/components/dashboard/pages/PageTeam";
import PageMasks from "@/components/dashboard/pages/PageMasks";
import PageOsnova from "@/components/dashboard/pages/PageOsnova";
import PageBridges from "@/components/dashboard/pages/PageBridges";
import PageSettings from "@/components/dashboard/pages/PageSettings";
import PageRitualPrep from "@/components/dashboard/pages/PageRitualPrep";
import PageAdmin from "@/components/dashboard/pages/PageAdmin";

const nav = [
  { id: "main", label: "Главная" },
  { id: "team", label: "Команда" },
  { id: "iznanka", label: "Изнанка" },
  { id: "ritual", label: "Ritual Prep" },
  { id: "admin", label: "Admin" },
  { id: "settings", label: "Настройки" },
];

const layers = [
  { id: "masks", label: "Маски" },
  { id: "osnova", label: "Основа" },
  { id: "bridges", label: "Мосты" },
];

export default function Dashboard() {
  const [page, setPage] = useState("main");
  const [layer, setLayer] = useState("masks");

  const content = () => {
    switch (page) {
      case "main": return <PageMain />;
      case "team": return <PageTeam />;
      case "iznanka":
        if (layer === "masks") return <PageMasks />;
        if (layer === "osnova") return <PageOsnova />;
        return <PageBridges />;
      case "ritual": return <PageRitualPrep />;
      case "admin": return <PageAdmin />;
      case "settings": return <PageSettings />;
      default: return <PageMain />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* TOP NAV */}
      <nav className="flex items-center px-3 sm:px-7 h-14 border-b border-border bg-card sticky top-0 z-50 backdrop-blur-xl overflow-x-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <Link to="/" className="flex items-center gap-2 sm:gap-2.5 mr-4 sm:mr-10 shrink-0">
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none" className="shrink-0 sm:w-7 sm:h-7">
            <path d="M16 3L28 28H23.5L20.5 21H11.5L8.5 28H4L16 3Z" fill="hsl(43 56% 54%)" />
            <path d="M13 17.5H19L16 10L13 17.5Z" fill="hsl(260 18% 5%)" />
          </svg>
          <span className="font-display text-base sm:text-lg font-bold tracking-widest">АМОС</span>
        </Link>

        <div className="flex shrink-0">
          {nav.map(n => (
            <button key={n.id}
              onClick={() => { setPage(n.id); if (n.id === "iznanka") setLayer("masks"); }}
              className={`relative bg-transparent border-none cursor-pointer px-2.5 sm:px-4 py-[17px] text-xs sm:text-sm whitespace-nowrap transition-colors ${
                page === n.id ? "font-semibold text-foreground" : "text-text-dim hover:text-foreground"
              }`}
            >
              {n.label}
              <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-sm bg-primary transition-all duration-200 ${
                page === n.id ? "w-[60%] shadow-[0_0_8px_rgba(201,168,76,0.12)]" : "w-0"
              }`} />
            </button>
          ))}
        </div>
      </nav>

      {/* IZNANKA SUB-NAV */}
      {page === "iznanka" && (
        <div className="flex px-3 sm:px-7 bg-secondary border-b border-border animate-fade-in overflow-x-auto">
          {layers.map(l => (
            <button key={l.id} onClick={() => setLayer(l.id)}
              className={`relative bg-transparent border-none cursor-pointer px-3 sm:px-4 py-3 text-xs sm:text-[13px] whitespace-nowrap transition-colors ${
                layer === l.id ? "font-semibold text-primary" : "text-muted-foreground hover:text-text-dim"
              }`}
            >
              {l.label}
              <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-sm bg-primary transition-all duration-200 ${
                layer === l.id ? "w-[70%]" : "w-0"
              }`} />
            </button>
          ))}
        </div>
      )}

      {/* CONTENT */}
      <main className="p-3 sm:p-6 max-w-[1160px] mx-auto">
        {content()}
      </main>
    </div>
  );
}
