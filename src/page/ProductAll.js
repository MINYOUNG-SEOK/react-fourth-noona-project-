import React, { useEffect, useState } from "react";
import ProductCard from "../component/ProductCard";
import "../page/ProductAll.css";
import { useSearchParams } from "react-router-dom";

const ProductAll = () => {
  const [productList, setProductList] = useState([]);
  const [query, setQuery] = useSearchParams();

  const getProducts = async () => {
    let searchQuery = query.get("q") || "";
    console.log("쿼리 값은?", searchQuery);
    let url = `http://localhost:2000/products?q=${searchQuery}`;
    let response = await fetch(url);
    let data = await response.json();
    setProductList(data);
  };

  useEffect(() => {
    getProducts();
  }, [query]);

  return (
    <div className="product-grid">
      {productList.map((menu) => (
        <ProductCard key={menu.id} item={menu} />
      ))}
    </div>
  );
};

export default ProductAll;
