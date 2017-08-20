import _ from 'lodash'
import { GET_CATEGORIES} from '../actions'

export const categories = (state = {},action) => {
  switch(action.type) {
    case GET_CATEGORIES :
      const categories =  _.mapKeys(action.categories,'name')
      return Object.assign({},state,categories)
    default :
      return state
  }
}
