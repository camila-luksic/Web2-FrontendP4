import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const FormArtista = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [nombre, setNombre] = useState('');
    const [validated, setValidated] = useState(false);
    const [generos, setGeneros] = useState([]);
    const [idGenero, setIdGenero] = useState('');

    useEffect(() => {
        if (id) {
            getArtistaById();
        }
        getGeneros();
    }, [id]);

    const getArtistaById = () => {
        axios.get(`http://localhost:3008/artistas/${id}`)
            .then(res => {
                const artista = res.data;
                setNombre(artista.nombre);
                setIdGenero(artista.idGenero);
            }).catch(error => {
                console.log(error);
            });
    };

    const getGeneros = () => {
        axios.get('http://localhost:3008/generos')
            .then(res => {
                setGeneros(res.data);
            }).catch(error => {
                console.log(error);
            });
    };

    const onChangeNombre = (e) => {
        setNombre(e.target.value);
    };

    const onChangeGenero = (e) => {
        setIdGenero(e.target.value);
    };

    const onGuardarClick = (e) => {
        e.preventDefault();
        const form = e.currentTarget;

        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
            return;
        }

        const artista = { nombre, idGenero };

        if (id) {
            editArtista(artista);
        } else {
            insertArtista(artista);
        }
    };

    const editArtista = (artista) => {
        axios.put(`http://localhost:3008/artistas/${id}`, artista)
            .then(res => {
                console.log(res.data);
                navigate('/');
            }).catch(error => {
                console.log(error);
            });
    };

    const insertArtista = (artista) => {
        axios.post('http://localhost:3008/artistas', artista)
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
                                <h2>Formulario Artistas o Bandas</h2>
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
                                    <Form.Label>Género:</Form.Label>
                                    <Form.Select
                                        required
                                        value={idGenero}
                                        onChange={onChangeGenero}
                                    >
                                        <option value="">Seleccione un género</option>
                                        {generos.map((genero) => (
                                            <option key={genero.id} value={genero.id}>
                                                {genero.nombre}
                                            </option>
                                        ))}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        Por favor seleccione un género.
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

export default FormArtista;
