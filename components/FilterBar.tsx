"use client";

export type CategoryFilter = "All" | "A" | "B";

interface FilterBarProps {
  category: CategoryFilter;
  topic: string;
  topics: string[];
  onCategoryChange: (category: CategoryFilter) => void;
  onTopicChange: (topic: string) => void;
}

const CATEGORIES: { id: CategoryFilter; label: string }[] = [
  { id: "All", label: "All" },
  { id: "A", label: "Digest" },
  { id: "B", label: "Blogs" },
];

function Chip({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
        active
          ? "bg-gray-900 text-white"
          : "bg-white text-gray-600 border border-gray-200"
      }`}
    >
      {label}
    </button>
  );
}

export function FilterBar({
  category,
  topic,
  topics,
  onCategoryChange,
  onTopicChange,
}: FilterBarProps) {
  return (
    <div className="sticky top-0 z-10 bg-gray-50 pb-2 space-y-2">
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {CATEGORIES.map((c) => (
          <Chip
            key={c.id}
            label={c.label}
            active={category === c.id}
            onClick={() => onCategoryChange(c.id)}
          />
        ))}
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        <Chip
          label="All"
          active={topic === "All"}
          onClick={() => onTopicChange("All")}
        />
        {topics.map((t) => (
          <Chip
            key={t}
            label={t}
            active={topic === t}
            onClick={() => onTopicChange(t)}
          />
        ))}
      </div>
    </div>
  );
}
