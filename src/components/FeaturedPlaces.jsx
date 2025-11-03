import { MapPin, Star } from "lucide-react";
import { motion } from "framer-motion";

function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full bg-sky-50 px-2.5 py-1 text-xs font-medium text-sky-700 ring-1 ring-sky-100">
      {children}
    </span>
  );
}

function Card({ place }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-sky-100"
    >
      <div className="aspect-[16/9] w-full overflow-hidden rounded-xl bg-sky-50">
        <img
          src={place.image}
          alt={place.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="mt-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-lg font-semibold text-sky-900">{place.name}</h3>
          <div className="flex items-center gap-1 text-sky-700">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{place.score.toFixed(1)}</span>
          </div>
        </div>
        <p className="mt-1 text-sm text-sky-600 capitalize">{place.type}</p>
        <div className="mt-2 flex items-center gap-1 text-sky-700 text-sm">
          <MapPin className="h-4 w-4" /> {place.city}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {place.tags.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function FeaturedPlaces({ items = [] }) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-sky-900">Featured places</h2>
            <p className="text-sky-700 text-sm sm:text-base mt-1">Curated spots with great accessibility</p>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((p) => (
            <Card key={p.id} place={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
