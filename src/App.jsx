import React, { useState } from "react";
import Carousel from "./CarouselC/Carousel";
import NewBrand from "./CarouselC/NewBrand";

function App() {
  // const [newArrayIndex, setNewArrayIndex] = useState(null);

  return (
    <div>
      <NewBrand/>
      <Carousel />
    </div>
  )
}

export default App;
