import React from 'react'
import { useCarritoStore } from '../store/cartStore'

const ProductoCard = ({ id, titulo, precio, imagen, tipo }) => {

  const agregarAlCarrito = useCarritoStore((state) => state.agregarAlCarrito)

  const handleAgregar = () => {
    const producto = { id, titulo, precio, tipo, imagen } // tipo: 'boleto' o 'candy'
    agregarAlCarrito(producto)
  }

  return (
    <div className="producto-card">
      <img src={imagen} alt={titulo} style={{ width: '150px', height: '150px', objectFit: 'contain' }} />
      <h3>{titulo}</h3>
      <p>Precio: ${precio}</p>
      <button onClick={handleAgregar}>Agregar al carrito</button>
      <br /><br /><br /><hr />
    </div>
  )
}

export default ProductoCard
