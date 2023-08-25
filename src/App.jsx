import React, { useState } from "react";
import Carousel from "./CarouselG/Carousel";
// import NewBrand from "./CarouselD/NewBrand";

function App() {
  // const [newArrayIndex, setNewArrayIndex] = useState(null);

  return (
    <div style={{display: "flex", alignItems: "center", justifyContent: "center", width: "100vw", height: "100vh"}}>
      {/* <div> */}
      {/* <NewBrand/> */}
      <Carousel />
    </div>
  )
}

export default App;
