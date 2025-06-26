import { useState, useEffect } from 'react';
import MostrarProducto from './MostrarProducto';
import AgregarProducto from './AgregarProducto';
import EditarProducto from './EditarProducto';
import axios from "axios"
import "../styles/crud.css"


const MainEmpleado = () => {

    const [productos, setProductos] = useState([]);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [productoEnEdicion, setProductoEnEdicion] = useState(null);
    const [agregandoProducto, setAgregandoProducto] = useState(false);


    const handleAgregarProducto = () => {
        setProductoSeleccionado(null);
        setProductoEnEdicion(null);
        setAgregandoProducto(true)
    }

    const handleGuardarNuevoProducto = async (nuevoProducto) => {
        try {
            await axios.post("http://localhost:8000/api/productos", nuevoProducto);
            const res = await axios.get("http://localhost:8000/api/productos");
            setProductos(res.data);
            setAgregandoProducto(false);
            alert("Producto agregado!")
        } catch (error) {
            console.error("Error al agregar producto ", error);
            alert("No se pudo agregar el producto.")
        }
    }

    const handleVerProducto = (producto) => {
        setProductoEnEdicion(null);
        setProductoSeleccionado(producto);
    };

    const handleEditarProducto = (producto) => {
        setProductoSeleccionado(null)
        setProductoEnEdicion(producto)
    }

    const handleGuardarProducto = async (id, datosActualizados) => {
        try {
            await axios.put(`http://localhost:8000/api/productos/${id}`, datosActualizados);
            const res = await axios.get("http://localhost:8000/api/productos");
            setProductos(res.data);
            setProductoEnEdicion(null);
        } catch (error) {
            console.error("Error al guardar los cambios:", error);
            alert("No se pudo guardar el producto.");
        }
    };

    const handleEliminarProducto = async (id) => {
        const confirm = window.confirm("Seguro que desea eliminar este producto?")
        if (!confirm) return;
        try {
            await axios.delete(`http://localhost:8000/api/productos/${id}`)
            setProductos(productos.filter(p => p.idProducto !== id));
        } catch (error) {
            console.error(error);
            alert("Error al intentar eliminar el producto")
        }
    }

    useEffect(() => {
        axios.get("http://localhost:8000/api/productos")
            .then((res) => setProductos(res.data))
            .catch((err) => console.error("Error al obtener productos", err));
    }, []);

    return (
        <div>
            {productoSeleccionado && !productoEnEdicion && (
                <MostrarProducto
                    producto={productoSeleccionado}
                    onClose={() => setProductoSeleccionado(null)}
                />
            )}
            {productoEnEdicion && (
                <EditarProducto
                    producto={productoEnEdicion}
                    onClose={() => setProductoEnEdicion(null)}
                    onGuardar={handleGuardarProducto}
                />
            )}
            {agregandoProducto && (
                <AgregarProducto
                    onClose={() => setAgregandoProducto(false)}
                    onGuardar={handleGuardarNuevoProducto}
                />
            )}
            <div className="crud-title">
                <h2>Productos</h2>
                <button type="button" className="btn btn-outline-success" onClick={handleAgregarProducto}>Agregar <i className="bi bi-plus-circle"></i></button>
            </div>
            <table className="table table-striped table-dark">
                <thead>
                    <tr>
                        <th scope="col" className='col-1'># ID</th>
                        <th scope="col" className='col-2'>Nombre</th>
                        <th scope="col" className='col-2'>Descripcion</th>
                        <th scope="col" className='col-2'>Precio</th>
                        <th scope="col" className='col-2'>Stock</th>
                        <th scope='col' className='col-2'>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((producto) => (
                        <tr key={producto.idProducto}>
                            <th scope="row">{producto.idProducto}</th>
                            <td>{producto.nombre}</td>
                            <td>{producto.descripcion}</td>
                            <td>${producto.precio}</td>
                            <td>{producto.stock}</td>
                            <td>
                                <button type="button" className="btn btn-outline-info" style={{ marginRight: "5px" }} onClick={() => handleVerProducto(producto)}><i className="bi bi-eye"></i></button>
                                <button type="button" className="btn btn-outline-warning" style={{ marginRight: "5px" }} onClick={() => handleEditarProducto(producto)}><i className="bi bi-pencil"></i></button>
                                <button type="button" className="btn btn-outline-danger" style={{ marginRight: "5px" }} onClick={() => handleEliminarProducto(producto.idProducto)}><i className="bi bi-trash"></i></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};


export default MainEmpleado