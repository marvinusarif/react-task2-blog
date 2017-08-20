import { URL, POST_PATH,
         GET_POSTS, GET_POST, GET_POSTS_BY_CATEGORY,
         PUT_POST, POST_POST, DELETE_POST,
         VOTE_POST, SORT_POSTS_BY_VALUE, } from './index'
import axios from 'axios'


export const getPostsById = () => dispatch => {
  const reqURL = `${URL}${POST_PATH}`
  axios.get(reqURL,{
    headers: { Authorization: "Basic bWFydmludXMuYXJpZkBmaXNoYXJlLmFzaWE6ZmlzaGFyZXRlc3Q=" }
    })
    .then( objPosts => dispatch(receivePostsById(objPosts)))
    .catch( err => console.error(err))
}

export const receivePostsById = ({data}) => {
  return {
    type : GET_POSTS,
    posts : data
  }
}

export const getPostById = (postId) => (dispatch,getState) => {
  const { posts } = getState()
  if( posts.byId[postId]) {
    dispatch(receivePostById({data : posts.byId[postId]}))
  }else {
    const reqURL = `${URL}${POST_PATH}/${postId}`
    axios.get(reqURL,{
      headers: { Authorization: "Basic bWFydmludXMuYXJpZkBmaXNoYXJlLmFzaWE6ZmlzaGFyZXRlc3Q=" }
    })
      .then( objPost => dispatch(receivePostById(objPost)))
      .catch( err => console.error(err))
  }

}

export const receivePostById = ({data}) => {
  return {
    type : GET_POST,
    post : data
  }
}

export const getPostsByCategory = (category) => dispatch => {
  const reqURL =`${URL}/${category}${POST_PATH}`
  axios.get(reqURL, {
    headers: { Authorization: "Basic bWFydmludXMuYXJpZkBmaXNoYXJlLmFzaWE6ZmlzaGFyZXRlc3Q=" }
    })
    .then( arrPosts => dispatch(receivePostsByCategory(category,arrPosts)))
    .catch( err => console.error(err))
}

export const receivePostsByCategory = (category,{data}) => {
    return {
      type : GET_POSTS_BY_CATEGORY,
      posts : data,
      category : category
    }
}

export const sortPostsBy = (sortValue) => {
  return {
    type : SORT_POSTS_BY_VALUE,
    sortBy : sortValue
  }
}

export const votePostById = ({option,postId}) => dispatch => {
  const reqUrl = `${URL}${POST_PATH}/${postId}`
  axios.post(reqUrl, { option : option },{
    headers: { Authorization: "Basic bWFydmludXMuYXJpZkBmaXNoYXJlLmFzaWE6ZmlzaGFyZXRlc3Q=" }
    })
    .then( objPost => dispatch(receiveVotePostById(objPost)))
    .catch( err => console.log(err))
}

export const receiveVotePostById = ({data}) => {
  return {
    type : VOTE_POST,
    post : data
  }
}

export const addPost = ({ id, data :{title, body, category, author}}) => dispatch => {
  const reqUrl = `${URL}${POST_PATH}`
  axios.post(reqUrl,{
      id,
      timestamp : Date.now(),
      title,
      body,
      category,
      author
    },{
      headers: { Authorization: "Basic bWFydmludXMuYXJpZkBmaXNoYXJlLmFzaWE6ZmlzaGFyZXRlc3Q=" }
    })
     .then( objPosts => {
       dispatch(postPost(objPosts))
     })
     .catch(err => console.log(err))
}

export const postPost = ({data}) => {
  return {
    type : POST_POST,
    post : data
  }
}

export const editPost = ({ id, data : { title, body, category, author } }) => dispatch => {
  const reqUrl = `${URL}${POST_PATH}/${id}`
  axios.put(reqUrl,{
      timestamp : Date.now(),
      title,
      body,
      category,
      author
    },{
      headers: { Authorization: "Basic bWFydmludXMuYXJpZkBmaXNoYXJlLmFzaWE6ZmlzaGFyZXRlc3Q=" }
    })
     .then( objPosts => {
       dispatch(putPost(objPosts))
     })
     .catch(err => console.log(err))
}

export const putPost = ({data}) => {
  return {
    type : PUT_POST,
    post : data
  }
}

export const removePost = (data) => dispatch => {
  const { id, category } = data
  const reqUrl = `${URL}${POST_PATH}/${id}`
  axios.delete(reqUrl,{
    headers: { Authorization: "Basic bWFydmludXMuYXJpZkBmaXNoYXJlLmFzaWE6ZmlzaGFyZXRlc3Q=" }
  })
   .then( objPost => dispatch(deletePost({id,category})))
   .catch( err => console.log(err))
}

export const deletePost = ({id,category}) => {
  return {
    type : DELETE_POST,
    post : {
      id,
      category
    }
  }
}
