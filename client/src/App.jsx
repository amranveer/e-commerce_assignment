import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Layout from "../layout/Layout";
import Register from "./pages/Register";
import ProtectedRoute from "./protectedRoutes/ProtectedRoutes";
import ShopPage from "./pages/ShopPage";
import ProductForm from "./pages/ProductForm";
import AdminLayout from "./admincomponents/AdminLayout";
import AdminDashboard from "./adminpages/Dashboard";
import ProductList from "./adminpages/ProductList";
import ProductStock from "./adminpages/ProductStock";
import EditProduct from "./adminpages/EditProduct";
import AddProduct from "./adminpages/AddProduct";

function App() {
  return (
    <div className="scrollbar-hide h-screen overflow-scroll">

    <BrowserRouter >
      


      <Routes>
        
        <Route path="/" element={
          <ProtectedRoute>

          <Layout />
          </ProtectedRoute>
          
          }>
          <Route path="/" index element={<Home />} />
          <Route path="/shop" index element={<ShopPage/>} />
          <Route path="/add" index element={<ProductForm/>} />
          
          <Route path="/product/:id"  element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
        </Route>

         <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard/>} />
        <Route path="products" element={<ProductList />} />
        <Route path="stock" element={<ProductStock />} />
        <Route path="products/edit/:id" element={<EditProduct />} />
        <Route path="products/add" element={<AddProduct />} />
        {/* add other admin routes like favorites, inbox, orders, etc. */}
      </Route>
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
      </Routes>
      
     
    
      
    </BrowserRouter>
    </div>
  ); 
}

export default App;
