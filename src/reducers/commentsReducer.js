import _ from 'lodash'
import { GET_COMMENTS_BY_POST, VOTE_COMMENT,
         POST_COMMENT, PUT_COMMENT, DELETE_COMMENT,
         MODAL_OPEN, MODAL_CLOSE } from '../actions'

const initialState = {
  byId : {},
  byPost : {},
  modal : {}
}

export const comments = (state = initialState,action) => {

  switch(action.type) {

    case GET_COMMENTS_BY_POST :
      const byId = _.mapKeys(action.comments, 'id')
      const commentsByPost = action.comments
                              .filter( comment => comment.deleted === false)
                              .reduce( (comments, comment) => {
                                return comments.concat(comment.id)
                              },[])
      return Object.assign({}, state, {
        byId : {
          ...state.byId,
          ...byId
        },
        byPost : {
          ...state.byPost,
          [action.postId] : commentsByPost
        }
      })

    case VOTE_COMMENT :
      const commentId = action.comments.id
      return Object.assign({}, state, {
        byId : {
          ...state.byId,
          [commentId] : action.comments
        }
      })

    case POST_COMMENT :
      const _byPost = state.byPost[action.comment.parentId].concat(action.comment.id)
      return Object.assign({}, state, {
        byId : {
          ...state.byId,
          [action.comment.id] : action.comment
        },
        byPost : {
          ...state.byPost,
          [action.comment.parentId] : _byPost
        }
      })

    case PUT_COMMENT :
      return Object.assign({}, state, {
        byId : {
          ...state.byId,
          [action.comment.id] : action.comment
        }
      })

    case DELETE_COMMENT :
    const filterById = _.omit(state.byId, action.comment.id)
    const filterByPost = state.byPost[action.comment.parentId]
                        .filter(commentId => commentId !== action.comment.id)
    return Object.assign({}, state, {
      byId : filterById,
      byPost : {
        ...state.byPost,
        [action.comment.parentId] : filterByPost
      }
    })

    case MODAL_OPEN :
      return Object.assign({},state,{
        modal : {
          ...state.modal,
          onPost : action.modal.postId,
          onShow : action.modal.comment,
          isOpen : true
        }
      })
    case MODAL_CLOSE :
        return Object.assign({},state,{
          modal : {
            ...state.modal,
            onPost : null,
            onShow : null,
            isOpen : false
        }
      })
    default :
      return state
  }
}
