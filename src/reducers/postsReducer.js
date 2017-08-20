import _ from 'lodash'
import { GET_POSTS, GET_POST, GET_POSTS_BY_CATEGORY,
         PUT_POST, POST_POST, DELETE_POST,
         VOTE_POST, SORT_POSTS_BY_VALUE,
         } from '../actions'

const initialState = {
  byId : {},
  byCategory : {},
  sortBy : 'timestamp'
}
export const posts = (state = initialState,action) => {
  switch(action.type) {

    case GET_POSTS :
      const filterPosts = action.posts
                          .filter( post => post.deleted !== true)
      const byId = _.mapKeys(filterPosts,'id')
      return Object.assign({}, state, {
        byId
      })

    case GET_POST :
      const { post } = action
      return Object.assign({}, state, {
        byId : {
          ...state.byId,
          [post.id] : post
        }
      })

    case GET_POSTS_BY_CATEGORY :
      const postsByCategory = action.posts
          .filter( post => post.deleted !== true)
          .reduce( (posts, post) => {
            return posts.concat(post.id)
          },[])
      return Object.assign({}, state, {
        byCategory : {
          ...state.byCategory,
          [action.category] : postsByCategory
        }
      })

    case SORT_POSTS_BY_VALUE :
      const { sortBy } = action
      return Object.assign({},state,{
        sortBy
      })

    case VOTE_POST :
      return Object.assign({}, state, {
        byId : {
          ...state.byId,
          [action.post.id] : action.post
        }
      })

    case POST_POST :
      return Object.assign({},state, {
        byId : {
          ...state.byId,
          [action.post.id] : action.post
        }
      })

    case PUT_POST :
      return Object.assign({},state, {
        byId : {
          ...state.byId,
          [action.post.id] : action.post
        }
      })
    case DELETE_POST :
      const filterById = _.omit(state.byId, action.post.id)
      if(state.byCategory[action.post.category]){
        const filterByCategory = state.byCategory[action.post.category]
                                 .filter(postId => postId !== action.post.id)
        return Object.assign({}, state, {
                              byId : filterById,
                              byCategory : {
                                ...state.byCategory,
                                [action.post.category] : filterByCategory
                              }
                            })
      }else{
        return Object.assign({},state, {
          byId : filterById
        })
      }



    default :
      return state
    }
}
