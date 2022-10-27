import React from "react";
import { Link } from "react-router-dom";
import style from "./Dog.module.css";

const Dog = ({ name, image, temps, weight, id }) => {
  return (
    <div className={style.mainContainer}>
      <img src={image} alt="not found" />
      <h2>{name}</h2>
      {temps ? (
        typeof temps === "string" ? (
          <div className={style.tempsContainer}>
            {temps.split(", ").map((t, index) => {
              return <span key={index}>{t}</span>;
            })}
          </div>
        ) : (
          <div className={style.tempsContainer}>
            {temps.map((t, index) => {
              return (
                <span key={index} className={style.temp}>
                  {t.name}
                </span>
              );
            })}
          </div>
        )
      ) : (
        <span>no temps</span>
      )}
      <p>
        <b>weight:</b> {weight}
      </p>
      <br />
      <Link to={`/dog/${id}`} className={style.details}>
        +Details
      </Link>
    </div>
  );
};

export default Dog;
