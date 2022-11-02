import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { postDog, getTemps } from "../../redux/actions";
import { validate } from "../utils/validate";
import { uploadImage } from "../utils/uploadImage";
import shadow from "../utils/shadow.png";
import Nav from "../Nav/Nav.jsx";
import style from "./Form.module.css";

const Form = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const allTemps = useSelector((state) => state.temps);
  const error = useSelector((state) => state.error);
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    heightMin: 0,
    heightMax: 0,
    weightMin: 0,
    weightMax: 0,
    life_span: 0,
    temperament: [],
    image: "",
  });

  useEffect(() => {
    dispatch(getTemps());
  }, [dispatch]);

  const handlerInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };
  const handlerChecked = (e) => {
    let index = allTemps.indexOf(e.target.value) + 1;
    if (e.target.checked) {
      setInput({
        ...input,
        [e.target.name]: [...input.temperament, index],
      });
    } else {
      setInput({
        ...input,
        [e.target.name]: input.temperament.filter((t) => t !== index),
      });
    }
  };
  const handlerImage = async (e) => {
    e.preventDefault();
    const url = await uploadImage(e.target.files);
    setInput({
      ...input,
      [e.target.name]: url,
    });
  };
  const handlerSubmit = (e, input) => {
    e.preventDefault();
    if (error.length) {
      alert("Failed to connect to server");
    } else {
      if (input.life_span < 0) alert("Life span must be a greater than 0");
      else if (!input.name) alert("Name is required");
      else if (
        input.heightMin > input.heightMax ||
        input.weightMin > input.weightMax
      )
        alert("Minimum height/weight must be less than maximum");
      else if (!input.heightMin || !input.heightMax)
        alert("Height is required");
      else if (!input.weightMin || !input.weightMax)
        alert("Weight is required");
      else {
        const response = postDog(input);

        if (typeof response.data === "string")
          alert("There is already a breed with that name");
        else {
          alert("Successfully created");
          history.push("/home");
        }
      }
    }
  };

  return (
    <div className={style.mainContainer}>
      <div>
        <Nav />
      </div>
      <div>
        <h1>CREATE YOUR OWN DOG BREED</h1>
        <form
          onSubmit={(e) => handlerSubmit(e, input)}
          className={style.formContainer}
        >
          <div className={style.inputsContainer}>
            <h4>Name</h4>
            <input
              name="name"
              type="text"
              value={input.name}
              onChange={handlerInput}
              className={errors.name && `${style.inputDanger}`}
            />
            {errors.name && <p className={style.danger}>{errors.name}</p>}
          </div>
          <div className={style.inputsContainer}>
            <h4>Image (optional)</h4>
            <input name="image" type="file" onChange={handlerImage} />
          </div>
          <img src={input.image ? input.image : shadow} alt="create" />
          <div className={style.inputsContainer}>
            <h4>Height</h4>
            min:
            <input
              name="heightMin"
              type="number"
              value={input.heightMin}
              onChange={handlerInput}
              className={errors.height && `${style.inputDanger}`}
            />
            max:
            <input
              name="heightMax"
              type="number"
              value={input.heightMax}
              onChange={handlerInput}
              className={errors.height && `${style.inputDanger}`}
            />
            {errors.height && <p className={style.danger}>{errors.height}</p>}
          </div>
          <div className={style.inputsContainer}>
            <h4>Weight</h4>
            min:
            <input
              name="weightMin"
              type="number"
              value={input.weightMin}
              onChange={handlerInput}
              className={errors.weight && `${style.inputDanger}`}
            />
            max:
            <input
              name="weightMax"
              type="number"
              value={input.weightMax}
              onChange={handlerInput}
              className={errors.weight && `${style.inputDanger}`}
            />
            {errors.weight && <p className={style.danger}>{errors.weight}</p>}
          </div>
          <div className={style.inputsContainer}>
            <h4>Life span</h4>
            <input
              name="life_span"
              type="number"
              value={input.life_span}
              onChange={handlerInput}
              className={errors.life_span && `${style.inputDanger}`}
            />
            {errors.life_span && (
              <p className={style.danger}>{errors.life_span}</p>
            )}
          </div>
          <h4>Temperament</h4>
          <div className={style.tempsContainer}>
            {allTemps &&
              allTemps.map((t, index) => {
                return (
                  <div key={index}>
                    {t}&#8594;
                    <input
                      name="temperament"
                      type="checkbox"
                      value={t}
                      onChange={handlerChecked}
                      className={style.checkedBox}
                    />
                  </div>
                );
              })}
          </div>
          <button type="submit" value="Create">
            CREATE
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
