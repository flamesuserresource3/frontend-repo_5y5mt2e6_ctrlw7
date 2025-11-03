import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Star, MapPin, Tag, MessageCircle, Image as ImageIcon } from 'lucide-react';

// Demo data to render UI; wire to backend later
const demoPlaces = [
  {
    id: '1',
    name: 'Harborview Hotel',
    type: 'Hotel',
    city: 'San Diego, USA',
    score: 4.6,
    tags: ['Wheelchair', 'Elevator', 'Braille', 'Service animals'],
    address: '123 Ocean Ave, San Diego, CA',
    description: 'Beachfront stay with accessible rooms, roll-in showers, and staff trained in inclusive service.',
    lat: 32.7157,
    lon: -117.1611,
    photos: ['https://images.unsplash.com/photo-1551776235-dde6d4829808?q=80&w=1200&auto=format&fit=crop'],
    reviews: [
      { user: 'Maya', text: 'Wide ramps and great staff assistance.', rating: 5 },
      { user: 'Alex', text: 'Roll-in shower and grab bars were perfect.', rating: 4 },
    ],
  },
  {
    id: '2',
    name: 'Cedar Garden Restaurant',
    type: 'Restaurant',
    city: 'Toronto, Canada',
    score: 4.3,
    tags: ['Wheelchair', 'Large print menu', 'Quiet space'],
    address: '45 King St W, Toronto, ON',
    description: 'Cozy dining with step-free entry and senior-friendly seating.',
    lat: 43.6532,
    lon: -79.3832,
    photos: ['https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1200&auto=format&fit=crop'],
    reviews: [
      { user: 'Sam', text: 'Easy access and helpful staff.', rating: 4 },
    ],
  },
  {
    id: '3',
    name: 'Riverwalk Museum',
    type: 'Attraction',
    city: 'London, UK',
    score: 4.8,
    tags: ['Wheelchair', 'Audio guide', 'Braille'],
    address: '200 Thames Rd, London',
    description: 'Accessible exhibits with tactile displays and audio descriptions.',
    lat: 51.5072,
    lon: -0.1276,
    photos: ['https://images.unsplash.com/photo-1535905496755-26ae35d0ae54?q=80&w=1200&auto=format&fit=crop'],
    reviews: [
      { user: 'Noah', text: 'Fantastic accessible experience!', rating: 5 },
    ],
  },
];

