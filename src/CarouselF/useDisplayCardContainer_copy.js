import { useRef, useState } from "react";
import headgearData from "../../../data/headgear/index"
import clothingData from "../../../data/clothing/index"
import shoesData from "../../../data/shoes/index"

function useDisplayCardContainer () {
  const [currentGear, setCurrentGear] = useState(headgearData)
  const [currentBrand, setCurrentBrand] = useState("Annaki")
  const [currentArray, setCurrentArray] = useState(headgearData)

  const sliderRef = useRef(null)

  const setArray = () => {
    // console.log(masterArray[categoryArray])
    // console.log(masterArray[0])

    // setCurrentArray(newArray)
    // if (categoryArray === "headgear") {
    //   setCurrentArray(headgearData)
    // } else if (categoryArray === "clothing") {
    //   setCurrentArray(clothingData)
    // } else if (categoryArray === "shoes") {
    //   setCurrentArray(shoesData)
    // } else {
    //   throw new Error("Wrong Gear category");
    // }
    // setCurrentArray(masterArray[0][0])
  }

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

  return { setArray, settings, sliderRef, currentArray, currentBrand, currentGear};
}

export default useDisplayCardContainer;
