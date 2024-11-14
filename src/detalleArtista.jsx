import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Container, Row, Col, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavMenu from "./components/NavMenu";

const DetalleArtista = () => {
    const { id } = useParams();
    const [albums, setAlbums] = useState([]);
    const [selectedAlbum, setSelectedAlbum] = useState(null);
    const [canciones, setCanciones] = useState([]);
    const [artista, setArtista] = useState(null);

    useEffect(() => {
        axios
            .get(`http://localhost:3008/album/artista/${id}`)
            .then((res) => {
                setAlbums(res.data);
            })
            .catch((error) => console.log(error));
        axios.get(`http://localhost:3008/artistas/${id}`)
            .then((res) => {
                setArtista(res.data);
            })
            .catch((error) => console.log(error));
    }, [id]);

    const obtenerCanciones = (albumId) => {
        setSelectedAlbum(albumId);
        axios.get(`http://localhost:3008/cancion/album/${albumId}`)
            .then((res) => {
                setCanciones(res.data);
            })
            .catch((error) => console.log(error));
    };

    return (
        <>
            <NavMenu />
            <Container fluid className="mt-3 mb-3" style={{ minHeight: "100vh" }}>
                <Row>
                    <Col md={12}>
                        <Card className="p-4 shadow" style={{ backgroundColor: "#f8f9fa", borderRadius: "15px" }}>
                            <Row>
                                <Col xs={12} md={6}  lg={10} xl={12} className="mx-auto">
                                    {artista && (
                                        <>
                                            <img
                                                src={`http://localhost:3008/public/artistas/${artista.id}.jpeg`}
                                                alt={artista.nombre}
                                                style={{
                                                    width: "150px",
                                                    height: "150px",
                                                    borderRadius: "50%",
                                                    border: "3px solid #ddd",
                                                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                                                    objectFit: "cover"
                                                }}
                                            />
                                            <h3 className="mt-3">{artista.nombre}</h3>
                                        </>
                                    )}
                                </Col>

                                <Col xs={12} md={6} lg={10} xl={12} className="mx-auto">
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>Nombre</th>
                                                <th>Ver Canciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {albums.map((album) => (
                                                <tr key={album.id}>
                                                    <td>
                                                        <img
                                                            src={`http://localhost:3008/public/albums/${album.id}.jpeg`}
                                                            alt={album.nombre}
                                                            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                                                        />
                                                    </td>
                                                    <td>
                                                        <Link to={`/albums/${album.id}`} style={{ textDecoration: 'none', color: '#007bff' }}>
                                                            {album.nombre}
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        <Button variant="info" onClick={() => obtenerCanciones(album.id)}>
                                                            Mostrar Canciones
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                    {selectedAlbum && (
                                        <div className="mt-4">
                                            <h4>Canciones del Álbum</h4>
                                            <Table>
                                                <thead>
                                                    <tr>
                                                        <th>Nombre</th>
                                                        <th>Reproductor</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {canciones.map((cancion) => (
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
                                        </div>
                                    )}
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default DetalleArtista;
