import axios from "axios";
import { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const FotoAlbum = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [fotoAlbum, setFotoAlbum] = useState(null);
    const [validated, setValidated] = useState(false);

    const onChangeFoto = (e) => {
        setFotoAlbum(e.target.files[0]);
    }

    const onGuardarClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        setValidated(true);

        if (!fotoAlbum) {
            return;
        }

        const formData = new FormData();
        formData.append('fotoAlbum', fotoAlbum);

        axios.post(`http://localhost:3008/album/${id}/foto`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
        .then(res => {
            console.log(res.data);
            navigate(`/`);
        })
        .catch(error => {
            console.error("Error al cargar la foto:", error);
        });
    }

    return (
        <Container>
            <Row className="mt-3 mb-3">
                <Col md={8}>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                <h2>Foto de perfil del album</h2>
                            </Card.Title>
                            <Form noValidate validated={validated} onSubmit={onGuardarClick}>
                                <Form.Group>
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
    );
}

export default FotoAlbum;
