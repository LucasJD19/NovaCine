import { peliculas , productos} from "../datos.js"
import "../styles/crud.css" 


const MainAdmin = () => {

    const handleAgregarPelicula = () => {

    }

    const handleVerPelicula = () => {

    }

    const handleEditarPelicula = () => {

    }

    const handleEliminarPelicula = () => {

    }


    const handleAgregarProducto = () => {

    }

    const handleVerProducto = () => {

    }

    const handleEditarProducto = () => {

    }

    const handleEliminarProducto = () => {

    }





  return (
    <div>
        <div className="crud-title">
        <h2>Peliculas</h2>
        <button type="button" className="btn btn-outline-success" onClick={handleAgregarPelicula()}>Agregar <i className="bi bi-plus-circle"></i></button>
        </div>
        <table className="table table-striped table-dark">
            <thead>
                <tr>
                <th scope="col" className='col-1'># ID</th>
                <th scope="col" className='col-2'>Titulo</th>
                <th scope="col" className='col-2'>Genero</th>
                <th scope="col" className='col-2'>Duracion</th>
                <th scope='col' className='col-2'>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {peliculas.map((pelicula) => (
                    <tr key={pelicula.id}>
                    <th scope="row">{pelicula.id}</th>
                    <td>{pelicula.titulo}</td>
                    <td>{pelicula.genero}</td>
                    <td>{pelicula.duracion}</td>
                    <td>
                    <button type="button" className="btn btn-outline-info" style={{ marginRight: "5px" }} onClick={handleVerPelicula(pelicula.id)}><i className="bi bi-eye"></i></button>
                    <button type="button" className="btn btn-outline-warning" style={{ marginRight: "5px" }} onClick={handleEditarPelicula(pelicula.id)}><i className="bi bi-pencil"></i></button>
                    <button type="button" className="btn btn-outline-danger" style={{ marginRight: "5px" }} onClick={handleEliminarPelicula(pelicula.id)}><i className="bi bi-trash"></i></button>
                    </td>
                    </tr>
                ))}
            </tbody>
        </table> <br /> <br />
        <div className="crud-title">
        <h2>Productos</h2>
        <button type="button" className="btn btn-outline-success" onClick={handleAgregarProducto()}>Agregar <i className="bi bi-plus-circle"></i></button>
        </div>
        <table class="table table-striped table-dark">
            <thead>
                <tr>
                <th scope="col" className='col-1'># ID</th>
                <th scope="col" className='col-2'>Nombre</th>
                <th scope="col" className='col-2'>Precio</th>
                <th scope="col" className='col-2'>Cantidad</th>
                <th scope='col' className='col-2'>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {productos.map((producto)=> (
                    <tr key={producto.id}>
                    <th scope="row">{producto.id}</th>
                    <td>{producto.nombre}</td>
                    <td>${producto.precio}</td>
                    <td>{producto.cantidad}</td>
                    <td>
                    <button type="button" className="btn btn-outline-info" style={{ marginRight: "5px" }} onClick={handleVerProducto(producto.id)}><i className="bi bi-eye"></i></button>
                    <button type="button" className="btn btn-outline-warning" style={{ marginRight: "5px" }} onClick={handleEditarProducto(producto.id)}><i className="bi bi-pencil"></i></button>
                    <button type="button" className="btn btn-outline-danger" style={{ marginRight: "5px" }} onClick={handleEliminarProducto(producto.id)}><i className="bi bi-trash"></i></button>
                    </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default MainAdmin