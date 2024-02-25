
import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

const App = () => {
  // const user = false;
  //const user = useSelector((state) => state.user.currentUser);

  return (
    <Router>
           <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/Products/:Category" element={<ProductList />} />
           <Route path="/Product/:id" element={<Product />} />
           <Route path="/Cart" element={<Cart />} />
           <Route path="/login" element={ <Login />} />
           <Route path="/register" element={<Register />} />
           </Routes>
    </Router>
  );
};

export default App;
