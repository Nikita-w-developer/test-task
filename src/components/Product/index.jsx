import React from "react";
import styles from "./Product.module.scss";
import stylus from "../../assets/img/stylus_24dp_UNDEFINED_FILL0_wght400_GRAD0_opsz24.svg";
import close from "../../assets/img/close_24dp_UNDEFINED_FILL0_wght400_GRAD0_opsz24.svg";
import heart from "../../assets/img/favourite.svg";
import fillLike from "../../assets/img/favourite_fill.svg";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  addFavourite,
  removeItem,
  setCurrentId,
} from "../../redux/Slices/productSlice";
import { setParams } from "../../redux/Slices/editProductSlice";

const Product = ({ id, title, price, thumbnail, imageUrl, description }) => {
  const arrLikes = useSelector((state) => state.productSlice.isLiked);
  const items = useSelector((state) => state.productSlice.items);
  const dispatch = useDispatch();
  const onClickLike = () => {
    dispatch(addFavourite({ id }));
  };
  const onClickRemove = () => {
    dispatch(removeItem({ id }));
  };

  const navigate = useNavigate();
  const idRef = React.useRef();

  React.useEffect(() => {
    const handleClickCard = (event) => {
      if (
        idRef.current.contains(event.target) &&
        !event.target.closest("button")
      ) {
        dispatch(setCurrentId(id));
        navigate(`/test-task/products/${id}`);
      }
    };
    document.body.addEventListener("click", handleClickCard);
    return () => document.body.removeEventListener("click", handleClickCard);
  }, [id, navigate]);
  const handleClickEdit = () => {
    const params = items.filter((obj) => obj.id === id);
    dispatch(setParams(params[0]));
    navigate("/test-task/edit-product");
  };
  return (
    <div ref={idRef} id={id} className={styles.wrapper}>
      <div className={styles.img}>
        <img src={thumbnail || imageUrl} alt="img" />
      </div>
      <div className={styles.buttons}>
        <button onClick={onClickLike}>
          <img
            className="like"
            src={arrLikes.find((obj) => obj.id === id) ? fillLike : heart}
            alt="like"
          />
        </button>
        <button onClick={onClickRemove}>
          <img src={close} alt="x" />
        </button>
        <button onClick={handleClickEdit}>
          <img src={stylus} alt="edit" />
        </button>
      </div>
      <div className={styles.descr}>
        <h5>{title}</h5>
        <p>{price}</p>
      </div>
    </div>
  );
};

export default Product;
