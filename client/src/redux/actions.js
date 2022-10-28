import axios from "axios";

export const GET_ALL_DOGS = "GET_ALL_DOGS";
export const GET_DOG_DETAIL = "GET_DOG_DETAIL";
export const GET_TEMPS = "GET_TEMPS";
export const GET_ALL_DOGS_BYRACE = "GET_ALL_DOGS_BYRACE";
export const FILTER_BY_TEMPS = "FILTER_BY_TEMPS";
export const FILTER_BY_SOURCE = "FILTER_BY_SOURCE";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_WEIGHT = "ORDER_BY_WEIGHT";
export const GET_ERROR = "GET_ERROR";

export function getAllDogs() {
  return (dispatch) => {
    axios.get("/dogs").then(
      (response) => {
        dispatch({ type: GET_ALL_DOGS, payload: response.data });
      },
      (error) => {
        dispatch({ type: GET_ERROR, payload: error });
      }
    );
  };
}
export function getDogDetail(id) {
  return (dispatch) => {
    axios.get(`/dogs/${id}`).then(
      (response) => {
        dispatch({ type: GET_DOG_DETAIL, payload: response.data });
      },
      (error) => {
        dispatch({ type: GET_ERROR, payload: error });
      }
    );
  };
}
export function getAllDogsByRace(race) {
  return (dispatch) => {
    axios.get(`/dogs?name=${race}`).then(
      (response) => {
        dispatch({ type: GET_ALL_DOGS_BYRACE, payload: response.data });
      },
      (error) => {
        dispatch({ type: GET_ERROR, payload: error });
      }
    );
  };
}
export function getTemps() {
  return (dispatch) => {
    axios.get("/temperaments").then(
      (response) => {
        dispatch({ type: GET_TEMPS, payload: response.data });
      },
      (error) => {
        dispatch({ type: GET_ERROR, payload: error });
      }
    );
  };
}
export function postDog(payload) {
  return axios.post("/dogs", payload).then(
    (response) => {
      return response;
    },
    (error) => {
      return error;
    }
  );
}
export function filterDogsByTemps(payload) {
  return { type: FILTER_BY_TEMPS, payload };
}
export function filterDogsBySource(payload) {
  return { type: FILTER_BY_SOURCE, payload };
}
export function orderDogsByName(payload) {
  return { type: ORDER_BY_NAME, payload };
}
export function orderDogsByWeight(payload) {
  return { type: ORDER_BY_WEIGHT, payload };
}
