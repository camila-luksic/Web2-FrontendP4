import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavMenu from "./components/NavMenu";

const ListaArtistas = () => {
    const [ListaArtistas, setListaArtistas] = useState([]);
    useEffect(() => {
        getListaArtistas();
        document.title = "Spotify";
    }, []) 

    const getListaArtistas = () => {
        axios.get('http://localhost:3008/Artistas/')
            .then(res => {
                setListaArtistas(res.data);
                // console.log(res.data);
            }).catch(error => {
                console.log(error);
            });
    }
    const eliminar = (id) => {
        const confirm = window.confirm("¿Está seguro de eliminar el registro?");
        if (!confirm) {
            return;
        }
        axios.delete(`http://localhost:3008/Artistas/${id}`)
            .then(res => {
                console.log(res.data);
                getListaArtistas();
            }).catch(error => {
                console.log(error);
            });
    }

    return (
        <>
        <NavMenu/>
            <Container className="mt-3 mb-3">
                <Row>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    <h2>Lista de Artistas</h2>
                                </Card.Title>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nombre</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ListaArtistas.map(Artista =>
                                            <tr key={Artista.id}>
                                                <td>{Artista.id}</td>
                                                <td>{Artista.nombre}</td>
                                                <td><Link className="btn btn-primary" to={"/Artista/" + Artista.id}>Editar</Link></td>
                                                <td><Link className="btn btn-info" to={"/artista/" + Artista.id+ '/foto'}>Agregar Foto</Link></td>
                                                <td><Button variant="danger" onClick={() => { eliminar(Artista.id) }}>Eliminar</Button></td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container >
        </>
    );
}

export default ListaArtistas;