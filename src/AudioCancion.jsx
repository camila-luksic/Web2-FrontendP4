import axios from "axios";
import { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const AudioCancion = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [audioCancion, setAudioCancion] = useState(null);

    const onChangeAudio = (e) => {
        setAudioCancion(e.target.files[0]);
    }

    const onGuardarClick = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', audioCancion);

        axios.post(`http://localhost:3008/cancion/mp3/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
        .then(res => {
            console.log(res.data);
            navigate(`/`);
        })
        .catch(error => {
            console.error("Error al cargar el audio:", error);
        });
    }

    return (
        <Container>
            <Row className="mt-3 mb-3">
                <Col md={8}>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                <h2>Subir Audio de Canción</h2>
                            </Card.Title>
                            <Form onSubmit={onGuardarClick}>
                                <Form.Group>
                                    <Form.Label>Seleccione un archivo de audio:</Form.Label>
                                    <Form.Control type="file" onChange={onChangeAudio} />
                                </Form.Group>
                                <Form.Group className="mt-3">
                                    <Button type="submit">Guardar Audio</Button>
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default AudioCancion;
