import axios from "axios";

export const GET_ALL_DOGS = "GET_ALL_DOGS";
export const GET_DOG_DETAIL = "GET_DOG_DETAIL";
export const GET_TEMPS = "GET_TEMPS";
export const GET_ALL_DOGS_BYRACE = "GET_ALL_DOGS_BYRACE";
export const FILTER_BY_TEMPS = "FILTER_BY_TEMPS";
export const FILTER_BY_SOURCE = "FILTER_BY_SOURCE";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_WEIGHT = "ORDER_BY_WEIGHT";

export function getAllDogs() {
  return async function (dispatch) {
    const response = await axios.get("/dogs");
    dispatch({ type: GET_ALL_DOGS, payload: response.data });
  };
}
export function getDogDetail(id) {
  return async function (dispatch) {
    const response = await axios.get(`/dogs/${id}`);
    dispatch({ type: GET_DOG_DETAIL, payload: response.data });
  };
}
export function getAllDogsByRace(race) {
  return async function (dispatch) {
    const response = await axios.get(`/dogs?name=${race}`);
    dispatch({ type: GET_ALL_DOGS_BYRACE, payload: response.data });
  };
}
export function getTemps() {
  return async function (dispatch) {
    const response = await axios.get("/temperaments");
    dispatch({ type: GET_TEMPS, payload: response.data });
  };
}
export async function postDog(payload) {
  const response = await axios.post("/dogs", payload);
  return response;
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
