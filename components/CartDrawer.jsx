"use client";
import { useEffect, useState } from "react";
import { X, Minus, Plus, MessageCircle } from "lucide-react";
import { BRAND } from "@/lib/config";
import { money } from "@/lib/format";

export default function CartDrawer({ lines, units, total, onClose, onQty }) {
  const [name, setName] = useState("");
  const [entrega, setEntrega] = useState("Retiro");

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const msg = [
    `Hola ${BRAND.name}! Quiero hacer este pedido:`,
    ...lines.map(
      (l) => `• ${l.qty} x ${l.product.name} - ${l.color} - Talle ${l.size} (${money(l.qty * l.product.price)})`
    ),
    `Total: ${money(total)}`,
    name.trim() && `Nombre: ${name.trim()}`,
    `Entrega: ${entrega === "Retiro" ? "Retiro" : "Envío (a coordinar)"}`,
  ]
    .filter(Boolean)
    .join("\n");
  const href = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(msg)}`;

  return (
    <div className="fixed inset-0 z-50 bg-ink/50" onClick={onClose}>
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Tu pedido"
        onClick={(e) => e.stopPropagation()}
        className="ml-auto flex h-full w-full max-w-md flex-col border-l-2 border-ink bg-white"
      >
        <div className="flex items-center justify-between border-b-2 border-ink p-5">
          <h2 className="font-display text-2xl font-bold">Tu pedido</h2>
          <button onClick={onClose} aria-label="Cerrar" className="rounded-full border-2 border-ink p-1.5 hover:bg-lila">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {lines.length === 0 ? (
            <p>Todavía no elegiste nada. Abrí una prenda y elegí su talle y color.</p>
          ) : (
            <ul className="space-y-3">
              {lines.map((l) => (
                <li key={l.key} className="rounded-2xl border-2 border-ink p-3">
                  <div className="flex justify-between gap-3">
                    <div>
                      <p className="font-display font-bold">{l.product.name}</p>
                      <p className="text-sm">{l.color} · Talle {l.size}</p>
                    </div>
                    <p className="font-bold">{money(l.qty * l.product.price)}</p>
                  </div>
                  <div className="mt-2 inline-flex items-center gap-3 rounded-full bg-lila/50 p-1">
                    <button onClick={() => onQty(l.key, -1)} aria-label="Quitar una unidad" className="rounded-full p-1.5 hover:bg-white">
                      <Minus size={14} />
                    </button>
                    <span className="min-w-4 text-center font-bold">{l.qty}</span>
                    <button onClick={() => onQty(l.key, 1)} aria-label="Agregar una unidad" className="rounded-full p-1.5 hover:bg-white">
                      <Plus size={14} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <div className="space-y-3 border-t-2 border-ink p-5">
            <label className="block text-sm font-semibold">
              Tu nombre (opcional)
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded-xl border-2 border-ink px-3 py-2 font-normal"
              />
            </label>
            <fieldset>
              <legend className="mb-1 text-sm font-semibold">¿Cómo lo querés recibir?</legend>
              <div className="flex gap-2">
                {["Retiro", "Envío"].map((o) => (
                  <button
                    key={o}
                    aria-pressed={entrega === o}
                    onClick={() => setEntrega(o)}
                    className={`flex-1 rounded-full border-2 border-ink py-2 font-semibold ${entrega === o ? "bg-celeste" : "bg-white hover:bg-celeste/40"}`}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </fieldset>
            <div className="flex items-baseline justify-between">
              <span>{units} {units === 1 ? "unidad" : "unidades"}</span>
              <span className="font-display text-2xl font-bold">{money(total)}</span>
            </div>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full border-2 border-ink bg-rosa py-3 font-display text-lg font-semibold shadow-[3px_3px_0_#3A4A66] hover:bg-lila"
            >
              <MessageCircle size={20} /> Enviar pedido por WhatsApp
            </a>
            <p className="text-center text-xs">Te confirmamos stock y total por WhatsApp.</p>
          </div>
        )}
      </aside>
    </div>
  );
}
