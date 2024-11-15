import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Home/Home';
import AuthPage from './Form/AuthPage';
import AboutUs from './AboutUs/AboutUse';
import ContactUs from './ContactUs/ContactUs';
import Account from './Account/Account';
import ProductsPage from './ProductsPage/ProductsPage';
import CartPage from './CartPage/CartPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const routers = createBrowserRouter(
  [
    {element: <Home/>, path:"/"},
    {element: <AuthPage/>, path:"/auth"},
    {element: <AboutUs/>, path:"/about"},
    {element: <ContactUs/>, path:"/contact"},
    {element: <Account/>, path:"/account"},
    {element: <ProductsPage/>, path:"/products"},
    {element: <CartPage/>, path:"/cart"}
  ]
)
function App() {
  return (
    <RouterProvider router={routers}/>
  );
}

export default App;
