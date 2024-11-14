import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const FormGenero = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [nombre, setNombre] = useState('');
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        if (id) {
            getGeneroById();
        }
    }, [id]);

    const getGeneroById = () => {
        axios.get(`http://localhost:3008/generos/${id}`)
            .then(res => {
                const genero = res.data;
                setNombre(genero.nombre);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const onChangeNombre = (e) => {
        setNombre(e.target.value);
    };

    const onGuardarClick = (e) => {
        e.preventDefault();
        const form = e.currentTarget;

        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
            return;
        }

        const genero = { nombre };

        if (id) {
            editGenero(genero);
        } else {
            insertGenero(genero);
        }
    };

    const editGenero = (genero) => {
        axios.put(`http://localhost:3008/generos/${id}`, genero)
            .then(res => {
                console.log(res.data);
                navigate('/');
            })
            .catch(error => {
                console.log(error);
            });
    };

    const insertGenero = (genero) => {
        axios.post('http://localhost:3008/generos', genero)
            .then(res => {
                console.log(res.data);
                navigate('/');
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <>
        <Container fluid className="mt-3 mb-3">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Card.Title className="text-center mb-4">
                                <h3>Formulario Géneros</h3>
                            </Card.Title>
                            <Form noValidate validated={validated} onSubmit={onGuardarClick}>
                                <Form.Group controlId="nombre">
                                    <Form.Label>Nombre:</Form.Label>
                                    <Form.Control
                                        required
                                        value={nombre}
                                        type="text"
                                        placeholder="Ingrese el nombre del género"
                                        onChange={onChangeNombre}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Por favor ingrese un nombre.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="text-center mt-4">
                                    <Button variant="primary" type="submit" className="px-4">
                                        Guardar Datos
                                    </Button>
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
        </>
    );
};

export default FormGenero;
