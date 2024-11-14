import axios from "axios";
import { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import {  useParams ,useNavigate} from "react-router-dom";

const FotoArtista = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [fotoArtista, setFotoArtista] = useState(null);
    const [validated, setValidated] = useState(false);

    const onChangeFoto = (e) => {
        setFotoArtista(e.target.files[0]);
    }

    const onGuardarClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        setValidated(true);

        if (!fotoArtista) {
            return;
        }

        const formData = new FormData();
        formData.append('fotoArtista', fotoArtista); 
        console.log("----"+formData);

        axios.post(`http://localhost:3008/artistas/${id}/foto`, formData, {
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
                                <h2>Foto de perfil del Artista</h2>
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

export default FotoArtista;
