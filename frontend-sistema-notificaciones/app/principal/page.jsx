'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Menu from '../../componentes/menu';
import Footer from '../../componentes/footer';
import { borrarSesion, getExternal, getToken } from '../../hooks/SessionUtilClient';
import { peticionGet, peticionPost } from '../../hooks/Conexion';
import mensajes from '../../componentes/Mensajes';

export default function Principal() {
    const key = getToken();
    const router = useRouter();
    const [mensaj, setMensaj] = useState([]);
    const external = getExternal();
    const [filtro, setFiltro] = useState('');




    useEffect(() => {
        peticionGet("mensaje/listar/", key).then((info) => {
            console.log(info)
            if (info.code === 200) {
                setMensaj(info.datos);
            } else if (["token expirado o no valido", "token no valido", "no existe token"].includes(info.tag)) {
                mensajes(info.msg, "Error", "error");
                Cookies.remove("token");
                borrarSesion();
                router.push("/login");
            } else {
                mensajes("No se pudo Listar los mensajes", "Error", "error");
            }
        });
    }, [external, key, router]);

    const manejarCambio = (event) => {
        const valorSeleccionado = event.target.value;
        setFiltro(valorSeleccionado);  // Actualiza el estado con el valor seleccionado
        ejecutarMetodo(valorSeleccionado);  // Ejecuta el método con el valor seleccionado
    };

    const ejecutarMetodo = (valor) => {
        console.log("Método ejecutado con valor: ", valor);

        peticionGet("mensaje/listar/" + valor, key).then((info) => {

            if (info.code === 200) {
                setMensaj(info.datos);
            } else if (["token expirado o no valido", "token no valido", "no existe token"].includes(info.tag)) {
                mensajes(info.msg, "Error", "error");
                Cookies.remove("token");
                borrarSesion();
                router.push("/login");
            } else {
                mensajes("No se pudo Listar los mensajes", "Error", "error");
            }
        });
    };

    const handleClickRechazar = (data) => {


        const datos = {
            'remitente': data,
        };

        peticionPost("mensaje/rechazar/", datos, key).then((info) => {
            if (info.code === 200) {
                mensajes(info.msg, "Success", "mensaje enviado");
            } else if (["token expirado o no valido", "token no valido", "no existe token"].includes(info.tag)) {
                mensajes(info.msg, "Error", "error");
                Cookies.remove("token");
                borrarSesion();
                router.push("/login");
            } else {
                mensajes("No se pudo enviar el mensaje", "Error", "error");
            }
        });
    };

    return (
        <div className="d-flex flex-column min-vh-100 position-relative">
            <div className="container-fluid p-1 position-relative">
                <Menu />
                <br />
                <div style={{ textAlign: 'center' }}>
                    <h1>Mensajes Recibidos</h1>

                </div>
                <br />
                <br />
                <div className="d-flex flex-column align-items-center flex-grow-1">
                    <table
                        className="table table-bordered table-hover"
                        style={{
                            fontSize: '15px',
                            borderColor: 'ActiveBorder',
                            width: '100%',
                            borderRadius: '10px',
                            overflow: 'hidden', // Para que las esquinas redondeadas se vean bien
                        }}
                    >
                        <thead
                            className="table-active"
                            style={{
                                backgroundColor: '#205375',
                                color: 'white',
                                fontSize: '20px',
                                textAlign: 'center',
                                borderRadius: '10px 10px 0 0', // Bordes redondeados en el encabezado
                            }}
                        >
                            <tr>
                                <th>Remitente</th>
                                <th>Categoria</th>
                                <th>Asunto</th>
                                <th>Resumen</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mensaj.length > 0 ? (
                                mensaj.map((dato, index) => (
                                    <tr
                                        key={index}
                                        style={{
                                            backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'white',
                                            transition: 'background-color 0.3s',
                                        }}
                                    >

                                        <td>{dato.remitente}</td>
                                        <td>{dato.tipo}</td>
                                        <td>{dato.asunto}</td>
                                        <td>{dato.resumen}</td>

                                        <td style={{ textAlign: 'center' }}>

                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center text-muted">
                                        Sin mensajes aún
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                </div>
            </div>
            <Footer className="mt-auto position-relative" />
        </div>
    );
}

