import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavMenu from "./components/NavMenu";
import "./App.css";
const GenerosView = () => {
    const [ListaGeneros, setListaGeneros] = useState([]);

    useEffect(() => {
        getListaGeneros();
        document.title = "Spotify";
    }, []);

    const getListaGeneros = () => {
        axios.get('http://localhost:3008/generos')
            .then(res => {

                console.log(res.data);
                const generos = res.data;
                setListaGeneros(generos);
            }).catch(error => {
                console.log(error);
            });
    };

    return (
        <>
        <NavMenu/>
            <Container  fluid className="mt-3 mb-3" >
              <h1>Generos:</h1>
                <Row>
                    {ListaGeneros.map(genero => (
                        <Col key={genero.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                            <Card className="shadow-sm">
                            <Card.Img
                                    variant="top"
                                    src={`http://localhost:3008/public/generos/${genero.id}.jpeg`}
                                    alt={genero.nombre} 
                                    className="img-fluid"
                                    style={{ height: "200px", objectFit: "cover" }}
                                />
                                <Card.Body>
                                <Card.Title className="text-center">
                                        <Link to={`/generos/${genero.id}`} className="text-decoration-none">
                                            {genero.nombre}
                                        </Link>
                                    </Card.Title>



                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
};

export default GenerosView;
