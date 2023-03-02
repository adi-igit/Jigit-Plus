/* eslint-disable @next/next/no-img-element */
import styles from 'styles/Slider.module.scss';

export default function SliderImg({ img1, img2, img3 }) {
  const images = [img1, img2, img3];

  //Using scss for simplicity to achieve slider carousel
  return (
    <>
      {images.map((img, i) => (
        <div key={i} className={styles.sliderImgContainer}>
          <img src={img} alt="" className='w-screen h-screen object-cover' />
        </div>
      ))}
    </>
  );
}
