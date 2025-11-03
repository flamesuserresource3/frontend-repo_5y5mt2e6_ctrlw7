import { motion } from "framer-motion";
import { Search } from "lucide-react";

export default function Hero({ onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const q = formData.get("q")?.toString().trim();
    if (q) onSearch(q);
  };

  return (
    <section className="bg-gradient-to-b from-sky-50 to-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-sky-900 leading-tight">
            AccessAble
          </h1>
          <p className="mt-3 text-sky-700 text-base sm:text-lg">
            Find accessible hotels, restaurants, and attractions worldwide.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-6 flex items-center gap-2 rounded-2xl bg-white p-2 shadow-lg ring-1 ring-sky-100 max-w-xl mx-auto"
          >
            <Search className="h-5 w-5 text-sky-500" />
            <input
              name="q"
              type="text"
              placeholder="Search destination or place (e.g., Barcelona, Central Park)"
              className="flex-1 rounded-xl border-0 focus:ring-0 text-sky-900 placeholder:text-sky-400 text-base p-2"
              aria-label="Search destination"
            />
            <button
              type="submit"
              className="rounded-xl bg-sky-600 px-4 py-2 text-white font-semibold hover:bg-sky-700 active:bg-sky-800 transition-colors"
            >
              Search
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
