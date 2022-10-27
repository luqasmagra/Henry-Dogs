import React from "react";
import { Link } from "react-router-dom";
import video from "../utils/backgroundVideo.mp4";
import logo from "../utils/logo.png";
import style from "./Landing.module.css";

const Landing = () => {
  return (
    <div>
      <video autoPlay loop muted id={style.myVideo}>
        <source src={video} type="video/mp4" />
      </video>
      <div className={style.mainContainer}>
        <h1>welcome to Henry Dogs</h1>
        <Link to="/home">
          <img src={logo} alt="logo" />
        </Link>
        <h2>your application to explore dog breeds and create your own</h2>
      </div>
    </div>
  );
};

export default Landing;
