/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React, { useState } from 'react';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import styles from 'styles/Slider.module.scss';
import FooterSlider from './FooterSlider';
import SliderImg from './SliderImg';
import SliderVideo from './SliderVideo';

export default function Slider({ myRef }) {
  const [index, setIndex] = useState(0);


  const handleArrow = (direction) => {
    if (direction === 'l') {
      setIndex(index !== 0 ? index - 1 : 2);
    }
    if (direction === 'r') {
      setIndex(index !== 2 ? index + 1 : 0);
    }
  };

  //Using scss for simplicity to achieve slider carousel
  return (
    <div className={styles.slider}>
      <div className={styles.sliderArrowLeft} onClick={() => handleArrow('l')}>
        <SlArrowLeft size={25} />
      </div>
      <Link href="/products">
        <div
          className={styles.sliderImgWrapper}
          style={{ transform: `translateX(${-100 * index}vw)` }}
        >
          <SliderImg
            img1="https://static.zara.net/photos///contents/mkt/spots/ss23-north-man-babar/subhome-xmedia-05//w/1366/IMAGE-landscape-fill-a466b67b-8fe5-4eb6-9823-ae47a5f218f5-default_0.jpg?ts=1675874412334"
            img2="https://static.zara.net/photos///contents/mkt/spots/ss23-north-woman-new/subhome-xmedia-04//w/1366/IMAGE-landscape-fill-424b239d-b7ed-4952-b7f7-24ea93018a36-default_0.jpg?ts=1674760988021"
            img3="https://static.zara.net/photos///contents/mkt/spots/ss23-north-kids-boy/subhome-xmedia-03//w/1366/IMAGE-landscape-default-fill-8d1fb97a-8bb0-4a6f-ad28-f9707e754219-default_0.jpg?ts=1674058479493"
          />
        </div>
      </Link>
      <Link href="/products">
        <div
          className={styles.sliderImgWrapper}
          style={{ transform: `translateX(${-100 * index}vw)` }}
        >
          <SliderImg
            img1="https://static.zara.net/photos///contents/mkt/spots/ss23-north-man-jeans/subhome-xmedia-05//w/1366/IMAGE-landscape-fill-422c110f-3ef2-44e1-8877-8d8a187b6daf-default_0.jpg?ts=1675687361617"
            img2="https://static.zara.net/photos///contents/mkt/spots/ss23-north-woman-shirts/subhome-xmedia-04//w/1366/IMAGE-landscape-fill-2bc0e8ee-1ff8-4f1e-aec9-58c6477a92f0-default_0.jpg?ts=1674654767537"
            img3="https://static.zara.net/photos///contents/mkt/spots/ss23-north-kids-girl/subhome-xmedia-03//w/1366/IMAGE-landscape-default-fill-8e18751e-aeee-4dc5-aeb0-f6d68b3fe23a-default_0.jpg?ts=1674057918162"
          />
        </div>
      </Link>
      <Link href="/products">
        <div
          className={styles.sliderVideoWrapper}
          style={{ transform: `translateX(${-100 * index}vw)` }}
        >
          <SliderVideo
            vid1="/assets/vidman1.mp4"
            vid2="/assets/vidwoman1.mp4"
            vid3="/assets/vidkids1.mp4"
          />
        </div>
      </Link>
      <Link href="/products">
        <div
          className={styles.sliderImgWrapper}
          style={{ transform: `translateX(${-100 * index}vw)` }}
        >
          <SliderImg
            img1="https://static.zara.net/photos///contents/mkt/spots/ss23-north-man-edition/subhome-xmedia-03//w/1366/IMAGE-landscape-fill-b2f388b6-ff7e-4aab-b795-36f62da866d3-default_0.jpg?ts=1674052953755"
            img2="https://static.zara.net/photos///contents/mkt/spots/ss23-north-woman-shoes-bags/subhome-xmedia-04-2//w/1366/IMAGE-landscape-fill-901cba22-2078-4b61-8127-e1dca523c3f9-default_0.jpg?ts=1674654076606"
            img3="https://static.zara.net/photos///contents/mkt/spots/ss23-north-kids-babygirl/subhome-xmedia-03//w/1366/IMAGE-landscape-default-fill-ab668a58-519f-4e7c-86ae-6f7f32d4c511-default_0.jpg?ts=1674064214579"
          />
        </div>
      </Link>
      <Link href="/products">
        <div
          className={styles.sliderVideoWrapper}
          style={{ transform: `translateX(${-100 * index}vw)` }}
        >
          <SliderVideo
            vid1="/assets/vidman2.mp4"
            vid2="/assets/vidwoman2.mp4"
            vid3="/assets/vidkids2.mp4"
          />
        </div>
      </Link>
      <Link href="/products">
        <div
          className={styles.sliderImgWrapper}
          style={{ transform: `translateX(${-100 * index}vw)` }}
        >
          <SliderImg
            img1="https://static.zara.net/photos///contents/mkt/spots/aw22-sale/subhome-xmedia-launch-man//SVG-landscape-fill-66a75652-22f2-430e-a113-434d1941129d-en_GB@WW.svg?ts=1673720928390"
            img2="https://static.zara.net/photos///contents/mkt/spots/ss23-north-man-joinlife/subhome-xmedia-03//w/1366/IMAGE-landscape-fill-289e5fad-8dda-4413-a624-945f5eb3cc77-default_0.jpg?ts=1674064160089"
            img3="https://static.zara.net/photos///contents/mkt/spots/ss23-north-kids-babyboy/subhome-xmedia-03//w/1366/IMAGE-landscape-default-fill-fff099d7-2902-4a70-96a4-6911529b87c9-default_0.jpg?ts=1674059150089"
          />
        </div>
      </Link>
      <div className={styles.sliderArrowRight} onClick={() => handleArrow('r')}>
        <SlArrowRight size={25} />
      </div>
      <div ref={myRef} className={styles.sliderFooter}>
        <FooterSlider />
      </div>
    </div>
  );
}
