import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import FormGenero from './FormGenero.jsx';
import Formartista from './FormArtista.jsx';
import ListaGeneros from './ListGenero.jsx';
import ListaArtistas from './ListArtista.jsx';
import FormAlbum from './FormAlbum.jsx';
import ListaAlbums from './ListAlbum.jsx';
import ListaCancions from './ListCancion.jsx';
import FormCancion from './FormCancion.jsx';
import FotoGenero from './FotoGenero.jsx';
import DetalleGenero from './detalleGenero.jsx';
import DetalleArtista from './detalleArtista.jsx';
import DetalleAlbum from './detalleAlbum.jsx';
import FotoAlbum from './FotoAlbum.jsx';
import AudioCancion from './AudioCancion.jsx';
import FotoArtista from './FotoArtista.jsx';
import DetalleCancion from './detalleCancion.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/genero",
    element: <ListaGeneros />,
  },
  {
    path: "/createGenero",
    element: <FormGenero />,
  },
  {
    path: "/genero/:id",
    element: <FormGenero />,
  },
  {
    path: "/generos/:id",
    element: <DetalleGenero />,
  },
  {
    path: "/genero/:id/foto",
    element: <FotoGenero />,
  },
  {
    path: "/artista",
    element: <ListaArtistas/>,
  },
  {
    path: "/artistas/:id",
    element: <DetalleArtista/>,
  },
  {
    path: "/createArtista",
    element: <Formartista />,
  },
  {
    path: "/artista/:id/foto",
    element: <FotoArtista />,
  },
  {
    path: "/artista/:id",
    element: <Formartista />,
  },
  {
    path: "/album",
    element: <ListaAlbums />,
  },
  {
    path: "/albums/:id",
    element: <DetalleAlbum />,
  },
  {
    path: "/album/:id/foto",
    element: <FotoAlbum />,
  },
  {
    path: "/createAlbum",
    element: <FormAlbum />,
  },
  {
    path: "/album/:id",
    element: <FormAlbum />,
  },
  {
    path: "/cancion",
    element: <ListaCancions />,
  },
  {
    path: "/cancion/:id",
    element: <DetalleCancion />,
  },
  {
    path: "/createCancion",
    element: <FormCancion />,
  },
  {
    path: "/cancion/:id/audio",
    element: <AudioCancion />,
  },
  {
    path: "/cancion/:id/editar",
    element: <FormCancion />,
  },

]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)