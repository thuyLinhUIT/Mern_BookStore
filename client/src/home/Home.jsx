// import React from 'react'
import Banner from "../components/Banner";
import BestSellerBooks from "./BestSellerBooks";
import FavBook from "./FavBook";
import PromoBanner from "./PromoBanner";
import OtherBooks from "./OtherBooks";
import Review from "./Review";
import styles from "../Home.module.css";

const Home = () => {
  return (
    <div className={styles.home}>
      <Banner />
      <BestSellerBooks />
      <FavBook />
      <PromoBanner />
      <OtherBooks />
      <Review />
    </div>
  );
};

export default Home;
