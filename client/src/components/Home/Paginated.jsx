import React from "react";
import style from "./Paginated.module.css";

const Paginated = ({
  dogsPerPage,
  allDogs,
  paginated,
  nextPage,
  prevPage,
  currentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allDogs.length / dogsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      {typeof allDogs !== "string" && (
        <div>
          <nav className={style.container}>
            <button onClick={() => prevPage()} className={style.buttonChange}>
              Prev
            </button>
            {pageNumbers &&
              pageNumbers.map((n, index) => {
                return (
                  <ul
                    key={index}
                    onClick={() => paginated(n)}
                    className={
                      currentPage === n ? style.buttonActive : style.button
                    }
                  >
                    {n}
                  </ul>
                );
              })}
            <button onClick={() => nextPage()} className={style.buttonChange}>
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Paginated;
