import React from "react";
import DisplayCard from "./DisplayCard/DisplayCard";
import styles from "./DisplayCardContainer.module.scss";
import useDisplayCardContainer from "./useDisplayCardContainer";

function Carousel() {
  const { setArray, currentBrand, goToPrevBrand, goToNextBrand,
    dragging, carouselScroll, dragStart, dragEnd, cardClick, onCardClick, itemList, isDragging
  } = useDisplayCardContainer();


  // useEffect(() => {
  //   console.log('Updated nextBrand:', nextBrand);
  // }, [nextBrand]);

  // useEffect(() => {
  //   console.log('Updated previousBrand:', previousBrand);
  // }, [previousBrand]);


  return (
    <div className={styles.displayCardContainer}>
      {/* <ul className={`${styles.carousel}`} ref={carouselScroll} onMouseMove={dragging} onMouseDown={dragStart} onMouseUp={dragEnd}> */}
      {/* <ul className={styles.carousel} ref={carouselScroll}> */}
      <ul className={`${styles.carousel}`} style={!isDragging ? { scrollSnapType: "x mandatory", scrollBehavior: "smooth", scrollSnapAlign: "start"} : {}} ref={carouselScroll} onMouseMove={dragging} onMouseDown={dragStart} onMouseUp={dragEnd}>

      {
        itemList.map((array, index) => (
          <li key={index} className={styles.card} ref={cardClick} onClick={(e) => onCardClick(e, index)}>
            <DisplayCard {...array}/>
            {/* <DisplayCard {...itemList[index % itemList.length]}/> */}
          </li>
        ))
      }
      </ul>
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
