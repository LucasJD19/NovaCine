import { useState, useEffect } from 'react';
import MostrarEmpleado from './MostrarEmpleado';
import AgregarEmpleado from './AgregarEmpleado';
import EditarEmpleado from './EditarEmpleado';
import axios from "axios";
import "../styles/crud.css";

const CrudEmpleados = () => {
    const [empleados, setEmpleados] = useState([]);
    const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState(null);
    const [empleadoEnEdicion, setEmpleadoEnEdicion] = useState(null);
    const [agregandoEmpleado, setAgregandoEmpleado] = useState(false);
    const [paginaActual, setPaginaActual] = useState(1);
    const empleadosPorPagina = 10;

    const indiceUltimoEmpleado = paginaActual * empleadosPorPagina;
    const indicePrimerEmpleado = indiceUltimoEmpleado - empleadosPorPagina;
    const empleadosActuales = empleados.slice(indicePrimerEmpleado, indiceUltimoEmpleado);

    const totalPaginas = Math.ceil(empleados.length / empleadosPorPagina);

    const obtenerEmpleados = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/usuarios");
            const empleadosFiltrados = res.data.filter(usuario => usuario.rol === "empleado");
            setEmpleados(empleadosFiltrados);
        } catch (err) {
            console.error("Error al obtener empleados", err);
        }
    };

    const handleAgregarEmpleado = () => {
        setEmpleadoSeleccionado(null);
        setEmpleadoEnEdicion(null);
        setAgregandoEmpleado(true);
    };

    const handleGuardarNuevoEmpleado = async (nuevoEmpleado) => {
        try {
            await axios.post("http://localhost:8000/api/usuarios", nuevoEmpleado);
            await obtenerEmpleados();
            setAgregandoEmpleado(false);
            alert("Empleado agregado!");
        } catch (error) {
            console.error("Error al agregar empleado", error);
            alert("No se pudo agregar el empleado.");
        }
    };

    const handleVerEmpleado = (empleado) => {
        setEmpleadoEnEdicion(null);
        setEmpleadoSeleccionado(empleado);
    };

    const handleEditarEmpleado = (empleado) => {
        setEmpleadoSeleccionado(null);
        setEmpleadoEnEdicion(empleado);
    };

    const handleGuardarEmpleado = async (id, datosActualizados) => {
        try {
            await axios.put(`http://localhost:8000/api/usuarios/${id}`, datosActualizados);
            await obtenerEmpleados();
            setEmpleadoEnEdicion(null);
            alert("Cambios guardados");
        } catch (error) {
            console.error("Error al guardar los cambios:", error);
            alert("No se pudo guardar el empleado.");
        }
    };

    const handleEliminarEmpleado = async (id) => {
        const confirm = window.confirm("¿Seguro que desea eliminar este empleado?");
        if (!confirm) return;
        try {
            await axios.delete(`http://localhost:8000/api/usuarios/${id}`);
            await obtenerEmpleados();
        } catch (error) {
            console.error(error);
            alert("Error al intentar eliminar el empleado");
        }
    };

    useEffect(() => {
        obtenerEmpleados();
    }, []);

    return (
        <div>
            {empleadoSeleccionado && !empleadoEnEdicion && (
                <MostrarEmpleado
                    producto={empleadoSeleccionado}
                    onClose={() => setEmpleadoSeleccionado(null)}
                />
            )}
            {empleadoEnEdicion && (
                <EditarEmpleado
                    producto={empleadoEnEdicion}
                    onClose={() => setEmpleadoEnEdicion(null)}
                    onGuardar={handleGuardarEmpleado}
                />
            )}
            {agregandoEmpleado && (
                <AgregarEmpleado
                    onClose={() => setAgregandoEmpleado(false)}
                    onGuardar={handleGuardarNuevoEmpleado}
                />
            )}
            <div className="crud-title">
                <h2>Empleados</h2>
                <button type="button" className="btn btn-outline-success" onClick={handleAgregarEmpleado}>
                    Agregar <i className="bi bi-plus-circle"></i>
                </button>
            </div>
            <table className="table table-striped table-dark">
                <thead>
                    <tr>
                        <th scope="col" className="col-1"># ID</th>
                        <th scope="col" className="col-2">Nombre</th>
                        <th scope="col" className="col-2">Email</th>
                        <th scope="col" className="col-2">Rol</th>
                        <th scope="col" className="col-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {empleadosActuales.map((empleado) => (
                        <tr key={empleado.idUsuario}>
                            <th scope="row">{empleado.idUsuario}</th>
                            <td>{empleado.nombre} {empleado.apellido}</td>
                            <td>{empleado.email}</td>
                            <td>{empleado.rol}</td>
                            <td>
                                <button type="button" className="btn btn-outline-info me-1" onClick={() => handleVerEmpleado(empleado)}><i className="bi bi-eye"></i></button>
                                <button type="button" className="btn btn-outline-warning me-1" onClick={() => handleEditarEmpleado(empleado)}><i className="bi bi-pencil"></i></button>
                                <button type="button" className="btn btn-outline-danger" onClick={() => handleEliminarEmpleado(empleado.idUsuario)}><i className="bi bi-trash"></i></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="d-flex justify-content-center my-4 align-items-center flex-wrap gap-2">
                {paginaActual > 3 && (
                    <button onClick={() => setPaginaActual(1)} className="btn btn-outline-secondary">{'«'}</button>
                )}
                {paginaActual > 1 && (
                    <button onClick={() => setPaginaActual(paginaActual - 1)} className="btn btn-outline-secondary">{'←'}</button>
                )}
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
                            style={num === paginaActual ? { backgroundColor: "#f1c40f", color: "black", fontWeight: "bold" } : {}}
                        >
                            {num}
                        </button>
                    ))}
                {paginaActual < totalPaginas && (
                    <button onClick={() => setPaginaActual(paginaActual + 1)} className="btn btn-outline-secondary">{'→'}</button>
                )}
                {paginaActual < totalPaginas - 2 && (
                    <button onClick={() => setPaginaActual(totalPaginas)} className="btn btn-outline-secondary">{'»'}</button>
                )}
            </div>
        </div>
    );
};

export default CrudEmpleados;
