import headgearData from "../data/headgear/index";
import clothingData from "../data/clothing/index";
import shoesData from "../data/shoes/index";
import brandList from "../data/master/brands_data.json"
import styles from "./Carousel.module.css";
import { useEffect } from "react";

const masterArray = [headgearData, clothingData, shoesData]

const Carousel = () => {

  const handleMouseDown = (e) => {
    // console.log(`ClientX: ${e.clientX}`);
    // console.log(`ClientY: ${e.clientY}`);
    // console.log(`PageX: ${e.pageX}`);
    // console.log(`PageY: ${e.pageY}`);
  }

  const handleMouseUp = (e) => {

  }

  const handleDrag = (e) => {
    console.log(`ClientX: ${e.clientX}`);
    console.log(`ClientY: ${e.clientY}`);
    console.log(`PageX: ${e.pageX}`);
    console.log(`PageY: ${e.pageY}`);
    console.log(e);
  }

  return (
    <div className={styles.container}>
      <div className={`${styles.empty} ${styles.emptyTL}`}></div>
      <div className={`${styles.empty} ${styles.emptyTR}`}></div>
      <div className={`${styles.empty} ${styles.emptyBL}`}></div>
      <div className={`${styles.empty} ${styles.emptyBR}`}></div>
      <div className={`${styles.top} ${styles.card}`}>
        <img src={masterArray[0]["Annaki"][0].image} alt={masterArray[0]['Annaki'][0].name} />
      </div>
      <div className={`${styles.left} ${styles.card}`}>
        <img src={masterArray[0]["Annaki"][1].image} alt={masterArray[0]['Annaki'][1].name} />
      </div>
      <div draggable className={`${styles.centre} ${styles.card}`} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onDrag={handleDrag}>
        <img draggable={false} src={masterArray[0]["Annaki"][2].image} alt={masterArray[0]['Annaki'][2].name} />
      </div>
      <div className={`${styles.right} ${styles.card}`}>
        <img src={masterArray[0]["Annaki"][3].image} alt={masterArray[0]['Annaki'][3].name} />
      </div>
      <div className={`${styles.bottom} ${styles.card}`}>
        <img src={masterArray[0]["amiibo"][4].image} alt={masterArray[0]['amiibo'][4].name} />
      </div>
    </div>
  )
}

export default Carousel;
