import { useState } from "react";
import { Link } from "react-router-dom";
import PageMain from "@/components/dashboard/pages/PageMain";
import PageTeam from "@/components/dashboard/pages/PageTeam";
import PageMasks from "@/components/dashboard/pages/PageMasks";
import PageOsnova from "@/components/dashboard/pages/PageOsnova";
import PageBridges from "@/components/dashboard/pages/PageBridges";
import PageSettings from "@/components/dashboard/pages/PageSettings";

const nav = [
  { id: "main", label: "Главная" },
  { id: "team", label: "Команда" },
  { id: "iznanka", label: "Изнанка" },
  { id: "settings", label: "Настройки" },
];

const layers = [
  { id: "masks", label: "Слой I — Маски" },
  { id: "osnova", label: "Слой II — Основа" },
  { id: "bridges", label: "Слой III — Мосты" },
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
      case "settings": return <PageSettings />;
      default: return <PageMain />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* TOP NAV */}
      <nav className="flex items-center px-7 h-14 border-b border-border bg-card sticky top-0 z-50 backdrop-blur-xl">
        <Link to="/" className="flex items-center gap-2.5 mr-10">
          <div className="w-7 h-7 rounded-md bg-gradient-to-br from-primary to-accent-dim flex items-center justify-center font-extrabold text-sm text-primary-foreground shadow-[0_2px_10px_rgba(201,168,76,0.12)]">
            A
          </div>
          <span className="font-display text-lg font-bold tracking-widest">АМОС</span>
        </Link>

        {nav.map(n => (
          <button key={n.id}
            onClick={() => { setPage(n.id); if (n.id === "iznanka") setLayer("masks"); }}
            className={`relative bg-transparent border-none cursor-pointer px-4 py-[17px] text-sm transition-colors ${
              page === n.id ? "font-semibold text-foreground" : "text-text-dim hover:text-foreground"
            }`}
          >
            {n.label}
            <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-sm bg-primary transition-all duration-200 ${
              page === n.id ? "w-[60%] shadow-[0_0_8px_rgba(201,168,76,0.12)]" : "w-0"
            }`} />
          </button>
        ))}
      </nav>

      {/* IZNANKA SUB-NAV */}
      {page === "iznanka" && (
        <div className="flex px-7 bg-secondary border-b border-border animate-fade-in">
          {layers.map(l => (
            <button key={l.id} onClick={() => setLayer(l.id)}
              className={`relative bg-transparent border-none cursor-pointer px-4 py-3 text-[13px] transition-colors ${
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
      <main className="p-6 max-w-[1160px] mx-auto">
        {content()}
      </main>
    </div>
  );
}
