import React from 'react'
import ProductoCard from "../components/ProductoCard"

const ProductosTienda = () => {

    const productos = [
        {
            id: 5,
            titulo: 'Pochoclos XL',
            precio: 2800,
            imagen: '../../public/images/Pochoclera.png',
            tipo: 'tienda'
          },
          {
            id: 6,
            titulo: 'Nachos con Queso',
            precio: 3500,
            imagen: '../../public/images/Pochoclera.png',
            tipo: 'tienda'
          },
          {
            id: 7,
            titulo: 'Coca-Cola',
            precio: 2500,
            imagen: '../../public/images/Pochoclera.png',
            tipo: 'tienda'
          },
          {
            id: 8,
            titulo: 'Chocolate Block',
            precio: 2200,
            imagen: '../../public/images/Pochoclera.png',
            tipo: 'tienda'
          },
      ]

  return (
    <div>
        <h2>Productos Tienda</h2>
      <div className="grid-productos">
        {productos.map((prod) => (
          <ProductoCard
            key={prod.id}
            id={prod.id}
            titulo={prod.titulo}
            precio={prod.precio}
            imagen={prod.imagen}
            tipo={prod.tipo}
          />
        ))}
      </div>
    </div>
  )
}

export default ProductosTienda