import React from 'react'
import { useCarritoStore } from '../store/cartStore'

const Carrito = () => {
  const productos = useCarritoStore((state) => state.productos)
  const eliminarDelCarrito = useCarritoStore((state) => state.eliminarDelCarrito)
  const vaciarCarrito = useCarritoStore((state) => state.vaciarCarrito)
  const obtenerTotal = useCarritoStore((state) => state.obtenerTotal)

  const handleSimularCompra = () => {
    alert("Compra realizada con éxito 🎉")
    vaciarCarrito()
  }

  const handleLimpiarCarrito = () => {
    alert("Articulos eliminados correctamente 🗑️")
    vaciarCarrito()
  }

  return (
    <main className="pagina-carrito">
      <h2>Tu carrito</h2>

      {productos.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <>
          <ul className="lista-carrito">
            {productos.map((item) => (
              <li key={item.id} className="item-carrito">
                <strong>{item.titulo}</strong> ({item.tipo}) - ${item.precio} x {item.cantidad}
                <button onClick={() => eliminarDelCarrito(item.id)}>Eliminar ❌</button>
              </li>
            ))}
          </ul>

          <h3>Total: ${obtenerTotal()}</h3>

          <button onClick={handleSimularCompra}>Realizar Compra ✅</button>
          <button onClick={handleLimpiarCarrito}>Limpiar carrito 🗑️</button>
        </>
      )}
    </main>
  )
}

export default Carrito
