import {combineReducers} from 'redux';
import { reducer as form } from 'redux-form';
import {categories} from './categoriesReducer';
import {posts} from './postsReducer';
import {comments} from './commentsReducer'

export default combineReducers({
  categories,
  posts,
  comments,
  form
})
