import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Pay from "./pages/Pay";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
  Navigate
} from "react-router-dom";
import { useSelector } from "react-redux";


const App = () => {
  const user = useSelector(state=>state.user.currentUser)

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<Product />} />
        <Route exact path="/products/:category" element={<ProductList />} />
        <Route exact path="/checkout" element={<Pay />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/login" element={user? <Navigate to="/" /> : <Login />} />
        <Route exact path="/register" element={user? <Navigate to="/" /> : <Register />} />
        
      </Routes>
    </Router>
  );
};

export default App;