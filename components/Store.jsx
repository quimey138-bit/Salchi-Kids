"use client";
import { useMemo, useState } from "react";
import Image from "next/image";
import { ShoppingBag, Shirt } from "lucide-react";
import { PRODUCTS, CATEGORIES } from "@/lib/products";
import { BRAND } from "@/lib/config";
import { money } from "@/lib/format";
import ProductModal from "./ProductModal";
import CartDrawer from "./CartDrawer";
import SizeTable from "./SizeTable";

const TILES = ["bg-lila", "bg-celeste", "bg-rosa"];
const STEPS = [
  ["Elegí talle y color", "Abrí una prenda y poné cuántas unidades querés de cada talle."],
  ["Revisá tu pedido", "En el carrito ves el detalle y el total."],
  ["Envialo por WhatsApp", "Te confirmamos stock y total, y coordinamos pago y entrega."],
];

export default function Store() {
  const [category, setCategory] = useState("todo");
  const [sort, setSort] = useState("catalogo");
  const [active, setActive] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState({});

  const list = useMemo(() => {
    const l = PRODUCTS.filter((p) => category === "todo" || p.category === category);
    if (sort === "menor") return [...l].sort((a, b) => a.price - b.price);
    if (sort === "mayor") return [...l].sort((a, b) => b.price - a.price);
    return l;
  }, [category, sort]);

  const lines = Object.entries(cart).map(([key, l]) => ({
    key,
    ...l,
    product: PRODUCTS.find((p) => p.id === l.pid),
  }));
  const units = lines.reduce((n, l) => n + l.qty, 0);
  const total = lines.reduce((n, l) => n + l.qty * l.product.price, 0);

  const saveProduct = (pid, items) => {
    setCart((prev) => {
      const next = Object.fromEntries(Object.entries(prev).filter(([, l]) => l.pid !== pid));
      items.forEach((i) => {
        if (i.qty > 0) next[`${pid}|${i.color}|${i.size}`] = { pid, color: i.color, size: i.size, qty: i.qty };
      });
      return next;
    });
    setActive(null);
  };

  const changeQty = (key, d) =>
    setCart((prev) => {
      const l = prev[key];
      if (!l) return prev;
      const next = { ...prev };
      if (l.qty + d <= 0) delete next[key];
      else next[key] = { ...l, qty: l.qty + d };
      return next;
    });

  return (
    <>
      <header className="sticky top-0 z-30 border-b-2 border-ink bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="#" className="font-display text-2xl font-bold">{BRAND.name}</a>
          <nav className="hidden gap-6 font-semibold sm:flex">
            <a href="#catalogo">Prendas</a>
            <a href="#talles">Talles</a>
            <a href="#como-comprar">Cómo comprar</a>
          </nav>
          <button
            onClick={() => setCartOpen(true)}
            aria-label={`Abrir pedido, ${units} unidades`}
            className="relative rounded-full border-2 border-ink bg-celeste p-2 hover:bg-lila"
          >
            <ShoppingBag size={22} />
            {units > 0 && (
              <span className="absolute -right-2 -top-2 grid h-6 min-w-6 place-items-center rounded-full border-2 border-ink bg-rosa px-1 text-xs font-bold">
                {units}
              </span>
            )}
          </button>
        </div>
      </header>

      <main>
        <section className="bg-lila/40">
          <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 md:grid-cols-2 md:py-16">
            <div>
              <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl">
                Ropa para chicos, de 0 a 16 años.
              </h1>
              <p className="mt-4 max-w-md text-lg">
                Elegí el talle y el color de cada prenda, armá tu pedido y mandalo por WhatsApp.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#catalogo" className="rounded-full border-2 border-ink bg-rosa px-6 py-3 font-display font-semibold shadow-[3px_3px_0_#3A4A66] hover:bg-white">
                  Ver prendas
                </a>
                <a href="#talles" className="rounded-full border-2 border-ink bg-white px-6 py-3 font-display font-semibold hover:bg-celeste">
                  Tabla de talles
                </a>
              </div>
            </div>
            <div className="mx-auto w-full max-w-sm rounded-[2rem] border-2 border-ink bg-white p-2 shadow-[6px_6px_0_#3A4A66]">
              <Image src="/logo.png" alt="Salchi Kids, closet infantil 0 a 16" width={1024} height={1024} priority className="h-auto w-full rounded-[1.5rem]" />
            </div>
          </div>
        </section>

        <section id="catalogo" className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="font-display text-3xl font-bold">Elegí tus prendas</h2>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  aria-pressed={category === c.id}
                  onClick={() => setCategory(c.id)}
                  className={`rounded-full border-2 border-ink px-4 py-1.5 font-semibold ${category === c.id ? "bg-celeste" : "bg-white hover:bg-celeste/40"}`}
                >
                  {c.label}
                </button>
              ))}
            </div>
            <label className="flex items-center gap-2 text-sm font-semibold">
              Ordenar
              <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-full border-2 border-ink bg-white px-3 py-1.5 font-normal">
                <option value="catalogo">Orden del catálogo</option>
                <option value="menor">Menor precio</option>
                <option value="mayor">Mayor precio</option>
              </select>
            </label>
          </div>

          <ul className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
            {list.map((p, i) => (
              <li key={p.id}>
                <button onClick={() => setActive(p)} className="group block w-full text-left">
                  <div className={`${TILES[i % 3]} relative grid aspect-[4/5] place-items-center overflow-hidden rounded-3xl border-2 border-ink shadow-[4px_4px_0_#3A4A66] transition group-hover:-translate-y-0.5`}>
                    {p.image ? (
                      <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="text-center">
                        <Shirt size={56} strokeWidth={1.5} className="mx-auto" />
                        <p className="mt-2 text-sm">Foto próximamente</p>
                      </div>
                    )}
                  </div>
                  <div className="mt-4">
                    <h3 className="font-display text-lg font-bold">{p.name}</h3>
                    <p>{money(p.price)} <span className="text-sm">por unidad</span></p>
                    <div className="mt-2 flex items-center gap-1.5">
                      {p.colors.map((c) => (
                        <span key={c.name} title={c.name} className="h-4 w-4 rounded-full border border-ink" style={{ background: c.hex }} />
                      ))}
                    </div>
                    <span className="mt-3 inline-block rounded-full border-2 border-ink bg-white px-4 py-1.5 text-sm font-semibold group-hover:bg-rosa">
                      Elegir talle y color
                    </span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section id="talles" className="bg-celeste/40">
          <div className="mx-auto max-w-6xl px-4 py-14">
            <h2 className="mb-6 font-display text-3xl font-bold">Tabla de talles y edades</h2>
            <SizeTable />
          </div>
        </section>

        <section id="como-comprar" className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="font-display text-3xl font-bold">Cómo comprar</h2>
          <ol className="mt-6 grid gap-4 md:grid-cols-3">
            {STEPS.map(([t, d], i) => (
              <li key={t} className="rounded-3xl border-2 border-ink p-5">
                <span className="grid h-9 w-9 place-items-center rounded-full border-2 border-ink bg-rosa font-display font-bold">{i + 1}</span>
                <h3 className="mt-3 font-display text-xl font-bold">{t}</h3>
                <p className="mt-1">{d}</p>
              </li>
            ))}
          </ol>
        </section>
      </main>

      <footer className="border-t-2 border-ink bg-lila/40">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-8">
          <p className="font-display text-xl font-bold">{BRAND.name} · {BRAND.tagline}</p>
          <a href={`https://wa.me/${BRAND.whatsapp}`} target="_blank" rel="noopener noreferrer" className="font-semibold underline">
            Escribinos por WhatsApp
          </a>
        </div>
      </footer>

      {active && <ProductModal product={active} cart={cart} onClose={() => setActive(null)} onSave={saveProduct} />}
      {cartOpen && <CartDrawer lines={lines} units={units} total={total} onClose={() => setCartOpen(false)} onQty={changeQty} />}
    </>
  );
}
