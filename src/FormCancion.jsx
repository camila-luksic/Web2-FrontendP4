import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const FormCancion = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [nombre, setNombre] = useState('');
    const [validated, setValidated] = useState(false);
    const [Album, setAlbum] = useState([]);
    const [idAlbum, setIdAlbum] = useState('');

    useEffect(() => {
        if (id) {
            getCancionById();
        }
        getAlbum();
    }, [id]);

    const getCancionById = () => {
        axios.get(`http://localhost:3008/cancion/${id}`)
            .then(res => {
                const Cancion = res.data;
                setNombre(Cancion.nombre);
                setIdAlbum(Cancion.idAlbum);
            }).catch(error => {
                console.log(error);
            });
    };

    const getAlbum = () => {
        axios.get('http://localhost:3008/album')
            .then(res => {
                setAlbum(res.data);
            }).catch(error => {
                console.log(error);
            });
    };

    const onChangeNombre = (e) => {
        setNombre(e.target.value);
    };

    const onChangeAlbum = (e) => {
        setIdAlbum(e.target.value);
    };

    const onGuardarClick = (e) => {
        e.preventDefault();
        const form = e.currentTarget;

        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
            return;
        }

        const Cancion = { nombre, idAlbum };

        if (id) {
            editCancion(Cancion);
        } else {
            insertCancion(Cancion);
        }
    };

    const editCancion = (Cancion) => {
        axios.put(`http://localhost:3008/cancion/${id}`, Cancion)
            .then(res => {
                console.log(res.data);
                navigate('/');
            }).catch(error => {
                console.log(error);
            });
    };

    const insertCancion = (Cancion) => {
        axios.post('http://localhost:3008/cancion', Cancion)
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
                                <h2>Formulario de Cancion </h2>
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
                                    <Form.Label>Album:</Form.Label>
                                    <Form.Select
                                        required
                                        value={idAlbum}
                                        onChange={onChangeAlbum}
                                    >
                                        <option value="">Seleccione un Album</option>
                                        {Album.map((Album) => (
                                            <option key={Album.id} value={Album.id}>
                                                {Album.nombre}
                                            </option>
                                        ))}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        Por favor seleccione un Album.
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

export default FormCancion;
