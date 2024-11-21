import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Home/Home';
import AuthPage from './Form/AuthPage';
import AboutUs from './AboutUs/AboutUse';
import ContactUs from './ContactUs/ContactUs';
import Account from './Account/Account';
import ProductsPage from './ProductsPage/ProductsPage';
import CartPage from './CartPage/CartPage';
import ProtectedRoute from './Protected_routes/authentication';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import axios from 'axios';


axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:5000'; 


const routers = createBrowserRouter(
  [
    {element: <ProtectedRoute><Home/></ProtectedRoute>, path:"/"},
    {element: <AuthPage/>, path:"/auth"},
    {element: <ProtectedRoute><AboutUs/></ProtectedRoute>, path:"/about"},
    {element: <ProtectedRoute><ContactUs/></ProtectedRoute>, path:"/contact"},
    {element: <ProtectedRoute><Account/></ProtectedRoute>, path:"/account"},
    {element: <ProtectedRoute><ProductsPage/></ProtectedRoute>, path:"/products"},
    {element: <ProtectedRoute><CartPage/></ProtectedRoute>, path:"/cart"}
  ]
)
function App() {
  return (
    <RouterProvider router={routers}/>
  );
}

export default App;
