import {useState} from 'react';

const categories = [
  {name: 'Pottery', emoji: '🏺'},
  {name: 'Textiles', emoji: '🧵'},
  {name: 'Woodwork', emoji: '🪵'},
  {name: 'Jewelry', emoji: '💍'},
];

export default function App() {
  const [active, setActive] = useState(0);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <h1 className="text-2xl font-semibold tracking-tight">MOONCREATION</h1>
          <nav className="flex gap-6 text-sm text-stone-600">
            <a href="#shop" className="hover:text-stone-900">Shop</a>
            <a href="#about" className="hover:text-stone-900">About</a>
            <a href="#contact" className="hover:text-stone-900">Contact</a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-16">
        <section className="text-center">
          <p className="text-sm uppercase tracking-widest text-stone-500">Artisanal eCommerce</p>
          <h2 className="mt-4 text-5xl font-light leading-tight">
            Handcrafted goods,<br />made with intention.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-stone-600">
            Discover one-of-a-kind pieces from independent makers. Every item tells a story.
          </p>
        </section>

        <section id="shop" className="mt-20">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((c, i) => (
              <button
                key={c.name}
                onClick={() => setActive(i)}
                className={`rounded-full border px-5 py-2 text-sm transition ${
                  active === i
                    ? 'border-stone-900 bg-stone-900 text-white'
                    : 'border-stone-300 bg-white text-stone-700 hover:border-stone-500'
                }`}
              >
                <span className="mr-2">{c.emoji}</span>
                {c.name}
              </button>
            ))}
          </div>
          <div className="mt-10 rounded-2xl border border-stone-200 bg-white p-12 text-center">
            <div className="text-6xl">{categories[active].emoji}</div>
            <h3 className="mt-4 text-2xl font-medium">{categories[active].name}</h3>
            <p className="mt-2 text-stone-600">Collection coming soon.</p>
          </div>
        </section>
      </main>

      <footer className="border-t border-stone-200 bg-white py-8 text-center text-sm text-stone-500">
        © {new Date().getFullYear()} MOONCREATION
      </footer>
    </div>
  );
}
