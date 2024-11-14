import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavMenu from "./components/NavMenu";

const ListaGeneros = () => {
    const [ListaGeneros, setListaGeneros] = useState([]);
    useEffect(() => {
        getListaGeneros();
        document.title = "Spotify";
    }, []) 

    const getListaGeneros = () => {
        axios.get('http://localhost:3008/generos/')
            .then(res => {
                setListaGeneros(res.data);
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
        axios.delete(`http://localhost:3008/generos/${id}`)
            .then(res => {
                console.log(res.data);
                getListaGeneros();
            }).catch(error => {
                console.log(error);
            });
    }

    return (
        <>
        <NavMenu/>
            <Container className="mt-3 mb-3">
            <Row >
                <Col md={18}>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    <h2>Lista de generos</h2>
                                </Card.Title>
                                <Table >
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nombre</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ListaGeneros.map(genero =>
                                            <tr key={genero.id}>
                                                <td>{genero.id}</td>
                                                <td>{genero.nombre}</td>
                                                <td><Link className="btn btn-primary" to={"/genero/" + genero.id}>Editar</Link></td>
                                                <td><Link className="btn btn-info" to={"/genero/" + genero.id+ '/foto'}>Agregar Foto</Link></td>
                                                <td><Button variant="danger" onClick={() => { eliminar(genero.id) }}>Eliminar</Button></td>
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

export default ListaGeneros;