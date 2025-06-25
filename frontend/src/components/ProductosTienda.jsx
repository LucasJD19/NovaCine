import React, { useEffect, useState } from 'react';
import ProductoCard from '../components/ProductoCard';
import { getProductos } from '../data/db';

const ProductosTienda = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    getProductos()
      .then(data => setProductos(data))
      .catch(err => console.error('Error al cargar productos:', err));
  }, []);

  return (
    <div>
      <div className="row">
        {productos.map((prod) => (
          <ProductoCard
            key={prod.idProducto}
            id={prod.idProducto}
            titulo={prod.nombre}
            precio={prod.precio}
            imagen= '../../public/images/Pochoclera.png'
            tipo={prod.tipo}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductosTienda;
