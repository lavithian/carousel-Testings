import { useState, useEffect, useRef } from "react";
import headgearData from "../data/headgear/index"
import clothingData from "../data/clothing/index"
import shoesData from "../data/shoes/index"
import brandList from "../data/master/brands_data.json"

function useDisplayCardContainer () {
  const [currentBrand, setCurrentBrand] = useState("Annaki") // 4
  const [gearArray, setGearArray] = useState(headgearData)
  const [previousBrand, setPreviousBrand] = useState("SquidForce")
  const [nextBrand, setNextBrand] = useState("Cuttlegear")


  const setArray = () => {
    if (gearArray === headgearData) {
      setGearArray(clothingData)
    } else if (gearArray === clothingData) {
      setGearArray(shoesData)
    } else if (gearArray === shoesData) {
      setGearArray(headgearData)
    } else {
      console.log("Error setting array")
    }
  }


  const modifyBrandName = brandName => {
    let modifiedBrandName = brandName;

    if (brandName === "Z+F") {
      modifiedBrandName = "ZF";
    } else if (brandName === "Krak-On") {
      modifiedBrandName = "KrakOn";
    }

    return modifiedBrandName;
  }

  function getBrandId(brandName) {
    let modifiedBrandName = modifyBrandName(brandName);

    for (const brandObj of brandList) {
      if (brandObj.brand === modifiedBrandName) {
        return brandObj.id;
      }
    }

    return null; // Return null if the brand is not found
  }

  function getBrandNameById(id) {
    for (const brandObj of brandList) {
      if (brandObj.id === id) {
        return brandObj.brand;
      }
    }
    return null; // Return null if the ID is not found
  }

  useEffect(() => {
    const maxBrandID = brandList.length;
    const num = getBrandId(currentBrand)
    const nextID = num + 1 > maxBrandID ? 1 : num + 1
    const prevID = num - 1 < 1 ? maxBrandID : num - 1;
    const nextBrandName = modifyBrandName(getBrandNameById(nextID));
    const prevBrandName = modifyBrandName(getBrandNameById(prevID));
    setNextBrand(nextBrandName)
    setPreviousBrand(prevBrandName)
    console.log("Previous Brand: ", previousBrand);
    console.log("Next Brand: ", nextBrand);
  }, [currentBrand])

  const goToNextBrand = () => {
    const maxBrandID = brandList.length;
    const num = getBrandId(currentBrand);
    const nextID = (num % maxBrandID) + 1;
    const nextBrandName = modifyBrandName(getBrandNameById(nextID));
    setCurrentBrand(nextBrandName);
  }

  const goToPrevBrand = () => {
    const maxBrandID = brandList.length;
    const num = getBrandId(currentBrand);
    const prevID = num === 1 ? maxBrandID : num - 1;
    const prevBrandName = modifyBrandName(getBrandNameById(prevID));
    setCurrentBrand(prevBrandName);
  }

  /* DRAGGING FUNCTIONS*/

  const carouselScroll = useRef(null);
  const cardClick = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startScrollLeft, setStartScrollLeft] = useState(0);
  const [itemList, setItemList] = useState(gearArray[currentBrand])
  const [arrayIndex, setArrayIndex] = useState(0)

  const dragStart = (e) => {
    // console.log("Mouse is down");
    setIsDragging(true);
    setStartX(e.pageX)
    setStartScrollLeft(carouselScroll.current.scrollLeft)
  }

  const dragEnd = (e) => {
    // console.log("Mouse is up");
    setIsDragging(false);
  }

  const dragging = (e) => {
    if (!isDragging) return ;
    // console.log(carouselScroll.current.scrollLeft);
    // console.log(carouselScroll);
    // console.log(e.pageX);
    // const scrollDistance = e.pageX - startX;
    // setArrayIndex((i) => (scrollDistance > 0 ?  i + 1 : i - 1))
    // console.log("Array Index: " + arrayIndex)
    carouselScroll.current.scrollLeft = startScrollLeft - (e.pageX - startX);
    // console.log("Scroll Distance: " + scrollDistance);
    // console.log("Start Scroll Left: " + startScrollLeft);
    // carouselScroll.current.scrollLeft = e.pageX;
    // startX = e.pageX;
    // startScrollLeft = carouselScroll.curren
    e.preventDefault();
      // Handle looping when scrolling beyond the ends
  }

  const dragging2 = (e) => {
    if (!isDragging) return;

    const scrollDistance = e.pageX - startX;
    const totalScrollWidth = carouselScroll.current.scrollWidth;
    const visibleWidth = carouselScroll.current.offsetWidth;

    let newScrollLeft = startScrollLeft - scrollDistance;

    // Loop carousel when scrolling beyond the ends
    if (newScrollLeft < 0) {
      newScrollLeft += totalScrollWidth;
    } else if (newScrollLeft > totalScrollWidth - visibleWidth) {
      newScrollLeft -= totalScrollWidth;
    }

    carouselScroll.current.scrollLeft = newScrollLeft;
  };

  const onCardClick = (e, index) => {
    const cardWidth = cardClick.current.offsetWidth;
    const carouselWidth = carouselScroll.current.offsetWidth;

    const clickedCardLeft = index * cardWidth;
    const halfCarouselWidth = carouselWidth / 2;

    const targetScrollLeft = clickedCardLeft - halfCarouselWidth + cardWidth / 2;

    carouselScroll.current.scrollLeft = targetScrollLeft;

    // console.log(cardClick)
    // console.log("Page X: " + e.pageX)
    // console.log("Card clicked: " + cardClick.current.offsetWidth)
    // console.log("Carousel scroll: " + carouselScroll.current.scrollLeft)
    // console.log("Index: " + index)

  }

  const prepareArray = (array) => {
    console.log(array);
    let newArray = [array[array.length - 2], array[array.length - 1], ...array, array[0], array[1]]
    console.log(newArray);
    return newArray
  }

  useEffect(() => {
    // Your code here will run before the page loads
    // console.log('Component is about to mount');
    setItemList(prepareArray(gearArray[currentBrand]));
    if (carouselScroll.current.scrollLeft === 0) {
      console.log("End of scroll");
    }
    // Return a cleanup function if needed
    return () => {
      console.log('Component will unmount');
    };
  }, []);

  useEffect(() => {
    // Get the width of a single item
    const itemWidth = carouselScroll.current.offsetWidth / itemList.length;

    // Calculate the scroll position of the fifth item
    const scrollPosition = itemWidth * arrayIndex; // we use 4 because arrays are 0-indexed

    // Scroll to the fifth item
    carouselScroll.current.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
  }, [arrayIndex]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;

      const scrollDistance = e.pageX - startX;
      const newScrollLeft = startScrollLeft - scrollDistance;

      carouselScroll.current.scrollLeft = newScrollLeft;
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, startX, startScrollLeft]);

  return { setArray, currentBrand, previousBrand, nextBrand, goToPrevBrand, goToNextBrand,
    dragging, carouselScroll, dragStart, dragEnd, cardClick, onCardClick, itemList
  };
}

export default useDisplayCardContainer;
