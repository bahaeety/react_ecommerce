import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Home/Home';
import AuthPage from './Form/AuthPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const routers = createBrowserRouter(
  [
    {element: <Home/>, path:"/"},
    {element: <AuthPage/>, path:"/auth"},
  ]
)
function App() {
  return (
    <RouterProvider router={routers}/>
  );
}

export default App;
