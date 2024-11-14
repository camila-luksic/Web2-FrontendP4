
import axios from "axios";
import { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const FotoGenero = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [fotoPerfil, setFotoPerfil] = useState(null);
    const [validated, setValidated] = useState(false);


    const onChangeFoto = (e) => {
        setFotoPerfil(e.target.files[0]);
    }
    const onGuardarClick = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        e.stopPropagation();

        setValidated(true);

        if (form.checkValidity() === false) {
            return;
        }
        const formData = new FormData();
        formData.append('fotoPerfil', fotoPerfil);
        axios.post(`http://localhost:3008/generos/${id}/foto`, formData)
            .then(res => {
                console.log(res.data);
                navigate(`/`);
            }).catch(error => {
                console.log(error);
            });
    }
    return (
        <>
            <Container>
                <Row className="mt-3 mb-3">
                    <Col md={8}>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    <h2>Foto de perfil del Genero</h2>
                                </Card.Title>
                                <Form noValidate validated={validated} onSubmit={onGuardarClick}>
                                    <Form.Group >
                                        <Form.Label>Seleccione una imagen:</Form.Label>
                                        <Form.Control required type="file" onChange={onChangeFoto} />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor seleccione un archivo.
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
        </>);
}

export default FotoGenero;
