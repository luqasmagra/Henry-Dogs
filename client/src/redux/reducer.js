import {
  FILTER_BY_SOURCE,
  FILTER_BY_TEMPS,
  GET_ALL_DOGS,
  GET_ALL_DOGS_BYRACE,
  GET_DOG_DETAIL,
  GET_TEMPS,
  ORDER_BY_NAME,
  ORDER_BY_WEIGHT,
  GET_ERROR,
} from "./actions";

const initialState = {
  dogs: [],
  allDogs: [],
  dogDetail: {},
  temps: [],
  error: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_DOGS:
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload,
      };
    case GET_DOG_DETAIL:
      return {
        ...state,
        dogDetail: action.payload,
      };
    case GET_TEMPS:
      return {
        ...state,
        temps: action.payload,
      };
    case GET_ALL_DOGS_BYRACE:
      return {
        ...state,
        dogs: action.payload,
      };
    case FILTER_BY_TEMPS: {
      const allDogs = [...state.allDogs];
      const tempsFilter =
        action.payload === "All"
          ? allDogs
          : allDogs?.filter((dog) => {
              if (typeof dog.temps === "string") {
                return dog.temps.includes(action.payload);
              } else if (Array.isArray(dog.temps)) {
                return dog.temps
                  .map((dog) => dog.name)
                  .includes(action.payload);
              }
            });
      return {
        ...state,
        dogs: tempsFilter,
      };
    }
    case FILTER_BY_SOURCE: {
      const allDogs = [...state.allDogs];
      const sourceFilter =
        action.payload === "DB"
          ? allDogs.filter((dog) => dog.created)
          : allDogs.filter((dog) => !dog.created);
      return {
        ...state,
        dogs: action.payload === "All" ? state.allDogs : sourceFilter,
      };
    }
    case ORDER_BY_NAME: {
      const allDogs = [...state.allDogs];
      const orderName =
        action.payload === "asc"
          ? allDogs.sort((a, b) => {
              if (a.name > b.name) {
                return 1;
              }
              if (a.name < b.name) {
                return -1;
              }
              return 0;
            })
          : allDogs.sort((a, b) => {
              if (a.name > b.name) {
                return -1;
              }
              if (a.name < b.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        dogs: [...orderName],
      };
    }
    case ORDER_BY_WEIGHT: {
      const allDogs = [...state.allDogs];
      const orderWeight =
        action.payload === "asc"
          ? allDogs.sort((a, b) => {
              if (
                Number(a.weight.split(" -").shift()) >
                Number(b.weight.split(" -").shift())
              ) {
                return 1;
              }
              if (
                Number(a.weight.split(" -").shift()) <
                Number(b.weight.split(" -").shift())
              ) {
                return -1;
              }
              return 0;
            })
          : allDogs.sort((a, b) => {
              if (
                Number(a.weight.split(" -").shift()) >
                Number(b.weight.split(" -").shift())
              ) {
                return -1;
              }
              if (
                Number(a.weight.split(" -").shift()) <
                Number(b.weight.split(" -").shift())
              ) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        dogs: orderWeight,
      };
    }
    case GET_ERROR:
      return {
        ...state,
        error: [action.payload],
      };
    default:
      return { ...state };
  }
};

export default rootReducer;
