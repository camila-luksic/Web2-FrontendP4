import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavMenu from "./components/NavMenu";

const ListaAlbums = () => {
    const [ListaAlbums, setListaAlbums] = useState([]);
    useEffect(() => {
        getListaAlbums();
        document.title = "Spotify";
    }, []) 

    const getListaAlbums = () => {
        axios.get('http://localhost:3008/album/')
            .then(res => {
                setListaAlbums(res.data);
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
        axios.delete(`http://localhost:3008/album/${id}`)
            .then(res => {
                console.log(res.data);
                getListaAlbums();
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
                                    <h2>Lista de Albums</h2>
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
                                        {ListaAlbums.map(Album =>
                                            <tr key={Album.id}>
                                                <td>{Album.id}</td>
                                                <td>{Album.nombre}</td>
                                                <td><Link className="btn btn-primary" to={"/Album/" + Album.id}>Editar</Link></td>
                                                <td><Link className="btn btn-info" to={"/album/" + Album.id+ '/foto'}>Agregar Foto</Link></td>
                                                <td><Button variant="danger" onClick={() => { eliminar(Album.id) }}>Eliminar</Button></td>
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

export default ListaAlbums;