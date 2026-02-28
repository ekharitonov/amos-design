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
  { time: "10:30:01", tag: "AUDIT" as const, tagColor: "text-primary", text: 'Алексей П. просматривал профиль "Мария С. (Изнанка)" (Reason: Подготовка к Ritual).' },
  { time: "09:15:22", tag: "ALERT" as const, tagColor: "text-destructive", text: 'Попытка доступа к сырым логам от "Снудов С." (Denied).' },
  { time: "08:42:10", tag: "AUDIT" as const, tagColor: "text-primary", text: 'Мария С. открыла раздел "Мосты" для команды разработки.' },
  { time: "07:58:33", tag: "INFO" as const, tagColor: "text-blue", text: "Система обновила матрицу доступов после изменения роли." },
  { time: "07:30:00", tag: "ALERT" as const, tagColor: "text-destructive", text: 'Неавторизованная попытка экспорта данных от "Снудов С."' },
  { time: "06:45:12", tag: "INFO" as const, tagColor: "text-blue", text: "Автоматическая ротация ключей доступа завершена." },
];

const tagOptions = ["ALL", "AUDIT", "ALERT", "INFO"] as const;

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

function ConfirmModal({ userName, onConfirm, onCancel }: {
  userName: string; onConfirm: () => void; onCancel: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onCancel}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        onClick={e => e.stopPropagation()}
        className="bg-card border border-destructive/30 rounded-xl p-6 max-w-md w-full shadow-2xl"
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="w-10 h-10 rounded-full bg-destructive/15 flex items-center justify-center text-lg">⚠️</span>
          <h3 className="font-display text-lg font-bold">Подтверждение доступа</h3>
        </div>
        <p className="text-sm text-text-dim leading-relaxed mb-2">
          Вы собираетесь предоставить <span className="text-foreground font-semibold">{userName}</span> доступ к <span className="text-destructive font-semibold">Изнанке других сотрудников</span> (Маски, Основа, Мосты).
        </p>
        <p className="text-xs text-muted-foreground leading-relaxed mb-6">
          Это чувствительные данные. Действие будет записано в журнал аудита. Убедитесь, что у сотрудника есть обоснованная причина для доступа.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-lg text-sm font-semibold bg-surface border border-border text-text-dim hover:bg-card transition-colors"
          >
            Отмена
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-lg text-sm font-semibold bg-destructive/15 border border-destructive/30 text-destructive hover:bg-destructive/25 transition-colors"
          >
            Подтвердить доступ
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function PageAdmin() {
  const [users, setUsers] = useState(initialUsers);
  const [confirmIdx, setConfirmIdx] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [tagFilter, setTagFilter] = useState<typeof tagOptions[number]>("ALL");

  const toggleField = (idx: number, field: "stats" | "iznanka" | "rawLogs") => {
    if (field === "iznanka" && !users[idx].iznanka) {
      setConfirmIdx(idx);
      return;
    }
    setUsers(prev => prev.map((u, i) => {
      if (i !== idx) return u;
      if (field === "rawLogs" && u.rawLogsLocked) return u;
      return { ...u, [field]: !u[field] };
    }));
  };

  const confirmIznanka = () => {
    if (confirmIdx === null) return;
    setUsers(prev => prev.map((u, i) =>
      i === confirmIdx ? { ...u, iznanka: true, iznankaWarning: true } : u
    ));
    setConfirmIdx(null);
  };

  const filteredLogs = auditLog.filter(log => {
    const matchTag = tagFilter === "ALL" || log.tag === tagFilter;
    const matchSearch = !searchQuery || log.text.toLowerCase().includes(searchQuery.toLowerCase()) || log.time.includes(searchQuery);
    return matchTag && matchSearch;
  });

  return (
    <div className="animate-fade-in">
      {/* Confirmation Modal */}
      <AnimatePresence>
        {confirmIdx !== null && (
          <ConfirmModal
            userName={users[confirmIdx].name}
            onConfirm={confirmIznanka}
            onCancel={() => setConfirmIdx(null)}
          />
        )}
      </AnimatePresence>

      <h2 className="font-display text-xl sm:text-[26px] font-bold mb-5 sm:mb-7">
        Admin & Ethics Panel: <span className="text-text-dim font-normal">Управление доступами</span>
      </h2>

      {/* Access Table */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-surface border border-border rounded-xl overflow-hidden mb-5"
      >
        <div className="hidden sm:grid grid-cols-[1fr_100px_130px_150px_120px_140px] gap-2 px-5 py-3 bg-card border-b border-border text-xs font-semibold text-text-dim">
          <span>Пользователь</span>
          <span className="text-center">Роль</span>
          <span className="text-center">Видит общую статистику</span>
          <span className="text-center">Видит Изнанку других (Маски/Мосты)</span>
          <span className="text-center">Доступ к сырым логам</span>
          <span className="text-center">Последний вход</span>
        </div>

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
            <div className="flex items-center gap-3">
              <img src={u.avatar} alt={u.name} className="w-10 h-10 rounded-full object-cover border border-border" />
              <div>
                <div className="text-sm font-semibold">{u.name}</div>
                <div className="text-[11px] text-muted-foreground">({u.subtitle})</div>
              </div>
            </div>
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
            <div className="flex justify-center">
              <Toggle on={u.stats} onChange={() => toggleField(i, "stats")} />
            </div>
            <div className="flex justify-center">
              <Toggle on={u.iznanka} warning={u.iznankaWarning} onChange={() => toggleField(i, "iznanka")} />
            </div>
            <div className="flex justify-center">
              <Toggle on={u.rawLogs} locked={u.rawLogsLocked} onChange={() => toggleField(i, "rawLogs")} />
            </div>
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <h3 className="font-display text-[15px] sm:text-[17px] font-semibold flex items-center gap-2">
            <span className="w-1.5 h-5 rounded-full bg-green inline-block" />
            Журнал аудита (Этика)
          </h3>

          <div className="flex items-center gap-2">
            {/* Tag filter */}
            <div className="flex rounded-lg border border-border overflow-hidden">
              {tagOptions.map(tag => (
                <button
                  key={tag}
                  onClick={() => setTagFilter(tag)}
                  className={`px-2.5 py-1.5 text-[10px] font-mono-brand font-semibold transition-colors ${
                    tagFilter === tag
                      ? tag === "ALERT" ? "bg-destructive/15 text-destructive" 
                        : tag === "AUDIT" ? "bg-primary/15 text-primary"
                        : tag === "INFO" ? "bg-blue/15 text-blue"
                        : "bg-card text-foreground"
                      : "text-muted-foreground hover:text-text-dim hover:bg-card/50"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Поиск..."
                className="w-[140px] sm:w-[180px] bg-card border border-border rounded-lg px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/40 font-mono-brand transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-xs"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-2.5">
          <AnimatePresence mode="popLayout">
            {filteredLogs.length > 0 ? filteredLogs.map((log, i) => (
              <motion.div
                key={log.time + log.tag}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ delay: i * 0.04 }}
                layout
                className="flex gap-2 text-sm font-mono-brand leading-relaxed"
              >
                <span className="text-muted-foreground shrink-0">{log.time}</span>
                <span className={`font-bold shrink-0 ${log.tagColor}`}>[{log.tag}]</span>
                <span className="text-text-dim">{log.text}</span>
              </motion.div>
            )) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-muted-foreground text-center py-4"
              >
                Нет записей по заданным фильтрам
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
