import React from 'react'
import styles from "./Carousel.module.css"

export default function NewBrand() {
  // It should carry the data for the new brand array - i.e. it should just add 1
  const brandIndex = 2;

  const handleDragStart = (e) => {
    e.dataTransfer.setData('brandIndex', brandIndex);
  }

  return (
    <div draggable className={styles.dragme} onDragStart={handleDragStart}>
      DragMe
    </div>
  )
}
