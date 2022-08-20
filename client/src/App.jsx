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
import Success from "./pages/Success";


const App = () => {
  const user = useSelector(state=>state.user.currentUser)

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/checkout" element={<Pay />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/success" element={<Success />} />
        <Route path="/login" element={user? <Navigate to="/" /> : <Login />} />
        {/* <Route path="/login" element={user? <Navigate to="/" /> : <Login />} /> */}
        {/* <Route path="/register" element={user? <Navigate to="/" /> : <Register />} /> */}
        <Route path="/register" element={user? <Navigate to="/" /> : <Register />} />
        
      </Routes>
    </Router>
  );
};

export default App;