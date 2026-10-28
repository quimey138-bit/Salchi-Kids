export const CATEGORIES = [
  { id: "todo", label: "Todo" },
  { id: "bebes", label: "Bebés" },
  { id: "kids", label: "Kids" },
];

export const SIZES = {
  bebes: [
    { talle: "0", edad: "3 a 6 meses" },
    { talle: "1", edad: "6 a 12 meses" },
    { talle: "2", edad: "1 a 1½ años" },
    { talle: "3", edad: "1½ a 2½ años" },
    { talle: "4", edad: "2½ a 3½ años" },
    { talle: "6", edad: "3½ a 4½ años" },
  ],
  kids: [
    { talle: "2", edad: "2 años" },
    { talle: "4", edad: "3 a 4 años" },
    { talle: "6", edad: "5 a 6 años" },
    { talle: "8", edad: "7 a 8 años" },
    { talle: "10", edad: "9 años" },
    { talle: "12", edad: "10 años" },
    { talle: "14", edad: "11 a 12 años" }, // TODO: confirmar edades de los talles 14 y 16
    { talle: "16", edad: "13 a 14 años" },
  ],
};

const C = {
  negro: { name: "Negro", hex: "#222222" },
  blanco: { name: "Blanco", hex: "#FFFFFF" },
  marron: { name: "Marron", hex: "#8D4925 " },
  beige: { name: "Beige", hex: "#F5F5DC" },
  rosa: { name: "Rosa", hex: "#FFB8D9" },
  celeste: { name: "Celeste", hex: "#B3E1F8" },
  lila: { name: "Lila", hex: "#E6CBF7" },
};

// DATOS DE EJEMPLO: reemplazar por los productos y precios reales.
export const PRODUCTS = [
  { id: "Remera-salchis", name: "Remera Salchis", category: "bebes", price: 6000,image: "/productos/RemerasSalchis.png", colors: [C.lila, C.rosa] },
  { id: "Pantalon-cotton", name: "Pantalon Baby Cotton", category: "bebes", price: 5500,image: "/productos/PantalonBabyCotton.png", colors: [C.blanco, C.rosa, C.marron, C.beige] },
  { id: "Set-ReyLeon", name: "Set Rey Leon", category: "kids", price: 5000, image: "/productos/SetReyLeon.png", colors: [C.blanco] },
  { id: "Body-Corto", name: "Body estampado", category: "kids", price: 12000,image: "/productos/BodyCorto.png", colors: [C.blanco] },
  { id: "jogging", name: "Jogging", category: "kids", price: 9000, colors: [C.negro, C.marron, C.celeste] },
  { id: "vestido", name: "Vestido", category: "kids", price: 10500, colors: [C.rosa, C.celeste] },
];
