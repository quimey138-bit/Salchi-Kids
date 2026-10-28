import { SIZES } from "@/lib/products";

const Col = ({ title, rows }) => (
  <div>
    <h3 className="mb-3 font-display text-2xl font-bold">{title}</h3>
    <dl className="divide-y divide-ink/15 border-y-2 border-ink">
      {rows.map((r) => (
        <div key={r.talle} className="flex justify-between gap-4 py-2.5">
          <dt className="font-bold">Talle {r.talle}</dt>
          <dd>{r.edad}</dd>
        </div>
      ))}
    </dl>
  </div>
);

export default function SizeTable() {
  return (
    <div className="grid gap-8 sm:grid-cols-2">
      <Col title="Bebés" rows={SIZES.bebes} />
      <Col title="Kids" rows={SIZES.kids} />
    </div>
  );
}
