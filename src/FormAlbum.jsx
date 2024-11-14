import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const FormAlbum = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [nombre, setNombre] = useState('');
    const [validated, setValidated] = useState(false);
    const [Artistas, setArtistas] = useState([]);
    const [idArtista, setIdArtista] = useState('');

    useEffect(() => {
        if (id) {
            getAlbumById();
        }
        getArtistas();
    }, [id]);

    const getAlbumById = () => {
        axios.get(`http://localhost:3008/album/${id}`)
            .then(res => {
                const Album = res.data;
                setNombre(Album.nombre);
                setIdArtista(Album.idArtista); 
            }).catch(error => {
                console.log(error);
            });
    };

    const getArtistas = () => {
        axios.get('http://localhost:3008/artistas')
            .then(res => {
                setArtistas(res.data);
            }).catch(error => {
                console.log(error);
            });
    };

    const onChangeNombre = (e) => {
        setNombre(e.target.value);
    };

    const onChangeArtista = (e) => {
        setIdArtista(e.target.value);
    };

    const onGuardarClick = (e) => {
        e.preventDefault();
        const form = e.currentTarget;

        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
            return;
        }

        const Album = { nombre, idArtista };

        if (id) {
            editAlbum(Album);
        } else {
            insertAlbum(Album);
        }
    };

    const editAlbum = (Album) => {
        axios.put(`http://localhost:3008/album/${id}`, Album)
            .then(res => {
                console.log(res.data);
                navigate('/');
            }).catch(error => {
                console.log(error);
            });
    };

    const insertAlbum = (Album) => {
        axios.post('http://localhost:3008/album', Album)
            .then(res => {
                console.log(res.data);
                navigate('/');
            }).catch(error => {
                console.log(error);
            });
    };

    return (
        <Container>
            <Row className="mt-3 mb-3">
                <Col md={8}>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                <h2>Formulario de Album </h2>
                            </Card.Title>
                            <Form noValidate validated={validated} onSubmit={onGuardarClick}>
                                <Form.Group>
                                    <Form.Label>Nombre:</Form.Label>
                                    <Form.Control
                                        required
                                        value={nombre}
                                        type="text"
                                        onChange={onChangeNombre}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Por favor ingrese un nombre.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                
                                <Form.Group className="mt-3">
                                    <Form.Label>Artista/Banda:</Form.Label>
                                    <Form.Select
                                        required
                                        value={idArtista}
                                        onChange={onChangeArtista}
                                    >
                                        <option value="">Seleccione un artista/banda</option>
                                        {Artistas.map((Artista) => (
                                            <option key={Artista.id} value={Artista.id}>
                                                {Artista.nombre}
                                            </option>
                                        ))}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        Por favor seleccione un artista/banda.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                
                                <Form.Group className="mt-3">
                                    <Button type="submit">Guardar datos</Button>
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default FormAlbum;
