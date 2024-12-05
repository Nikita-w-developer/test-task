import React from "react";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../redux/Slices/productSlice";
import { Link } from "react-router-dom";

const ProductInfo = ({ i }) => {
  const items = useSelector((state) => state.productSlice.items);
  const dispatch = useDispatch();
  const getItems = async () => {
    dispatch(fetchProduct());
  };
  React.useEffect(() => {
    if (!items || items.length === 0) {
      getItems();
    }
  }, []);
  React.useEffect(() => {
    localStorage.setItem("productItems", JSON.stringify(items));
  }, [items]);
  const item = items.find((obj) => obj.id === i);
  return (
    <div>
      <div className="info_wrapper">
        <Product {...item} />
        <div className="description">
          <h3>{item.description}</h3>
        </div>
      </div>
      <div className="go-to-back">
        <Link to={"/test-task/products"}>
          <button>Вернуться назад</button>
        </Link>
      </div>
    </div>
  );
};

export default ProductInfo;
