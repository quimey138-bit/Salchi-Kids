"use client";
import { useEffect, useState } from "react";
import { X, Minus, Plus } from "lucide-react";
import { SIZES } from "@/lib/products";
import { money } from "@/lib/format";

export default function ProductModal({ product, cart, onClose, onSave }) {
  const sizes = SIZES[product.category];
  const [color, setColor] = useState(product.colors[0].name);
  const [draft, setDraft] = useState(() => {
    const d = {};
    Object.values(cart).forEach((l) => {
      if (l.pid === product.id) d[`${l.color}|${l.size}`] = l.qty;
    });
    return d;
  });

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const qty = (c, s) => draft[`${c}|${s}`] || 0;
  const bump = (c, s, d) =>
    setDraft((p) => ({ ...p, [`${c}|${s}`]: Math.max(0, (p[`${c}|${s}`] || 0) + d) }));
  const countColor = (c) => sizes.reduce((n, s) => n + qty(c, s.talle), 0);
  const units = product.colors.reduce((n, c) => n + countColor(c.name), 0);

  const save = () =>
    onSave(
      product.id,
      product.colors.flatMap((c) =>
        sizes.map((s) => ({ color: c.name, size: s.talle, qty: qty(c.name, s.talle) }))
      )
    );

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/50 sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={product.name}
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[92vh] w-full max-w-md flex-col rounded-t-3xl border-2 border-ink bg-white sm:rounded-3xl"
      >
        <div className="flex items-start justify-between gap-4 border-b-2 border-ink p-5">
          <div>
            <h2 className="font-display text-2xl font-bold">{product.name}</h2>
            <p>{money(product.price)} por unidad</p>
          </div>
          <button onClick={onClose} aria-label="Cerrar" className="rounded-full border-2 border-ink p-1.5 hover:bg-lila">
            <X size={18} />
          </button>
        </div>

        <div className="overflow-y-auto p-5">
          <div className="flex flex-wrap gap-2">
            {product.colors.map((c) => {
              const n = countColor(c.name);
              const on = c.name === color;
              return (
                <button
                  key={c.name}
                  aria-pressed={on}
                  onClick={() => setColor(c.name)}
                  className={`flex items-center gap-2 rounded-full border-2 border-ink px-3 py-1.5 font-semibold ${on ? "bg-celeste" : "bg-white hover:bg-celeste/40"}`}
                >
                  <span className="h-4 w-4 rounded-full border border-ink" style={{ background: c.hex }} />
                  {c.name}
                  {n > 0 && <span className="rounded-full bg-rosa px-1.5 text-xs font-bold">{n}</span>}
                </button>
              );
            })}
          </div>

          <h3 className="mb-3 mt-6 font-display text-lg font-semibold">Talles en {color}</h3>
          <div className="grid grid-cols-2 gap-3">
            {sizes.map((s) => (
              <div key={s.talle} className="rounded-2xl border-2 border-ink p-3">
                <p className="font-display font-bold">Talle {s.talle}</p>
                <p className="mb-2 text-sm opacity-80">{s.edad}</p>
                <div className="flex items-center justify-between rounded-full bg-lila/50 p-1">
                  <button
                    onClick={() => bump(color, s.talle, -1)}
                    disabled={qty(color, s.talle) === 0}
                    aria-label={`Quitar talle ${s.talle}`}
                    className="rounded-full p-1.5 enabled:hover:bg-white disabled:opacity-30"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="font-bold" aria-live="polite">{qty(color, s.talle)}</span>
                  <button
                    onClick={() => bump(color, s.talle, 1)}
                    aria-label={`Agregar talle ${s.talle}`}
                    className="rounded-full p-1.5 hover:bg-white"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t-2 border-ink p-5">
          <p className="mb-3 text-sm">
            {units === 0 ? "Elegí cuántas unidades querés de cada talle y color." : `${units} ${units === 1 ? "unidad" : "unidades"} · ${money(units * product.price)}`}
          </p>
          <button
            onClick={save}
            className="w-full rounded-full border-2 border-ink bg-rosa py-3 font-display text-lg font-semibold shadow-[3px_3px_0_#3A4A66] hover:bg-lila"
          >
            Listo
          </button>
        </div>
      </div>
    </div>
  );
}
