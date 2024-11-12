import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Home/Home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const routers = createBrowserRouter(
  [
    {element: <Home/>, path:"/"}
  ]
)
function App() {
  return (
    <RouterProvider router={routers}/>
  );
}

export default App;
