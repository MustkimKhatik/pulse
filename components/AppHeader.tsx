"use client";

import { ThemeToggle } from "@/components/ThemeToggle";

interface AppHeaderProps {
  title?: string;
  onBack?: () => void;
  onRefresh?: () => void;
  refreshing?: boolean;
  loading?: boolean;
}

export function AppHeader({
  title = "Pulse",
  onBack,
  onRefresh,
  refreshing = false,
  loading = false,
}: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-20 bg-navbar border-b border-theme px-4 py-3 flex items-center justify-between gap-2">
      <div className="flex items-center gap-2 min-w-0">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="text-secondary text-sm hover:text-primary transition-colors shrink-0"
          >
            ← Back
          </button>
        ) : (
          <h1 className="text-lg font-bold text-primary truncate">{title}</h1>
        )}
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <ThemeToggle />
        {onRefresh && (
          <button
            type="button"
            onClick={onRefresh}
            disabled={refreshing || loading}
            className="text-sm text-link font-medium disabled:opacity-50 hover:opacity-80 transition-opacity"
          >
            {refreshing ? "…" : "Refresh"}
          </button>
        )}
      </div>
    </header>
  );
}
