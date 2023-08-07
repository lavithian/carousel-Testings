import React, { Component, useState } from 'react';
import Slider from "react-slick";
import styles from './Carousel.module.css';
import "./slick.css";
import "./slick-theme.css";
import shoesK from "../shoes_Kensa.json";
import shoesA from "../shoes_Annaki.json";
import shoesB from "../shoes_Barazushi.json";
import shoesR from "../shoes_Rockenberg.json";
import hatsA from "../headgear_Annaki.json";
import clothingA from "../clothing_Cuttlegear.json";

class Carousel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      shoesArray: [shoesA, shoesB, shoesK, shoesR, hatsA, clothingA],
      currentArray: 0,
      // slideIndex: this.slide,
      slideIndex: 0
    }
  }

  state = {
    slideIndex: 0,
  };

  wikiLink(item) {
    return `https://splatoonwiki.org/wiki/${item}`
  }

  goToNextArray() {
    this.setState((prevState) => ({ currentArray: prevState.currentArray + 1 >= this.state.shoesArray.length ? 0 : prevState.currentArray + 1, slideIndex: 0 }))
    console.log(this.state.currentArray)
    console.log(this.state.shoesArray[this.state.currentArray])
  }

  goToPrevArray () {
    this.setState((prevState) => ({ currentArray: prevState.currentArray - 1 < 0 ? this.state.shoesArray.length - 1 : prevState.currentArray - 1, slideIndex: 0 }))
    console.log(this.state.currentArray)
    console.log(this.state.shoesArray[this.state.currentArray])
  }

  render() {
    const { shoesArray, currentArray, slideIndex } = this.state;
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      centerMode: true,
      focusOnSelect: true,
      // centerPadding: "1rem",
      // vertical: true,
      // verticalSwiping: true,
      // verticalScrolling: true,
      afterChange: () =>
        this.setState(state => ({})),
      beforeChange: (index) => this.setState({ slideIndex: index })
    };

    const uniqueKey = `${currentArray}-${slideIndex}`;

    return (
      <>
        <button className={`${styles.button} ${styles.next}`} onClick={() => this.goToNextArray()}>Next</button>
        <button className={`${styles.button} ${styles.prev}`} onClick={() => this.goToPrevArray()}>Previous</button>
        <div className={styles.container}>
          <Slider key={uniqueKey} ref={slider => (this.slider = slider)} {...settings}>
            {
              shoesArray[currentArray].map((shoe, index) => (
                // <div key={index} className={styles.slide}>
                //   {/* <a href={this.wikiLink(shoe.name)} target="_blank" rel="noopener noreferrer"> */}
                //   {<img src={shoe.image} alt={shoe.name} }/>
                //   {/* </a> */}
                // </div>
                <div key={shoe.id}>
                  <img src={shoe.image} alt={shoe.name} />
                </div>
              ))
            }
          </Slider>
        </div>
        <input className={styles.inputBox} type="number" onChange={e => this.slider.slickGoTo(e.target.value)} value={this.state.slideIndex} />
      </>
    );
  }
}

export default Carousel;
