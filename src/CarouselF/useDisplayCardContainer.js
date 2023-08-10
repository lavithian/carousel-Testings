import { useState, useEffect } from "react";
import headgearData from "../../../data/headgear/index"
import clothingData from "../../../data/clothing/index"
import shoesData from "../../../data/shoes/index"
import brandList from "../../../data/master/brands_data.json"

function useDisplayCardContainer () {
  const [currentIndex, setCurrentIndex] = useState(0)
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

  const goToPrevious = () => {
    // const newCardIndex = currentIndex === 0 ? gearArray[currentBrand].length - 1 : currentIndex - 1;
    // setCurrentIndex(newCardIndex);
    const newCardIndex = (currentIndex - 1 + gearArray[currentBrand].length) % gearArray[currentBrand].length;
    setCurrentIndex(newCardIndex);
  }

  const goToNext = () => {
    // const newCardIndex = currentIndex === gearArray[currentBrand].length - 1 ? 0 : currentIndex + 1;
    // setCurrentIndex(newCardIndex);
    const newCardIndex = (currentIndex + 1) % gearArray[currentBrand].length;
    setCurrentIndex(newCardIndex);
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

  // const goToPrevBrand = () => {
  //   setNextBrand(currentBrand)
  //   setCurrentBrand(previousBrand)
  //   const maxBrandID = brandList.length;
  //   const num = getBrandId(currentBrand)
  //   const brandID = num - 1 < 0 ? maxBrandID : num - 1;
  //   const newPrevBrand = getBrandNameById(brandID);
  //   setPreviousBrand(newPrevBrand)
  //   console.log(brandID)
  //   console.log(newPrevBrand)
  //   console.log(previousBrand)
  //   console.log(currentBrand)
  //   console.log(nextBrand)
  // }

  // const goToNextBrand = () => {
  //   setPreviousBrand(currentBrand)
  //   setCurrentBrand(nextBrand)
  //   const num = getBrandId(currentBrand) + 1
  //   const maxBrandID = brandList.length;
  //   const brandID = num + 1 > maxBrandID ? 1 : num + 1
  //   const newNextBrand = getBrandNameById(brandID);
  //   setNextBrand(newNextBrand)
  //   console.log(brandID)
  //   console.log(newNextBrand)
  //   console.log(previousBrand)
  //   console.log(currentBrand)
  //   console.log(nextBrand)
  // }



  // const goToNextBrand = () => {
  //   setPreviousBrand(currentBrand)
  //   const tempCurrentBrand = nextBrand; // temporary variable
  //   setCurrentBrand(tempCurrentBrand)
  //   const maxBrandID = brandList.length;
  //   const num = getBrandId(nextBrand) // use the temporary variable
  //   const brandID = num + 1 > maxBrandID ? 1 : num + 1
  //   const newNextBrand = getBrandNameById(brandID);
  //   setNextBrand(newNextBrand)
  //   console.log(brandID)
  //   console.log(newNextBrand)
  //   console.log(previousBrand)
  //   console.log(tempCurrentBrand)
  //   console.log(nextBrand)
  // }

  // const goToPrevBrand = () => {
  //   setNextBrand(currentBrand)
  //   const tempCurrentBrand = previousBrand; // temporary variable
  //   setCurrentBrand(tempCurrentBrand)
  //   const maxBrandID = brandList.length;
  //   const num = getBrandId(previousBrand) // use the temporary variable
  //   const brandID = num - 1 < 0 ? maxBrandID : num - 1;
  //   const newPrevBrand = getBrandNameById(brandID);
  //   setPreviousBrand(newPrevBrand)
  //   console.log(brandID)
  //   console.log(newPrevBrand)
  //   console.log(previousBrand)
  //   console.log(tempCurrentBrand)
  //   console.log(nextBrand)
  // }



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
    setCurrentBrand(nextBrand)
  }

  const goToPrevBrand = () => {
    setCurrentBrand(previousBrand)
  }


  return { setArray, gearArray, currentBrand, currentIndex, previousBrand, nextBrand, goToNext, goToPrevious, goToPrevBrand, goToNextBrand};
}

export default useDisplayCardContainer;
