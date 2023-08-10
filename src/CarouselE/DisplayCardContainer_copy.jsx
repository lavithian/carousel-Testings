import React from "react";
import Slider from "react-slick";
import DisplayCard from "./DisplayCard/DisplayCard";
import styles from "./DisplayCardContainer.module.css"
import "./slick.css";
import "./slick-theme.css";
import useDisplayCardContainer from "./hooks/useDisplayCardContainer";

function DisplayCardContainer() {
  const { setArray, settings, sliderRef, currentArray, currentBrand, currentGear } = useDisplayCardContainer();

  return (
    <div className={styles.displayCardContainer}>
      <div className={styles.logo} style={{backgroundColor: "orange"}}><h1>LOGO</h1></div>
      <div className={styles.previousBrand} style={{backgroundColor: "red"}}>
        PREVIOUS BRAND
      </div>
      <div className={styles.cart} style={{backgroundColor: "lime"}}><h1>CART</h1></div>
      <div className={styles.carousel}>
        {/* {console.log(currentArray[0])} */}
        {console.log(currentArray)}
        {console.log(currentGear["Rockenberg"])}
        {/* {console.log(currentArray[currentBrand])} */}
        <Slider ref={sliderRef} {...settings}>
        {
          currentArray[currentBrand].map((gear, index) => (
            <div key={index} style={{width: "100%", height: "100%"}}>
              <DisplayCard {...gear} />
            </div>
          ))
          // currentArray["Annaki"].map((gear, index) => (
          //   <div key={index}>
          //     <img src={gear.image} alt={gear.name} />
          //   </div>
          // ))
        }
        </Slider>
      </div>
      <div className={styles.searchButton}  style={{backgroundColor: "black", color: "white"}}><h1>SEARCH</h1></div>
      <div className={styles.nextBrand} style={{backgroundColor: "red"}}>
        NEXT BRAND
      </div>
      <div className={styles.changeCategory} style={{backgroundColor: "black", color: "white"}}><h1>CATEGORY</h1></div>
    </div>

  )
}

export default DisplayCardContainer;
