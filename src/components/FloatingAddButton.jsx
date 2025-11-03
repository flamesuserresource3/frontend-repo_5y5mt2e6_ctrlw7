import { Plus } from "lucide-react";

export default function FloatingAddButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label="Add Place"
      className="fixed bottom-6 right-6 z-20 inline-flex items-center gap-2 rounded-full bg-sky-600 px-4 py-3 text-white shadow-lg ring-1 ring-sky-400/40 hover:bg-sky-700 active:bg-sky-800 focus:outline-none focus:ring-4 focus:ring-sky-300"
    >
      <Plus className="h-5 w-5" />
      <span className="font-semibold hidden sm:inline">Add Place</span>
    </button>
  );
}
