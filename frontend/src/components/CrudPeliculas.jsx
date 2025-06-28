import { useState, useEffect } from 'react';
import MostrarPelicula from './MostrarPelicula';
import EditarPelicula from './EditarPelicula';
import AgregarPelicula from './AgregarPelicula';
import axios from "axios"
import "../styles/crud.css"

const CrudPeliculas = () => {

    const [peliculas, setPeliculas] = useState([]);
    const [peliculaSeleccionada, setPeliculaSeleccionada] = useState(null);
    const [peliculaEnEdicion, setPeliculaEnEdicion] = useState(null);
    const [agregandoPelicula, setAgregandoPelicula] = useState(false);
    const [paginaActual, setPaginaActual] = useState(1);
    const peliculasPorPagina = 10;

    const indiceUltimaPelicula = paginaActual * peliculasPorPagina;
    const indicePrimeraPelicula = indiceUltimaPelicula - peliculasPorPagina;
    const peliculasActuales = peliculas.slice(
        indicePrimeraPelicula,
        indiceUltimaPelicula
    );

    const totalPaginas = Math.ceil(peliculas.length / peliculasPorPagina);

    const handleAgregarPelicula = () => {
        setPeliculaSeleccionada(null);
        setPeliculaEnEdicion(null);
        setAgregandoPelicula(true);
    }

    const handleGuardarNuevaPelicula = async (nuevaPelicula) => {
        try {
            await axios.post("http://localhost:8000/api/peliculas", nuevaPelicula);
            const res = await axios.get("http://localhost:8000/api/peliculas");
            setPeliculas(res.data);
            setAgregandoPelicula(false);
            alert("Pelicula agregada!")
        } catch (error) {
            console.error("Error al agregar pelicula ", error);
            alert("No se pudo agregar la pelicula.")
        }
    }

    const handleVerPelicula = (pelicula) => {
        setPeliculaEnEdicion(null);
        setPeliculaSeleccionada(pelicula);
    };

    const handleEditarPelicula = (pelicula) => {
        setPeliculaSeleccionada(null);
        setPeliculaEnEdicion(pelicula);
    };

    const handleGuardarPelicula = async (id, datosActualizados) => {
        try {
            await axios.put(`http://localhost:8000/api/peliculas/${id}`, datosActualizados);
            const res = await axios.get("http://localhost:8000/api/peliculas");
            setPeliculas(res.data);
            setPeliculaEnEdicion(null);
        } catch (error) {
            console.error("Error al guardar los cambios:", error);
            alert("No se pudo guardar la película.");
        }
    };

    const handleEliminarPelicula = async (id) => {
        const confirm = window.confirm("Seguro que desea eliminar esta pelicula?")
        if (!confirm) return;
        try {
            await axios.delete(`http://localhost:8000/api/peliculas/${id}`);
            setPeliculas(peliculas.filter(p => p.idPelicula !== id));
            alert("Pelicula eliminada")
        } catch (error) {
            console.error(error);
            alert("Error al intentar eliminar la pelicula")
        }
    }

    useEffect(() => {
        axios.get("http://localhost:8000/api/peliculas")
            .then((res) => setPeliculas(res.data))
            .catch((err) => console.error("Error al obtener peliculas", err));
    }, []);

    return (
        <div>
            {peliculaSeleccionada && !peliculaEnEdicion && (
                <MostrarPelicula
                    pelicula={peliculaSeleccionada}
                    onClose={() => setPeliculaSeleccionada(null)}
                />
            )}
            {peliculaEnEdicion && (
                <EditarPelicula
                    pelicula={peliculaEnEdicion}
                    onClose={() => setPeliculaEnEdicion(null)}
                    onGuardar={handleGuardarPelicula}
                />
            )}
            {agregandoPelicula && (
                <AgregarPelicula
                    onClose={() => setAgregandoPelicula(false)}
                    onGuardar={handleGuardarNuevaPelicula}
                />
            )}
            <div className="crud-title">
                <h2>Peliculas</h2>
                <button type="button" className="btn btn-outline-success" onClick={handleAgregarPelicula}>Agregar <i className="bi bi-plus-circle"></i></button>
            </div>
            <table className="table table-striped table-dark">
                <thead>
                    <tr>
                        <th scope="col" className='col-1'># ID</th>
                        <th scope="col" className='col-2'>Titulo</th>
                        <th scope="col" className='col-2'>Descripcion</th>
                        <th scope="col" className='col-2'>Duracion</th>
                        <th scope="col" className='col-2'>Clasificacion</th>
                        <th scope='col' className='col-2'>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {peliculasActuales.map((pelicula) => (
                        <tr key={pelicula.idPelicula}>
                            <th scope="row">{pelicula.idPelicula}</th>
                            <td>{pelicula.titulo}</td>
                            <td>{pelicula.descripcion}</td>
                            <td>{pelicula.duracion} min</td>
                            <td>{pelicula.clasificacion}</td>
                            <td>
                                <button type="button" className="btn btn-outline-info" style={{ marginRight: "5px" }} onClick={() => handleVerPelicula(pelicula)}><i className="bi bi-eye"></i></button>
                                <button type="button" className="btn btn-outline-warning" style={{ marginRight: "5px" }} onClick={() => handleEditarPelicula(pelicula)}><i className="bi bi-pencil"></i></button>
                                <button type="button" className="btn btn-outline-danger" style={{ marginRight: "5px" }} onClick={() => handleEliminarPelicula(pelicula.idPelicula)}><i className="bi bi-trash"></i></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Controles de paginación */}
            <div className="d-flex justify-content-center my-4 align-items-center flex-wrap gap-2">

                {/* Botón ir a primera página */}
                {paginaActual > 3 && (
                    <button
                        onClick={() => setPaginaActual(1)}
                        className="btn btn-outline-secondary"
                    >
                        {'«'}
                    </button>
                )}

                {/* Botón Anterior */}
                {paginaActual > 1 && (
                    <button
                        onClick={() => setPaginaActual(paginaActual - 1)}
                        className="btn btn-outline-secondary"
                    >
                        {'←'}
                    </button>
                )}

                {/* Botones numéricos */}
                {Array.from({ length: totalPaginas }, (_, i) => i + 1)
                    .filter(num => {
                        if (totalPaginas <= 5) return true;
                        if (paginaActual <= 3) return num <= 5;
                        if (paginaActual >= totalPaginas - 2) return num >= totalPaginas - 4;
                        return Math.abs(paginaActual - num) <= 2;
                    })
                    .map(num => (
                        <button
                            key={num}
                            onClick={() => setPaginaActual(num)}
                            className="btn btn-outline-secondary"
                            style={
                                num === paginaActual
                                    ? { backgroundColor: "#f1c40f", color: "black", fontWeight: "bold" }
                                    : {}
                            }
                        >
                            {num}
                        </button>
                    ))}

                {/* Botón Siguiente */}
                {paginaActual < totalPaginas && (
                    <button
                        onClick={() => setPaginaActual(paginaActual + 1)}
                        className="btn btn-outline-secondary"
                    >
                        {'→'}
                    </button>
                )}

                {/* Botón ir a última página */}
                {paginaActual < totalPaginas - 2 && (
                    <button
                        onClick={() => setPaginaActual(totalPaginas)}
                        className="btn btn-outline-secondary"
                    >
                        {'»'}
                    </button>
                )}
            </div>




        </div>
    )
}

export default CrudPeliculas