import React from "react";
import "../styles/Funciones.css";

const MainFunciones = () => {

  return (
    <main className="funciones-container">
      <section className="top-section">
        <div className="poster-info">
          <img
            src="https://motoblog.com/wp-content/uploads/2022/08/WhatsApp-Image-2022-08-16-at-3.36.56-PM-2.jpeg"
            alt="Poster de la película"
            className="poster"
          />
          <div className="info">
            <h2>Nombre de la Película</h2>
            <p>Duración: 1h 45min</p>
            <p>Clasificación: ATP</p>
            <p className="descripcion">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem,
              aliquam, delectus possimus, recusandae corrupti deleniti tempora
              et vel ipsam reprehenderit porro! Repellat quos exercitationem
              excepturi praesentium voluptate perferendis quo optio id, a
              accusantium qui dolorem omnis sapiente? Accusamus numquam illum
              eligendi animi! Exercitationem error itaque ad veniam unde, sed
              quas porro asperiores facilis aperiam suscipit? Quasi atque a
              minima ipsum enim tempore porro ipsam commodi minus quibusdam hic
              mollitia aspernatur vitae repellat ducimus ad aliquam consequatur
              omnis impedit sint, incidunt vero reiciendis. Deserunt ipsam
              excepturi fuga amet sapiente inventore molestias consectetur
              expedita, id commodi, sunt perferendis nemo, enim ullam quia.
            </p>
          </div>
        </div>

        <div className="right-section">
          <div className="trailer-container">
            <iframe
              width="100%"
              height="415"
              src="https://www.youtube.com/embed/qZ8hIVoiO1g?si=Bu6fts3FQilv-pzH"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
          <div className="aviso">
            <p>
              La venta online cierra 60 minutos antes de cada función. Puede
              adquirir entradas en boletería hasta el horario de inicio de la
              misma.
            </p>
          </div>

          <section className="fechas">
            <div>
              DOM
              <br />
              15/06
            </div>
            <div>
              LUN
              <br />
              16/06
            </div>
            <div>
              MAR
              <br />
              17/06
            </div>
            <div>
              MIÉ
              <br />
              18/06
            </div>
          </section>

          <section className="funciones">
            <div className="funcion-card">
              <h3 className="funcion-titulo">Funciones para el Domingo 15</h3>
              <div className="funcion-item">
                <div>
                  <strong style={{ fontSize: "20px" }}>2D</strong> Castellano
                </div>
                <div className="horarios">01:10</div>
              </div>
            </div>
          </section>
          <br />
          <br />
        </div>
      </section>

      {/* este boton debera agregar la pelicula al carrito segun su id - por el momento no sirve */}
      {/* <button>Boton de añadir ticket</button> */}
    </main>
  );
};

export default MainFunciones;
