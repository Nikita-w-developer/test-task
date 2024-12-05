import React from "react";
import styles from "./Sort.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setSort } from "../../redux/Slices/productSlice";
const Sort = () => {
  const { property } = useSelector((state) => state.productSlice.sort);

  const dispatch = useDispatch();
  const onClickActice = (props) => {
    dispatch(setSort(props));
  };
  const sortList = [
    { name: "Все товары", property: "all" },
    { name: "Понравилось", property: "liked" },
  ];
  return (
    <div className={styles.sort}>
      <ul className={styles.list}>
        {sortList.map((obj, i) => (
          <li
            key={i}
            onClick={() => onClickActice(obj)}
            className={
              obj.property === property ? styles.active : styles.element
            }
          >
            {obj.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sort;
