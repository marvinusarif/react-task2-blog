import axios from 'axios'
import { URL, POST_PATH, COMMENTS_PATH,
         GET_COMMENTS_BY_POST,
         POST_COMMENT, PUT_COMMENT, DELETE_COMMENT,
         VOTE_COMMENT, MODAL_OPEN, MODAL_CLOSE} from './index'

export const getCommentsByPost = (postId) => dispatch => {
  const reqURL = `${URL}${POST_PATH}/${postId}${COMMENTS_PATH}`
  axios.get(reqURL, {
    headers: { Authorization: "Basic bWFydmludXMuYXJpZkBmaXNoYXJlLmFzaWE6ZmlzaGFyZXRlc3Q=" }
    })
    .then(arrComments => dispatch(receiveCommentsByPost(postId,arrComments)))
    .catch(err => console.log(err))
}

export const receiveCommentsByPost = (postId,{data}) => {
  return {
    type : GET_COMMENTS_BY_POST,
    postId,
    comments : data
  }
}

export const voteCommentById = ({option,commentId}) => dispatch => {
  const reqUrl = `${URL}${COMMENTS_PATH}/${commentId}`
  axios.post(reqUrl, { option : option },{
    headers: { Authorization: "Basic bWFydmludXMuYXJpZkBmaXNoYXJlLmFzaWE6ZmlzaGFyZXRlc3Q=" }
    })
    .then( objComment => dispatch(receiveVotePostById(objComment)))
    .catch( err => console.log(err))
}

export const receiveVotePostById = ({data}) => {
  return {
    type : VOTE_COMMENT,
    comments : data
  }
}

export const addComment = ({id, parentId, data : { body, author} }) => dispatch => {
  const reqUrl = `${URL}${COMMENTS_PATH}`
  axios.post(reqUrl, {
    id,
    parentId,
    timestamp : Date.now(),
    body,
    author
  },{
    headers: { Authorization: "Basic bWFydmludXMuYXJpZkBmaXNoYXJlLmFzaWE6ZmlzaGFyZXRlc3Q=" }
    })
    .then( objComment => dispatch(postComment(objComment)))
    .catch( err => console.log(err))
}

export const postComment = ({data}) => {
  return {
    type : POST_COMMENT,
    comment : data
  }
}

export const editComment = ({id, parentId, data : { body, author} }) => dispatch => {
  const reqUrl = `${URL}${COMMENTS_PATH}/${id}`
  axios.put(reqUrl, {
    id,
    parentId,
    timestamp : Date.now(),
    body,
    author
  },{
    headers: { Authorization: "Basic bWFydmludXMuYXJpZkBmaXNoYXJlLmFzaWE6ZmlzaGFyZXRlc3Q=" }
    })
    .then( objComment => dispatch(putComment(objComment)))
    .catch( err => console.log(err))
}

export const putComment = ({data}) => {
  return {
    type : PUT_COMMENT,
    comment : data
  }
}
export const removeComment = (data) => dispatch => {
  const { id, parentId } = data
  const reqUrl = `${URL}${COMMENTS_PATH}/${id}`
  axios.delete(reqUrl,{
    headers: { Authorization: "Basic bWFydmludXMuYXJpZkBmaXNoYXJlLmFzaWE6ZmlzaGFyZXRlc3Q=" }
  })
   .then( objComment => dispatch(deleteComment({id, parentId})))
   .catch( err => console.log(err))
}

export const deleteComment = ({id, parentId}) => {
  return {
    type : DELETE_COMMENT,
    comment : {
      id,
      parentId
    }
  }
}

export const commentsModalOpen = (comment,postId) => {
  return {
    type : MODAL_OPEN,
    modal : {
      postId : postId,
      comment : comment
    }
  }
}
export const commentsModalClose = () => {
  return {
    type : MODAL_CLOSE
  }
}
