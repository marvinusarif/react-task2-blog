import { URL, CATEGORIES_PATH, GET_CATEGORIES } from './index'
import axios from 'axios'

export const getAllCategories = () => dispatch => {
  const reqURL = `${URL}${CATEGORIES_PATH}`
  axios.get(reqURL, {
    headers: { Authorization: "Basic bWFydmludXMuYXJpZkBmaXNoYXJlLmFzaWE6ZmlzaGFyZXRlc3Q=" }
    })
    .then( objCategories => {
      dispatch(receiveAllCategories(objCategories))
    })
    .catch( err => console.error(err))
}

export const receiveAllCategories = ({data}) => {
  return {
    type : GET_CATEGORIES,
    categories : data.categories
  }
}
