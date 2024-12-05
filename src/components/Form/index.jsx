import React from "react";
import styles from "./Form.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setForm, incrementId } from "../../redux/Slices/newProductSlice";
import { setNewItem } from "../../redux/Slices/productSlice";
import { useNavigate } from "react-router-dom";

const ProductForm = ({ onSubmit }) => {
  const formData = useSelector((state) => state.newProductSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  React.useEffect(() => {
    const savedFormData =
      JSON.parse(localStorage.getItem("productFormArray")) || [];
    if (savedFormData.length > 0) {
      dispatch(setForm(savedFormData[savedFormData.length - 1]));
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch(setForm({ ...formData, [name]: value }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch(setForm({ ...formData, imageUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSaveCard();
    if (onSubmit) onSubmit(formData);
  };
  const handleSaveCard = () => {
    dispatch(incrementId());
    const products = JSON.parse(localStorage.getItem("productFormArray")) || [];
    const updatedFormData = { ...formData, id: formData.id };
    products.push(updatedFormData);
    localStorage.setItem("productFormArray", JSON.stringify(products));
    dispatch(setNewItem(formData));
  };

  return (
    <div className={styles.wrapper}>
      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: "400px", margin: "0 auto" }}
      >
        <div>
          <label>
            <input
              placeholder="Название товара:"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            <input
              placeholder="Цена:"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            <textarea
              placeholder="Описание:"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              required
            />
          </label>
        </div>
        <div>
          <label>
            Картинка:
            <input
              className={styles.lastInput}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
          </label>
        </div>
        <button type="submit">Сохранить</button>
      </form>
      <button onClick={() => navigate("/test-task/products")}>🔙</button>
    </div>
  );
};

export default ProductForm;
