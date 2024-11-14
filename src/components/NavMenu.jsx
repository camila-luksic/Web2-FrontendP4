import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container, Form, FormControl } from 'react-bootstrap';
import { useState } from 'react';
import './NavMenu.css';

const NavMenu = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState({
    canciones: [],
    artistas: [],
    albums: []
  });

  const handleSearchChange = async (event) => {
    const searchQuery = event.target.value;
    setQuery(searchQuery);

    if (searchQuery.trim() === '') {
      setSuggestions({
        canciones: [],
        artistas: [],
        albums: []
      });
      return;
    }

    try {
      const response = await fetch(`http://localhost:3008/cancion/buscar?q=${searchQuery}`);
      const data = await response.json();
      setSuggestions({
        canciones: data.canciones || [],
        artistas: data.artistas || [],
        albums: data.albums || []
      });
    } catch (error) {
      console.error('Error al buscar:', error);
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="nav-container">
      <Container>
        <Navbar.Brand as={Link} to="/">Spotify</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>

            <NavDropdown title="Generos" id="dropdown-generos">
              <NavDropdown.Item as={Link} to="/genero">Ver Generos</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/createGenero">Crear Genero</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Artistas" id="dropdown-generos">
              <NavDropdown.Item as={Link} to="/artista">Ver Artistas </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/createArtista">Crear Artista</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Album" id="dropdown-generos">
              <NavDropdown.Item as={Link} to="/album">Ver Album </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/createAlbum">Crear Album</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Cancion" id="dropdown-generos">
              <NavDropdown.Item as={Link} to="/cancion">Ver Canciones </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/createCancion">Crear Cancion</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <Form inline>
            <FormControl 
              type="text" 
              placeholder="Buscar canciones, artistas o álbumes..." 
              value={query}
              onChange={handleSearchChange}
              className="mr-sm-2"
            />
          </Form>
          {query && (
            <ul className="suggestions-list">
              {suggestions.canciones.length > 0 && (
                <li><strong>Canciones</strong></li>
              )}
              {suggestions.canciones.map((cancion) => (
                <li key={cancion.id} onClick={() => window.location.href = `/cancion/${cancion.id}`}>
                  {cancion.nombre}
                </li>
              ))}
              {suggestions.artistas.length > 0 && (
                <li><strong>Artistas</strong></li>
              )}
              {suggestions.artistas.map((artista) => (
                <li key={artista.id} onClick={() => window.location.href = `/artistas/${artista.id}`}>
                  {artista.nombre}
                </li>
              ))}
              {suggestions.albums.length > 0 && (
                <li><strong>Álbumes</strong></li>
              )}
              {suggestions.albums.map((album) => (
                <li key={album.id} onClick={() => window.location.href = `/albums/${album.id}`}>
                  {album.nombre}
                </li>
              ))}
            </ul>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavMenu;
