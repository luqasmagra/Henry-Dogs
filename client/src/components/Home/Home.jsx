import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDogs,
  getTemps,
  filterDogsByTemps,
  filterDogsBySource,
  orderDogsByName,
  orderDogsByWeight,
} from "../../redux/actions";
import shadow from "../utils/shadow.png";
import style from "./Home.module.css";
import Nav from "../Nav/Nav";
import Dog from "../Dog/Dog";
import Paginated from "./Paginated";
import Loading from "../Loading/Loading";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const allTemps = useSelector((state) => state.temps);
  const error = useSelector((state) => state.error);
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage] = useState(8);
  const indexLastDog = currentPage * dogsPerPage;
  const indexFirstDog = indexLastDog - dogsPerPage;
  const currentDogs = allDogs?.slice(indexFirstDog, indexLastDog);

  const paginated = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const pageNumber = Math.ceil(allDogs.length / dogsPerPage);
  const nextPage = () => {
    if (pageNumber !== currentPage) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleFilterTemps = (e) => {
    e.preventDefault();
    dispatch(filterDogsByTemps(e.target.value));
    setCurrentPage(1);
  };

  const handleFilterSource = (e) => {
    e.preventDefault();
    dispatch(filterDogsBySource(e.target.value));
    setCurrentPage(1);
  };

  const handleOrderByName = (e) => {
    e.preventDefault();
    dispatch(orderDogsByName(e.target.value));
    setCurrentPage(1);
  };

  const handleOrderByWeight = (e) => {
    e.preventDefault();
    dispatch(orderDogsByWeight(e.target.value));
    setCurrentPage(1);
  };

  useEffect(() => {
    setLoading(true);
    dispatch(getAllDogs());
    dispatch(getTemps());
    setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => {};
  }, [dispatch]);

  return (
    <div className={style.mainContainer}>
      <div>
        <Nav currentPage={() => setCurrentPage(1)} />
      </div>

      <div className={style.sortContainer}>
        <div>
          <select onChange={(e) => handleFilterTemps(e)}>
            <option value="All">All Temperaments</option>
            {allTemps &&
              allTemps.map((t, index) => {
                return (
                  <option key={index} value={t}>
                    {t}
                  </option>
                );
              })}
          </select>
          <select onChange={(e) => handleFilterSource(e)}>
            <option value="All">All Sources</option>
            <option value="API">Api</option>
            <option value="DB">DB</option>
          </select>
        </div>
        <div>
          <select onChange={(e) => handleOrderByName(e)}>
            <option value="asc">A - Z</option>
            <option value="desc">Z - A</option>
          </select>
          <select onChange={(e) => handleOrderByWeight(e)}>
            <option value="desc">Higher Weight</option>
            <option value="asc">Smaller </option>
          </select>
        </div>
        <img
          src="https://cdn-icons-png.flaticon.com/512/25/25274.png"
          onClick={() => {
            dispatch(getAllDogs());
            setCurrentPage(1);
          }}
          alt="reset"
        />
      </div>

      {loading ? (
        <div>
          <Loading />
        </div>
      ) : (
        <div>
          <div>
            <Paginated
              nextPage={nextPage}
              prevPage={prevPage}
              dogsPerPage={dogsPerPage}
              allDogs={allDogs}
              paginated={paginated}
              currentPage={currentPage}
            />
          </div>
          {error.length ? (
            <div className={style.errorContainer}>
              <h1>Failed to connect to server</h1>
            </div>
          ) : (
            <div className={style.dogsContainer}>
              {Array.isArray(currentDogs) ? (
                currentDogs.map((d, index) => {
                  return (
                    <Dog
                      id={d.id}
                      name={d.name}
                      image={d.image}
                      temps={d.temps}
                      weight={d.weight}
                      key={index}
                    />
                  );
                })
              ) : (
                <div className={style.error}>
                  <h1>{allDogs}</h1>
                  <img src={shadow} alt="shadow" />
                </div>
              )}
            </div>
          )}
          <br />
          <br />
        </div>
      )}
    </div>
  );
};

export default Home;
