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
  const [query] = useSearchParams(); // 쿼리 파라미터 가져오기

  console.log(query.get("q")); // 검색어 출력

  useEffect(() => {
    // JSON 데이터를 로드하는 부분
    fetch("http://localhost:5005/products")
      .then((response) => response.json())
      .then((data) => {
        setProductList(data); // 전체 데이터 설정
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    const searchQuery = query.get("q"); // 쿼리 파라미터에서 검색어 가져오기

    if (searchQuery) {
      const filtered = productList.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered); // 필터링된 결과를 상태로 설정
    } else {
      setFilteredProducts(productList); // 검색어가 없을 경우 전체 리스트를 보여줌
    }
  }, [query, productList]); // 검색어(query)나 전체 데이터(productList)가 변경될 때마다 실행

  const sliderSettings = {
    dots: true,
    infinite: true, // 마지막에서 첫 번째로 부드럽게 연결
    speed: 300, // 슬라이드 전환 속도
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500, // 자동 슬라이드 속도
    cssEase: "linear", // 전환 애니메이션을 선형으로 변경하여 더 부드럽게 전환
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
              <img src={slide.img} alt={`Slide ${index}`} />
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