function Rating({ value }) {
  const stars = Math.round(value);
  return (
    <div className="flex items-center gap-1" aria-label={`Accessibility score ${value} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`w-4 h-4 ${i < stars ? 'text-yellow-500 fill-yellow-400' : 'text-slate-300'}`} />
      ))}
      <span className="ml-1 text-xs text-slate-600">{value.toFixed(1)}</span>
    </div>
  );
}

function PlaceCard({ place, onOpen }) {
  return (
    <button onClick={() => onOpen(place)} className="text-left w-full bg-white rounded-2xl p-4 shadow-sm ring-1 ring-slate-100 hover:shadow-md active:scale-[0.99] transition">
      <div className="aspect-[16/9] w-full overflow-hidden rounded-xl bg-slate-100">
        {place.photos?.[0] ? (
          <img src={place.photos[0]} alt="Place" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full grid place-items-center text-slate-400"><ImageIcon className="w-8 h-8" /></div>
        )}
      </div>
      <div className="mt-3 flex items-start justify-between gap-2">
        <div>
          <p className="font-semibold text-slate-900">{place.name}</p>
          <p className="text-xs text-slate-500">{place.type} • {place.city}</p>
        </div>
        <Rating value={place.score} />
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {place.tags.slice(0, 4).map((t) => (
          <span key={t} className="inline-flex items-center gap-1 rounded-full bg-blue-50 text-blue-700 px-2 py-1 text-[11px]">
            <Tag className="w-3 h-3" /> {t}
          </span>
        ))}
      </div>
    </button>
  );
}

function FiltersBar({ filters, setFilters }) {
  const toggle = (key) => setFilters((f) => ({ ...f, [key]: !f[key] }));
  return (
    <div className="sticky top-[56px] z-40 bg-white/80 backdrop-blur border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 py-3 flex gap-2 overflow-auto">
        {['Wheelchair', 'Braille', 'Audio guide', 'Large print menu', 'Elevator', 'Quiet space', 'Service animals'].map((tag) => (
          <button
            key={tag}
            onClick={() => toggle(tag)}
            className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap border ${filters[tag] ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700 border-slate-200'} active:scale-[0.98]`}
            aria-pressed={!!filters[tag]}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}

function HomePage({ onSearch }) {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-10 sm:py-14">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-900 leading-tight">Travel, made accessible.</h1>
          <p className="mt-3 text-blue-700 text-base sm:text-lg">Find accessible hotels, restaurants, and attractions worldwide.</p>

          <form onSubmit={onSearch} className="mt-6 flex items-center gap-2 rounded-2xl bg-white p-2 shadow-lg ring-1 ring-blue-100 max-w-xl mx-auto">
            <Search className="h-5 w-5 text-blue-500" />
            <input name="q" type="text" placeholder="Search destination (e.g., Barcelona, Central Park)" className="flex-1 rounded-xl border-0 focus:ring-0 text-blue-900 placeholder:text-blue-400 text-base p-2" aria-label="Search destination" />
            <button type="submit" className="rounded-xl bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700 active:bg-blue-800 transition-colors">Search</button>
          </form>
        </motion.div>

        <div className="mt-8 text-left">
          <h2 className="text-lg font-semibold text-blue-900">Featured places</h2>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {demoPlaces.slice(0, 3).map((p) => (
              <PlaceCard key={p.id} place={p} onOpen={(pl) => { window.location.hash = `#/place/${pl.id}`; }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SearchPage({ query }) {
  const [filters, setFilters] = useState({});
  const results = useMemo(() => {
    let r = demoPlaces.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.city.toLowerCase().includes(query.toLowerCase()) ||
      p.type.toLowerCase().includes(query.toLowerCase())
    );
    const active = Object.keys(filters).filter((k) => filters[k]);
    if (active.length) {
      r = r.filter((p) => active.every((t) => p.tags.includes(t)));
    }
    return r;
  }, [query, filters]);

  return (
    <div>
      <FiltersBar filters={filters} setFilters={setFilters} />
      <div className="max-w-6xl mx-auto px-4 py-4">
        <p className="text-sm text-slate-600">Showing {results.length} result(s) for “{query}”.</p>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((p) => (
            <PlaceCard key={p.id} place={p} onOpen={(pl) => { window.location.hash = `#/place/${pl.id}`; }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function DetailPage({ id }) {
  const place = demoPlaces.find((p) => p.id === id);
  if (!place) return <div className="max-w-6xl mx-auto px-4 py-8">Not found.</div>;
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="aspect-[16/9] w-full overflow-hidden rounded-2xl bg-slate-100">
        {place.photos?.[0] && (
          <img src={place.photos[0]} alt={`${place.name} photo`} className="w-full h-full object-cover" />
        )}
      </div>

      <div className="mt-4 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{place.name}</h1>
          <p className="text-sm text-slate-600 flex items-center gap-1"><MapPin className="w-4 h-4" /> {place.address} • {place.city}</p>
        </div>
        <Rating value={place.score} />
      </div>

      <p className="mt-3 text-slate-700">{place.description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {place.tags.map((t) => (
          <span key={t} className="inline-flex items-center gap-1 rounded-full bg-blue-50 text-blue-700 px-2 py-1 text-xs"><Tag className="w-3 h-3" /> {t}</span>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <h2 className="font-semibold text-slate-900">User reviews</h2>
          <div className="mt-2 space-y-3">
            {place.reviews.map((r, i) => (
              <div key={i} className="rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-100">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-slate-900">{r.user}</p>
                  <Rating value={r.rating} />
                </div>
                <p className="text-sm text-slate-700 mt-1">{r.text}</p>
              </div>
            ))}
          </div>

          <form className="mt-4 rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-100">
            <label className="block text-sm font-medium text-slate-900">Add your review</label>
            <textarea className="mt-1 w-full rounded-lg border-slate-200 focus:border-blue-300 focus:ring-blue-300" rows={3} placeholder="Share your experience..." />
            <button type="button" className="mt-2 rounded-lg bg-blue-600 text-white px-4 py-2 text-sm font-semibold hover:bg-blue-700">Submit</button>
          </form>
        </div>
        <div>
          <h2 className="font-semibold text-slate-900">Map</h2>
          <div className="mt-2 overflow-hidden rounded-xl ring-1 ring-slate-200">
            <iframe
              title="map"
              src={`https://www.openstreetmap.org/export/embed.html?layer=mapnik&marker=${place.lat}%2C${place.lon}`}
              className="w-full h-64"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function AddListingPage() {
  const [tags, setTags] = useState([]);
  const handleTagToggle = (t) => setTags((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    payload.tags = tags;
    console.log('Submit listing', payload);
    alert('Listing submitted! (Demo)');
    window.location.hash = '#/search';
  };
  const allTags = ['Wheelchair', 'Braille', 'Audio guide', 'Large print menu', 'Elevator', 'Quiet space', 'Service animals'];
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-slate-900">Add a new place</h1>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-900">Name</label>
          <input name="name" required className="mt-1 w-full rounded-lg border-slate-200 focus:border-blue-300 focus:ring-blue-300" placeholder="Place name" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-900">Type</label>
            <select name="type" className="mt-1 w-full rounded-lg border-slate-200 focus:border-blue-300 focus:ring-blue-300">
              <option>Hotel</option>
              <option>Restaurant</option>
              <option>Attraction</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-900">City</label>
            <input name="city" className="mt-1 w-full rounded-lg border-slate-200 focus:border-blue-300 focus:ring-blue-300" placeholder="City, Country" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-900">Address</label>
          <input name="address" className="mt-1 w-full rounded-lg border-slate-200 focus:border-blue-300 focus:ring-blue-300" placeholder="Street, City" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-900">Description</label>
          <textarea name="description" rows={4} className="mt-1 w-full rounded-lg border-slate-200 focus:border-blue-300 focus:ring-blue-300" placeholder="Describe accessibility features" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-900">Photos</label>
          <input type="file" accept="image/*" multiple className="mt-1 w-full rounded-lg border-slate-200" />
          <p className="text-xs text-slate-500 mt-1">Photos are optional in this demo.</p>
        </div>
        <div>
          <span className="block text-sm font-medium text-slate-900">Accessibility tags</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {allTags.map((t) => (
              <button type="button" key={t} onClick={() => handleTagToggle(t)} className={`px-3 py-1.5 rounded-full text-sm border ${tags.includes(t) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700 border-slate-200'}`}>
                {t}
              </button>
            ))}
          </div>
        </div>
        <button type="submit" className="w-full rounded-xl bg-blue-600 text-white px-4 py-3 font-semibold hover:bg-blue-700 active:bg-blue-800">Submit place</button>
      </form>
    </div>
  );
}

function CommunityPage() {
  const posts = [
    { id: 1, title: 'Rolling through Rome', excerpt: 'My tips for navigating ancient sites with a wheelchair...', author: 'Lina' },
    { id: 2, title: 'Quiet corners in NYC', excerpt: 'Sensory-friendly spaces I loved in Manhattan...', author: 'Dev' },
  ];
  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-slate-900">Community stories</h1>
      <div className="mt-4 space-y-3">
        {posts.map((p) => (
          <article key={p.id} className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
            <h2 className="font-semibold text-slate-900">{p.title}</h2>
            <p className="mt-1 text-sm text-slate-700">{p.excerpt}</p>
            <div className="mt-2 text-xs text-slate-500 inline-flex items-center gap-1"><MessageCircle className="w-4 h-4" /> by {p.author}</div>
          </article>
        ))}
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-slate-900">About AccessAble</h1>
      <p className="mt-2 text-slate-700">AccessAble helps travelers with disabilities and seniors find accessible hotels, restaurants, and attractions. Our mission is to make inclusive travel the default.
      </p>
      <h2 className="mt-6 font-semibold text-slate-900">Contact</h2>
      <p className="mt-1 text-slate-700">Email us at <a href="mailto:hello@accessable.app" className="text-blue-700 underline">hello@accessable.app</a></p>
    </div>
  );
}

export default function PageRouter() {
  const [route, setRoute] = useState(window.location.hash || '#/');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash || '#/');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const onSearch = (e) => {
    e.preventDefault();
    const q = new FormData(e.currentTarget).get('q')?.toString() || '';
    setQuery(q);
    window.location.hash = '#/search';
  };

  const content = useMemo(() => {
    if (route.startsWith('#/place/')) {
      const id = route.replace('#/place/', '');
      return <DetailPage id={id} />;
    }
    switch (route) {
      case '#/':
        return <HomePage onSearch={onSearch} />;
      case '#/search':
        return <SearchPage query={query || ''} />;
      case '#/add':
        return <AddListingPage />;
      case '#/community':
        return <CommunityPage />;
      case '#/about':
        return <AboutPage />;
      default:
        return <HomePage onSearch={onSearch} />;
    }
  }, [route, query]);

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} className="min-h-[60vh]">
      {content}
    </motion.main>
  );
}
