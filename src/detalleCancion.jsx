import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Container, Row, Col, Table } from "react-bootstrap";
import NavMenu from "./components/NavMenu";

const DetalleCancion = () => {
    const { id } = useParams();
    const [cancion, setcancion] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:3008/cancion/${id}`)
            .then((res) => {
                console.log(res.data);
                setcancion(res.data);
            })
            .catch((error) => console.log(error));
    }, [id]);

    if (!cancion.nombre) return <div>Cargando canción...</div>;

    return (
        <>
        <NavMenu/>
        <Container fluid className="mt-3 mb-3" style={{ minHeight: "100vh" }}>
            <Row>
                <Col md={12}>
                    <Card className="p-4 shadow" style={{ backgroundColor: "#f8f9fa", width: "100%" }}>
                        <Row>
                            <Col xs={12} md={6} lg={10} xl={18} className="mx-auto">
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Nombre</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{cancion.nombre}</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <audio controls>
                                                    <source 
                                                        src={`http://localhost:3008/public/canciones/${cancion.id}.mp3`} 
                                                        type="audio/mpeg" 
                                                    />
                                                    Tu navegador no soporta el elemento de audio.
                                                </audio>
                                            </td>
                                        </tr>
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

export default DetalleCancion;
