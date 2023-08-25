import React, { useEffect } from "react";
import DisplayCard from "./DisplayCard/DisplayCard";
import styles from "./DisplayCardContainer.module.css";
import useDisplayCardContainer from "./useDisplayCardContainer";

function Carousel() {
  const { setArray, gearArray, currentBrand, currentIndex, previousBrand, nextBrand, goToNext, goToPrevious, goToPrevBrand, goToNextBrand} = useDisplayCardContainer();


  // useEffect(() => {
  //   console.log('Updated nextBrand:', nextBrand);
  // }, [nextBrand]);

  // useEffect(() => {
  //   console.log('Updated previousBrand:', previousBrand);
  // }, [previousBrand]);

  return (
    <div className={styles.displayCardContainer}>
      <div className={styles.logo} style={{backgroundColor: "orange"}}><h1>LOGO</h1></div>
      <div className={styles.previousItem} onClick={goToPrevious}>
        {
          currentIndex === 0
            ? <DisplayCard key={gearArray[currentBrand][gearArray[currentBrand].length - 1].name} {...gearArray[currentBrand][gearArray[currentBrand].length - 1]} />
            : <DisplayCard key={gearArray[currentBrand][currentIndex - 1].name} {...gearArray[currentBrand][currentIndex - 1]}/>
        }
      </div>
      <div className={styles.cart} style={{backgroundColor: "lime"}}><h1>CART</h1></div>
      <div className={styles.previousBrand} onClick={goToPrevBrand}>
        <DisplayCard key={gearArray[previousBrand][0].name} {...gearArray[previousBrand][0]} />
      </div>
      <div className={styles.centrePiece}><DisplayCard key={gearArray[currentBrand][currentIndex].name} {...gearArray[currentBrand][currentIndex]} /></div>
      <div className={styles.nextBrand} onClick={goToNextBrand}>
        <DisplayCard key={gearArray[nextBrand][0].name} {...gearArray[nextBrand][0]} />
      </div>
      <div className={styles.searchButton}  style={{backgroundColor: "black", color: "white"}}><h1>SEARCH</h1></div>
      <div className={styles.nextItem} onClick={goToNext}>
        {console.log(gearArray[currentBrand][0])}
        {
          currentIndex === gearArray[currentBrand].length - 1
            ? <DisplayCard key={gearArray[currentBrand][0].name} {...gearArray[currentBrand][0]} />
            : <DisplayCard key={gearArray[currentBrand][currentIndex + 1].name} {...gearArray[currentBrand][currentIndex + 1]} />
        }
      </div>
      <div className={styles.categorySwitch} style={{backgroundColor: "black", color: "white"}} onClick={setArray}><h1>CATEGORY</h1></div>
    </div>

  )
}

export default Carousel;

// array[][].name
// headgear[brand][item].name
// clothing[brand][item]
// click to change category
// up and down change brand
// left and right change item
