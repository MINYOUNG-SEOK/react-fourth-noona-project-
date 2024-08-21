import React, { useEffect, useState } from "react";
import ProductCard from "../component/ProductCard";
import "../page/ProductAll.css";
import { useSearchParams } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const ProductAll = () => {
  const [productList, setProductList] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [query] = useSearchParams();

  console.log(query.get("q"));

  useEffect(() => {
    fetch(
      "https://my-json-server.typicode.com/MINYOUNG-SEOK/react-fourth-noona-project-/products"
    )
      .then((response) => response.json())
      .then((data) => {
        setProductList(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    const searchQuery = query.get("q");

    if (searchQuery) {
      const filtered = productList.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(productList);
    }
  }, [query, productList]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    cssEase: "linear",
  };

  const slides = [
    {
      img: "https://image.hm.com/content/dam/global_campaigns/season_00/home/7000b/7000B-1x1-lego-hm-home-collection-kids-room-decor.jpg?imwidth=1536",
      text: "New Kids Room",
    },
    {
      img: "https://image.hm.com/content/dam/global_campaigns/season_00/ladies/ws40h/WS40H_1x1-1.jpg?imwidth=1536",
      text: "Vintage Blue & Decoration details",
    },
    {
      img: "https://image.hm.com/content/dam/global_campaigns/season_00/kids/4080n/4080N-1x1-1-refined-playful.jpg?imwidth=1536",
      text: "F/W 2024 Kids Style",
    },
  ];
  return (
    <div>
      <div className="homepage-slider">
        <Slider {...sliderSettings}>
          {slides.map((slide, index) => (
            <div key={index} className="slide">
              <img src={slide.img} alt={slide.img} />
              <div className="slide-text">
                <h2>{slide.text}</h2>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <div className="product-grid">
        {filteredProducts.map((menu) => (
          <ProductCard key={menu.id} item={menu} />
        ))}
      </div>
    </div>
  );
};

export default ProductAll;
