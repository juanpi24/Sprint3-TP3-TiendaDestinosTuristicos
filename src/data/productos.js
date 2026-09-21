/**
 * Catálogo de paquetes turísticos a destinos de Argentina.
 * Adaptado del catálogo de "Mi Watchlist" del Sprint 2: cada destino
 * ahora es un paquete comprable, con precio (número, sin formato) y stock
 * (cupos disponibles) además de sus campos originales.
 */
export const PRODUCTOS = [
  { id: 'talampaya', title: 'Parque Nacional Talampaya', location: 'La Rioja', category: 'Naturaleza', rating: 5.0, destacado: true, precio: 145000, stock: 8, img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80' },
  { id: 'perito-moreno', title: 'Glaciar Perito Moreno', location: 'Santa Cruz', category: 'Lagos y Glaciares', rating: 4.9, destacado: true, precio: 210000, stock: 6, img: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=600&q=80' },
  { id: 'iguazu', title: 'Cataratas del Iguazú', location: 'Misiones', category: 'Naturaleza', rating: 4.9, destacado: false, precio: 180000, stock: 12, img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80' },
  { id: 'tronador', title: 'Cerro Tronador y Glaciares', location: 'Río Negro', category: 'Montaña', rating: 4.8, destacado: false, precio: 165000, stock: 5, img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80' },
  { id: 'atuel', title: 'Cañón del Atuel', location: 'Mendoza', category: 'Aventura', rating: 4.7, destacado: false, precio: 98000, stock: 10, img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80' },
  { id: 'fitz-roy', title: 'Monte Fitz Roy', location: 'Santa Cruz', category: 'Montaña', rating: 5.0, destacado: true, precio: 225000, stock: 4, img: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=600&q=80' },
  { id: 'quebrada-humahuaca', title: 'Quebrada de Humahuaca', location: 'Jujuy', category: 'Naturaleza', rating: 4.8, destacado: false, precio: 120000, stock: 9, img: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=80' },
  { id: 'valle-luna', title: 'Ischigualasto / Valle de la Luna', location: 'San Juan', category: 'Naturaleza', rating: 4.7, destacado: true, precio: 110000, stock: 7, img: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80' },
  { id: 'nahuel-huapi', title: 'Lago Nahuel Huapi', location: 'Río Negro', category: 'Lagos y Glaciares', rating: 4.8, destacado: false, precio: 155000, stock: 11, img: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=600&q=80' },
  { id: 'ushuaia-lapataia', title: 'Parque Nacional Tierra del Fuego', location: 'Tierra del Fuego', category: 'Aventura', rating: 4.9, destacado: true, precio: 260000, stock: 5, img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=600&q=80' },
  { id: 'esteros-ibera', title: 'Esteros del Iberá', location: 'Corrientes', category: 'Naturaleza', rating: 4.8, destacado: false, precio: 135000, stock: 8, img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80' },
  { id: 'san-martin-andes', title: 'Ruta de los 7 Lagos', location: 'Neuquén', category: 'Lagos y Glaciares', rating: 4.9, destacado: true, precio: 175000, stock: 6, img: 'https://images.unsplash.com/photo-1439853949127-fa647821eba0?auto=format&fit=crop&w=600&q=80' },
  { id: 'aconcagua', title: 'Parque Provincial Aconcagua', location: 'Mendoza', category: 'Montaña', rating: 4.9, destacado: false, precio: 240000, stock: 3, img: 'https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?auto=format&fit=crop&w=600&q=80' },
  { id: 'salinas-grandes', title: 'Salinas Grandes', location: 'Jujuy', category: 'Naturaleza', rating: 4.8, destacado: true, precio: 105000, stock: 10, img: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80' },
  { id: 'puerto-madryn', title: 'Península Valdés', location: 'Chubut', category: 'Aventura', rating: 4.8, destacado: false, precio: 190000, stock: 7, img: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80' },
  { id: 'bañado-la-estrella', title: 'Bañado la Estrella', location: 'Formosa', category: 'Naturaleza', rating: 4.6, destacado: false, precio: 92000, stock: 0, img: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80' },
  { id: 'el-palmar', title: 'Parque Nacional El Palmar', location: 'Entre Ríos', category: 'Naturaleza', rating: 4.5, destacado: false, precio: 85000, stock: 13, img: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80' },
  { id: 'volcan-lanin', title: 'Volcán Lanín', location: 'Neuquén', category: 'Montaña', rating: 4.8, destacado: false, precio: 150000, stock: 4, img: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=600&q=80' },
  { id: 'campo-piedra-pomez', title: 'Campo de Piedra Pómez', location: 'Catamarca', category: 'Aventura', rating: 4.9, destacado: true, precio: 128000, stock: 0, img: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80' },
  { id: 'la-cumbrecita', title: 'La Cumbrecita', location: 'Córdoba', category: 'Montaña', rating: 4.7, destacado: false, precio: 78000, stock: 15, img: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80' }
];
