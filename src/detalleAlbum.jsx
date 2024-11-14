import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Container, Row, Col, Table } from "react-bootstrap";
import NavMenu from "./components/NavMenu";

const DetalleAlbum = () => {
    const { id } = useParams();
    const [cancions, setcancions] = useState([]);
    const [album, setAlbum] = useState(null);

    useEffect(() => {
        axios .get(`http://localhost:3008/cancion/album/${id}`)
            .then((res) => {
                setcancions(res.data); 
                if (res.data.length > 0) {
                    axios.get(`http://localhost:3008/album/${id}`)
                        .then((resAlbum) => {
                            setAlbum(resAlbum.data);
                        })
                        .catch((error) => console.log(error));
                }
            })
            .catch((error) => console.log(error));
    }, [id]);

    if (cancions.length === 0) return <div>No hay canciones para este álbum.</div>;

    return (
        <>
        <NavMenu/>
        <Container fluid className="mt-3 mb-3" style={{ minHeight: "100vh" }}>
            <Row>
                <Col md={12}>
                    <Card className="p-4 shadow" style={{ backgroundColor: "#f8f9fa", width: "100%" }}>
                        <Row>
                            <Col xs={12} md={6}lg={10} xl={18} className="mx-auto">
                                {album && (
                                    <>
                                        <h3>{album.nombre}</h3>
                                        <img
                                            src={`http://localhost:3008/public/albums/${album.id}.jpeg`}
                                            alt={album.nombre}
                                            style={{
                                                width: "150px",
                                                height: "150px",
                                                borderRadius: "10px",
                                                border: "3px solid #ddd",
                                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                                                objectFit: "cover"
                                            }}
                                        />
                                    </>
                                )}
                            </Col>

                            <Col xs={12} md={6} lg={10} xl={18} className="mx-auto">
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Nombre</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cancions.map((cancion) => (
                                            <tr key={cancion.id}>
                                                <td>{cancion.nombre}</td>
                                                <td>
                                                    <audio controls>
                                                        <source src={`http://localhost:3008/public/canciones/${cancion.id}.mp3`} type="audio/mpeg" />
                                                        Tu navegador no soporta el elemento de audio.
                                                    </audio>
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

export default DetalleAlbum;
