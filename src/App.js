import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import './App.css';
import Products from "./pages/Products";
import CreateProduct from "./pages/CreateProduct";
import Layout from "./layouts/Layout";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="create" element={<CreateProduct />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


