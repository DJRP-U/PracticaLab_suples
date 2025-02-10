'use client'

import { borrarSesion } from "../hooks/SessionUtilClient";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import mensajes from '../componentes/Mensajes';

export default function Menu() {
    const router = useRouter();
    

    return (
        <nav className="navbar navbar-expand" style={{ background: 'linear-gradient(135deg, #5f8d99, #003366)' }}>
            <div className="container-fluid">
                <img src="https://siaaf.unl.edu.ec/static/img/logo.png" width={180} alt="logo" />

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auhref mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active text-white " aria-current="page" href="/principal">Inicio</Link>
                        </li>

                    </ul>
                </div>
            </div>
            <br />
            <br />
        </nav>
    );
}
