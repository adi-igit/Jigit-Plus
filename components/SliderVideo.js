import styles from 'styles/Slider.module.scss';

export default function SliderVideo({ vid1, vid2, vid3 }) {
  const videos = [vid1, vid2, vid3];

  //Using scss for simplicity to achieve slider carousel
  return (
    <>
      {videos.map((video, i) => (
        <div key={i} className={styles.sliderVideoContainer}>
          <video src={video} autoPlay muted loop />
        </div>
      ))}
    </>
  );
}
