
function Carousel() {
  const { slideLeft, slideRight, currentIndex } = useCarousel();

  return (
    <div className={styles.container}>
      <div className={styles.left} onClick={slideLeft}><h1>{"<"}</h1></div>
      <div className={styles.carousel}>


        {/* Previous */}
        {
          currentIndex === 0
            ? <div className={styles.item} key={shoes[shoes.length - 1].id}>
              <img draggable={false} src={shoes[shoes.length - 1].image} alt={shoes[shoes.length - 1].name} />
            </div>
            : <div className={styles.item} key={shoes[currentIndex - 1].id}>
              <img draggable={false} src={shoes[currentIndex - 1].image} alt={shoes[currentIndex - 1].name} />
            </div>
        }
        {/* Centre piece */}
        <div className={styles.item} key={shoes[currentIndex].id}>
          <img draggable={false} src={shoes[currentIndex].image} alt={shoes[currentIndex].name} />
        </div>
        {/* Next */}
        {
          currentIndex === shoes.length - 1
            ? <div className={styles.item} key={shoes[0].id}>
              <img draggable={false} src={shoes[0].image} alt={shoes[0].name} />
            </div>
            : <div className={styles.item} key={shoes[currentIndex + 1].id}>
              <img draggable={false} src={shoes[currentIndex + 1].image} alt={shoes[currentIndex + 1].name} />
            </div>
        }
      </div>
      <h1 className={styles.right} onClick={(e) => slideRight(e)}>{">"}</h1>
    </div>
  );
}
