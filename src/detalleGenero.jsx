import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Container, Row, Col, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavMenu from "./components/NavMenu";

const DetalleGenero = () => {
    const { id } = useParams();
    const [artistas, setArtistas] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3008/artistas/genero/${id}`)
            .then((res) => {
                setArtistas(res.data);
            })
            .catch((error) => console.log(error));
    }, [id]);

    if (artistas.length === 0) return <div>No hay artistas para este género.</div>;

    return (
        <>
        <NavMenu/>
        <Container  fluid className="mt-3 mb-3" style={{ minHeight: "100vh"} }>
            <Row>
                <Col md={12}>
                    <Card className="p-4 shadow" style={{ backgroundColor: "#f8f9fa", borderRadius: "15px",width:"100%" }}>
                        <Row>
                            <Col xs={12} md={16} lg={10} xl={18} className="mx-auto">
                                <Table responsive>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Nombre</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {artistas.map((artista) => (
                                            <tr key={artista.id}>
                                                 <td>
                                                    <img
                                                        src={`http://localhost:3008/public/artistas/${artista.id}.jpeg`} // URL completa de la imagen
                                                        alt={artista.nombre}
                                                        style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                                                    />
                                                </td>
                                                 <td>
                                                    <Link to={`/artistas/${artista.id}`} style={{ textDecoration: 'none', color: '#007bff' }}>
                                                        {artista.nombre}
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Container>
        </>
    );
};

export default DetalleGenero;
