import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import alexeyAvatar from "@/assets/avatars/alexey-p.jpg";
import mariaAvatar from "@/assets/avatars/maria-s.jpg";
import sidorovAvatar from "@/assets/avatars/sidorov-s.jpg";

interface UserAccess {
  name: string;
  subtitle: string;
  role: string;
  avatar: string;
  stats: boolean;
  iznanka: boolean;
  iznankaWarning?: boolean;
  rawLogs: boolean;
  rawLogsLocked: boolean;
  lastLogin: string;
}

const initialUsers: UserAccess[] = [
  {
    name: "Алексей П.", subtitle: "Admin", role: "Admin", avatar: alexeyAvatar,
    stats: true, iznanka: true, rawLogs: false, rawLogsLocked: true, lastLogin: "26.03.2022, 15:34",
  },
  {
    name: "Мария С.", subtitle: "Лидер", role: "Лидер", avatar: mariaAvatar,
    stats: true, iznanka: true, iznankaWarning: true, rawLogs: false, rawLogsLocked: true, lastLogin: "27.03.2022, 20:00",
  },
  {
    name: "Снудов С.", subtitle: "Сотрудник", role: "Сотрудник", avatar: sidorovAvatar,
    stats: false, iznanka: false, rawLogs: false, rawLogsLocked: true, lastLogin: "28.02.2022, 20:15",
  },
];

const auditLog = [
  { time: "10:30:01", tag: "AUDIT", tagColor: "text-primary", text: 'Алексей П. просматривал профиль "Мария С. (Изнанка)" (Reason: Подготовка к Ritual).' },
  { time: "09:15:22", tag: "ALERT", tagColor: "text-destructive", text: 'Попытка доступа к сырым логам от "Снудов С." (Denied).' },
  { time: "08:42:10", tag: "AUDIT", tagColor: "text-primary", text: 'Мария С. открыла раздел "Мосты" для команды разработки.' },
  { time: "07:58:33", tag: "INFO", tagColor: "text-blue", text: "Система обновила матрицу доступов после изменения роли." },
];

function Toggle({ on, locked, warning, onChange }: {
  on: boolean; locked?: boolean; warning?: boolean; onChange: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={`relative inline-flex items-center rounded-full transition-all duration-200 cursor-pointer
          ${locked ? "w-[72px] h-[30px]" : "w-[60px] h-[30px]"}
          ${warning && on ? "ring-2 ring-destructive/40 bg-destructive/10" : ""}
          ${on
            ? locked ? "bg-muted" : "bg-green-600/80 border border-green-500/40"
            : "bg-surface-2 border border-border"
          }
          ${locked ? "cursor-not-allowed opacity-70" : "hover:brightness-110"}
        `}
        onClick={locked ? undefined : onChange}
      >
        {locked && (
          <span className="absolute left-2 text-[11px] text-muted-foreground">🔒</span>
        )}
        <span className={`text-[10px] font-bold absolute ${on ? "left-2.5" : "right-2"} ${locked ? "hidden" : ""} ${
          on ? "text-green-100" : "text-muted-foreground"
        }`}>
          {on ? "ON" : "OFF"}
        </span>
        <motion.div
          layout
          className={`w-[22px] h-[22px] rounded-full shadow absolute top-[3px] ${
            on
              ? locked ? "bg-muted-foreground" : "bg-white"
              : "bg-muted-foreground"
          }`}
          style={{ left: on ? (locked ? 46 : 34) : 4 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </div>
      {warning && on && (
        <motion.span
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[10px] text-destructive font-mono-brand flex items-center gap-1"
        >
          ⚠ Требуется подтверждение
        </motion.span>
      )}
    </div>
  );
}

export default function PageAdmin() {
  const [users, setUsers] = useState(initialUsers);

  const toggleField = (idx: number, field: "stats" | "iznanka" | "rawLogs") => {
    setUsers(prev => prev.map((u, i) => {
      if (i !== idx) return u;
      if (field === "rawLogs" && u.rawLogsLocked) return u;
      return { ...u, [field]: !u[field] };
    }));
  };

  return (
    <div className="animate-fade-in">
      <h2 className="font-display text-xl sm:text-[26px] font-bold mb-5 sm:mb-7">
        Admin & Ethics Panel: <span className="text-text-dim font-normal">Управление доступами</span>
      </h2>

      {/* Access Table */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-surface border border-border rounded-xl overflow-hidden mb-5"
      >
        {/* Header */}
        <div className="hidden sm:grid grid-cols-[1fr_100px_130px_150px_120px_140px] gap-2 px-5 py-3 bg-card border-b border-border text-xs font-semibold text-text-dim">
          <span>Пользователь</span>
          <span className="text-center">Роль</span>
          <span className="text-center">Видит общую статистику</span>
          <span className="text-center">Видит Изнанку других (Маски/Мосты)</span>
          <span className="text-center">Доступ к сырым логам</span>
          <span className="text-center">Последний вход</span>
        </div>

        {/* Rows */}
        {users.map((u, i) => (
          <motion.div
            key={u.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className={`grid grid-cols-1 sm:grid-cols-[1fr_100px_130px_150px_120px_140px] gap-3 sm:gap-2 px-4 sm:px-5 py-4 items-center ${
              i < users.length - 1 ? "border-b border-border" : ""
            } hover:bg-card/40 transition-colors`}
          >
            {/* User */}
            <div className="flex items-center gap-3">
              <img src={u.avatar} alt={u.name} className="w-10 h-10 rounded-full object-cover border border-border" />
              <div>
                <div className="text-sm font-semibold">{u.name}</div>
                <div className="text-[11px] text-muted-foreground">({u.subtitle})</div>
              </div>
            </div>

            {/* Role */}
            <div className="text-center">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                u.role === "Admin"
                  ? "bg-primary/10 text-primary border-primary/30"
                  : u.role === "Лидер"
                  ? "bg-blue/10 text-blue border-blue/30"
                  : "bg-card text-text-dim border-border"
              }`}>
                {u.role}
              </span>
            </div>

            {/* Stats */}
            <div className="flex justify-center">
              <Toggle on={u.stats} onChange={() => toggleField(i, "stats")} />
            </div>

            {/* Iznanka */}
            <div className="flex justify-center">
              <Toggle on={u.iznanka} warning={u.iznankaWarning} onChange={() => toggleField(i, "iznanka")} />
            </div>

            {/* Raw Logs */}
            <div className="flex justify-center">
              <Toggle on={u.rawLogs} locked={u.rawLogsLocked} onChange={() => toggleField(i, "rawLogs")} />
            </div>

            {/* Last Login */}
            <div className="text-center text-xs text-text-dim font-mono-brand">{u.lastLogin}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Audit Log */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-surface border border-green/20 rounded-xl p-4 sm:p-5"
      >
        <h3 className="font-display text-[15px] sm:text-[17px] font-semibold mb-4 flex items-center gap-2">
          <span className="w-1.5 h-5 rounded-full bg-green inline-block" />
          Журнал аудита (Этика)
        </h3>
        <div className="space-y-2.5">
          {auditLog.map((log, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.08 }}
              className="flex gap-2 text-sm font-mono-brand leading-relaxed"
            >
              <span className="text-muted-foreground shrink-0">{log.time}</span>
              <span className={`font-bold shrink-0 ${log.tagColor}`}>[{log.tag}]</span>
              <span className="text-text-dim">{log.text}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
