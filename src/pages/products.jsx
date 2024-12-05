import React from "react";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct, setSearchValue } from "../redux/Slices/productSlice";
import Sort from "../components/Sort";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

const Products = () => {
  const { items, isLiked, sort, searchValue } = useSelector(
    (state) => state.productSlice
  );
  const formData = useSelector((state) => state.newProductSlice);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = React.useState(0);
  const [itemsPerPage] = React.useState(12);
  const getItems = async () => {
    dispatch(fetchProduct());
  };
  React.useEffect(() => {
    localStorage.setItem("productItems", JSON.stringify(items));
  }, [items]);

  React.useEffect(() => {
    if (!items || items.length === 0) {
      getItems();
    }
  }, []);
  const filteredItems = items.filter((obj) =>
    obj.title.toLowerCase().includes(searchValue.toLowerCase())
  );
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const cards = currentItems.map((item) => (
    <Product
      key={item.id}
      id={item.id}
      title={item.title}
      price={item.price}
      thumbnail={item.thumbnail}
      imageUrl={item.imageUrl}
    />
  ));
  const pageCount = Math.ceil(filteredItems.length / itemsPerPage);

  return (
    <div>
      <div className="header">
        <Sort />
        <div className="search-product">
          <input
            value={searchValue}
            onChange={(event) => dispatch(setSearchValue(event.target.value))}
            className="search-product__input"
            placeholder="Поиск товара..."
            type="text"
          />
        </div>
        <Link to={"/test-task/create-product/"}>
          <button>Создать карточку</button>
        </Link>
      </div>
      {sort.property === "all" && (
        <div className="product_wrapper">
          {items.length > 0 ? cards : <span>Loading data</span>}
        </div>
      )}
      {sort.property === "liked" && (
        <div className="product_wrapper">
          {isLiked.length > 0 ? (
            isLiked.map((obj) => (
              <Product
                key={obj.id}
                {...items.find((item) => item.id === obj.id)}
                imageUrl={formData.imageUrl}
              />
            ))
          ) : (
            <span>Вы еще ничего не добавили</span>
          )}
        </div>
      )}
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        pageCount={pageCount}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        activeClassName={"active"}
        breakLabel={"..."}
        pageRangeDisplayed={pageCount > 5 ? 5 : pageCount}
      />
    </div>
  );
};

export default Products;
