import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getAllDogsByRace } from "../../redux/actions";
import logo from "../utils/logo.png";
import style from "./Nav.module.css";

const Nav = ({ currentPage }) => {
  const [input, setInput] = useState({ race: "" });
  const dispatch = useDispatch();

  const handleInput = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    dispatch(getAllDogsByRace(e.target.value));
    currentPage();
  };

  return (
    <div className={style.mainContainer}>
      <Link to="/home">
        <img src={logo} alt="logo" className={style.logo} />
      </Link>
      <form className={style.search}>
        <input
          name="race"
          type="text"
          placeholder="Search Breed"
          value={input.race}
          onChange={(e) => handleInput(e)}
          className={style.input}
        />
        <img
          src="https://cdn-icons-png.flaticon.com/512/54/54481.png"
          alt="search"
          className={style.icon}
        />
      </form>
      <Link to="/create" className={style.create}>
        Create Breed
      </Link>
    </div>
  );
};

export default Nav;
