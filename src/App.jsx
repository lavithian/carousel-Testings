import React, { useState } from "react";
import Carousel from "./CarouselB/Carousel";
import NewBrand from "./CarouselB/NewBrand";

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
