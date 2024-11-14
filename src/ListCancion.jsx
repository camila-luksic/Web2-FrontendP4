import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavMenu from "./components/NavMenu";

const ListaCancions = () => {
    const [ListaCancions, setListaCancions] = useState([]);
    useEffect(() => {
        getListaCancions();
        document.title = "Spotify";
    }, []) 

    const getListaCancions = () => {
        axios.get('http://localhost:3008/cancion/')
            .then(res => {
                setListaCancions(res.data);
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
        axios.delete(`http://localhost:3008/cancion/${id}`)
            .then(res => {
                console.log(res.data);
                getListaCancions();
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
                                    <h2>Lista de Canciones</h2>
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
                                        {ListaCancions.map(Cancion =>
                                            <tr key={Cancion.id}>
                                                <td>{Cancion.id}</td>
                                                <td>{Cancion.nombre}</td>
                                                <td><Link className="btn btn-primary" to={"/Cancion/" + Cancion.id+"/editar"}>Editar</Link></td>
                                                <td><Link className="btn btn-info" to={"/cancion/" +Cancion.id+ '/audio'}>Agregar Audio</Link></td>
                                                <td><Button variant="danger" onClick={() => { eliminar(Cancion.id) }}>Eliminar</Button></td>
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

export default ListaCancions;