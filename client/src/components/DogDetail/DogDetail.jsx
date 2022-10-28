import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDogs, getDogDetail } from "../../redux/actions";
import { useParams, Link } from "react-router-dom";
import Nav from "../Nav/Nav.jsx";
import Loading from "../Loading/Loading";
import shadow from "../utils/shadow.png";
import style from "./DogDetail.module.css";

const DogDetail = () => {
  const { id } = useParams();
  const dog = useSelector((state) => state.dogDetail);
  const allDogs = useSelector((state) => state.dogs);
  const error = useSelector((state) => state.error);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const temp = () => {
    if (typeof dog.temps === "string") {
      return dog.temps.split(", ").shift();
    } else if (Array.isArray(dog.temps)) {
      return dog.temps[0].name;
    }
  };
  const relatedDogs = allDogs?.filter((dog) => {
    if (typeof dog.temps === "string") {
      return dog.temps.includes(temp());
    } else if (Array.isArray(dog.temps)) {
      return dog.temps.map((dog) => dog.name).includes(temp());
    }
  });

  useEffect(() => {
    setLoading(true);
    dispatch(getDogDetail(id));
    dispatch(getAllDogs());
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => {};
  }, [dispatch, id]);

  return (
    <div className={style.mainContainer}>
      <div>
        <Nav />
      </div>

      {loading ? (
        <div>
          <br></br>
          <br></br>
          <Loading />
        </div>
      ) : (
        <div>
          {error.length ? (
            <div className={style.errorContainer}>
              <h1>Failed to connect to server</h1>
            </div>
          ) : (
            <div>
              {typeof dog === "object" ? (
                <div className={style.dogContainer}>
                  <img src={dog.image} alt="not found" />
                  <div className={style.dogDescription}>
                    <h1>{dog.name}</h1>
                    {dog.temps ? (
                      typeof dog.temps === "string" ? (
                        <div className={style.dogTemps}>
                          {dog.temps.split(", ").map((t) => {
                            return <span>{t}</span>;
                          })}
                        </div>
                      ) : (
                        <div className={style.dogTemps}>
                          {dog.temps.map((t) => {
                            return <span key={t.id}>{t.name}</span>;
                          })}
                        </div>
                      )
                    ) : (
                      <p>no temps</p>
                    )}
                    <p>
                      <b>height:</b> {dog.height}
                    </p>
                    <p>
                      <b>weight:</b> {dog.weight} imperial
                    </p>
                    <p>
                      <b>life span:</b> {dog.life_span}
                    </p>
                  </div>
                </div>
              ) : (
                <div className={style.error}>
                  <h1>{dog}</h1>
                  <img src={shadow} alt="shadow" />
                </div>
              )}

              <br />
              <br />
              <br />

              <h2>RELATED BY TEMPERAMENT</h2>
              <div className={style.relationatedContainer}>
                {relatedDogs ? (
                  relatedDogs.slice(0, 5).map((dog) => {
                    return (
                      <div
                        key={dog.id}
                        className={style.relationatedDogContainer}
                      >
                        <Link to={`/dog/${dog.id}`}>
                          <img src={dog.image} alt="dog" />
                        </Link>
                        <h4>{dog.name}</h4>
                      </div>
                    );
                  })
                ) : (
                  <div>not found breed relacionated</div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DogDetail;
