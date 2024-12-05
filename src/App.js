import { useSelector } from "react-redux";
import ProductInfo from "./pages/productInfo";
import Products from "./pages/products";
import ProductCreation from "./pages/productCreation";
import "./scss/app.scss";
import { Routes, Route } from "react-router-dom";
import ProductEditing from "./pages/productEditing";
function App() {
  const i = useSelector((state) => state.productSlice.currentId);

  return (
    <div className="app">
      <Routes>
        <Route path={"test-task/products"} element={<Products />}></Route>
        <Route
          path={`test-task/products/${i}`}
          element={<ProductInfo i={i} />}
        ></Route>
        <Route
          path={"test-task/create-product"}
          element={<ProductCreation />}
        ></Route>
        <Route
          path={"test-task/edit-product"}
          element={<ProductEditing />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
