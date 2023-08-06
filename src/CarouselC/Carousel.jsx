import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import styles from "./Carousel.module.css";
import "./slick.css";
import "./slick-theme.css";
import shoesK from "../shoes_Kensa.json";
import shoesA from "../shoes_Annaki.json";
import shoesB from "../shoes_Barazushi.json";
import shoesR from "../shoes_Rockenberg.json";
import hatsA from "../headgear_Annaki.json";
import clothingA from "../clothing_Cuttlegear.json";

const Carousel = () => {
  const arrayList = [shoesA, shoesB, shoesK, shoesR, hatsA, clothingA];
  const [currentArray, setCurrentArray] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [newIndex, setNewIndex] = useState(0);

  const sliderRef = useRef(null);
  const carouselRef = useRef(null);

  const wikiLink = (item) => {
    return `https://splatoonwiki.org/wiki/${item}`;
  };

  const goToNextArray = () => {
    setCurrentArray((prevState) =>
      prevState === arrayList.length - 1 ? 0 : prevState + 1
    );
  };

  const goToPrevArray = () => {
    setCurrentArray((prevState) =>
      prevState === 0 ? arrayList.length - 1 : prevState - 1
    );
    // setSlideIndex(0);
    // setSliderKey(prevKey => prevKey + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // const inputValue = parseInt(e.target.value, 10);
    let inputValue;
    if (newIndex === "") {
      inputValue = 0;
    } else {
      inputValue = newIndex;
    }
    console.log(inputValue);
    if (
      sliderRef.current &&
      inputValue >= 0 &&
      inputValue < arrayList[currentArray].length
    ) {
      setCurrentSlide(inputValue);
      sliderRef.current.slickGoTo(inputValue);
    }
  };

  const handleInputChange = (e) => {
    // const inputValue = parseInt(e.target.value, 10);
    if (e.target.value === "") {
      setNewIndex("");
    } else {
      setNewIndex(parseInt(e.target.value, 10));
    }
    // console.log(inputValue);
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    focusOnSelect: true,
    // afterChange: () => setUpdateCount(prevCount => prevCount + 1),
    // beforeChange: (current, next) => setCurrentSlide(next)
  };

  const settings2 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    focusOnSelect: true,
    // afterChange: () => setUpdateCount(prevCount => prevCount + 1),
    // beforeChange: (current, next) => setCurrentSlide(next)
  };


  return (
    <>
      <button
        className={`${styles.button} ${styles.next}`}
        onClick={goToNextArray}
      >
        Next
      </button>
      <button
        className={`${styles.button} ${styles.prev}`}
        onClick={goToPrevArray}
      >
        Previous
      </button>
      <div className={styles.container} ref={carouselRef}>
        {/* <Slider ref={sliderRef} {...settings}>
          {arrayList[0].length &&
            arrayList[0].map((shoe, index) => (
              <div key={shoe.id}>
                <img src={shoe.image} alt={shoe.name} />
              </div>
            ))}
        </Slider> */}
        <Slider ref={sliderRef} {...settings2}>
          {
            arrayList.map((shoeArray) => (
              <div key={shoeArray[0].id}>
                <img src={shoeArray[0].image} alt={shoeArray[0].name} />
              </div>
            ))
          }
        </Slider>

      </div>
      <form onSubmit={handleSubmit}>
        <input
          className={styles.inputBox}
          type="text"
          value={newIndex}
          onChange={handleInputChange}
        />
        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
    </>
  );
};

export default Carousel;
