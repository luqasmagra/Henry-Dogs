import React from "react";
import loading from "../utils/loading.png";
import style from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={style.mainContainer}>
      <img src={loading} alt="loading" className={style.spinner} />
    </div>
  );
};

export default Loading;
