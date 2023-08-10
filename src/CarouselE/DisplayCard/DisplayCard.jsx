import React from "react";
import styles from "./DisplayCard.module.css"
import useDisplayCard from "./hooks/useDisplayCard"
import { Link, Navigate, NavLink } from "react-router-dom";

function DisplayCard ({ id, category, name, brand, price, ability, image, description }) {
  const dataToSend = { id, category, name, brand, price, ability, image, description }
  return (
    <div className={styles.displayCard}>
      <div className={styles.displayCategory}><h3>{category}</h3></div>
      <div className={styles.displayName}><h1>{name.replace(/\_/g, ' ')}</h1></div>
      <div className={styles.displayBrand}><h2>{brand}</h2></div>
      <div className={styles.displayImage}>
        <Link to={`/${category}/${id}`} state={dataToSend}>
          <img src={image} alt={name} className={styles.displayImage} />
        </Link>
      </div>
      <div className={price > 0 ? styles.displayPrice : styles.displaySoldOutPrice}>
      {price > 0 ? price : "SOLD OUT!"}
      </div>
      <div className={styles.displayButton}>
        <label className={styles.switch}>
          <input type="checkbox"></input>
          <span className={styles.slider}></span>
        </label>
      </div>
    </div>
  );
};

// Gear type
// Gear name
// brand
// price
// Picture

export default DisplayCard
