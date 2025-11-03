import { useMemo } from "react";
import { Filter, MapPin, Star } from "lucide-react";

const ALL_FILTERS = [
  "Wheelchair accessible",
  "Braille",
  "Senior-friendly",
  "Service animals allowed",
  "Step-free access",
];

function ToggleChip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-sm transition-colors ${
        active ? "bg-sky-600 text-white border-sky-600" : "bg-white text-sky-700 border-sky-200 hover:bg-sky-50"
      }`}
    >
      {children}
    </button>
  );
}

function ResultCard({ item, onView }) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-sky-100">
      <div className="aspect-[16/9] w-full overflow-hidden rounded-xl bg-sky-50">
        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
      </div>
      <div className="mt-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-lg font-semibold text-sky-900">{item.name}</h3>
          <div className="flex items-center gap-1 text-sky-700">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{item.score.toFixed(1)}</span>
          </div>
        </div>
        <p className="mt-1 text-sm text-sky-600 capitalize">{item.type}</p>
        <div className="mt-2 flex items-center gap-1 text-sky-700 text-sm">
          <MapPin className="h-4 w-4" /> {item.city}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {item.tags.map((t) => (
            <span key={t} className="inline-flex items-center rounded-full bg-sky-50 px-2.5 py-1 text-xs font-medium text-sky-700 ring-1 ring-sky-100">
              {t}
            </span>
          ))}
        </div>
        <div className="mt-4">
          <button
            onClick={() => onView(item)}
            className="w-full rounded-xl bg-sky-600 px-4 py-2 text-white font-semibold hover:bg-sky-700 active:bg-sky-800 transition-colors"
          >
            View details
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Results({ items = [], activeFilters = [], onToggleFilter, onClearFilters, onViewDetail }) {
  const filtered = useMemo(() => {
    if (!activeFilters.length) return items;
    return items.filter((i) => activeFilters.every((f) => i.tags.includes(f)));
  }, [items, activeFilters]);

  return (
    <section id="results" className="bg-sky-50/60">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-sky-900">Search results</h2>
          <div className="hidden sm:flex items-center gap-2 text-sky-700">
            <Filter className="h-4 w-4" />
            <span className="text-sm">Filters</span>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {ALL_FILTERS.map((f) => (
            <ToggleChip key={f} active={activeFilters.includes(f)} onClick={() => onToggleFilter(f)}>
              {f}
            </ToggleChip>
          ))}
          {activeFilters.length > 0 && (
            <button onClick={onClearFilters} className="text-sm text-sky-700 underline">Clear</button>
          )}
        </div>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item) => (
            <ResultCard key={item.id} item={item} onView={onViewDetail} />
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full rounded-xl border border-dashed border-sky-200 p-6 text-center text-sky-700">
              No places match those filters yet.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
