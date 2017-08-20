import config from '../utils/config'

export const URL = `${config.origin}`
export const POST_PATH = '/posts'
export const CATEGORIES_PATH = '/categories'
export const COMMENTS_PATH = '/comments'

export const GET_CATEGORIES = 'GET_CATEGORIES'

export const GET_POSTS = 'GET_POSTS'
export const GET_POST = 'GET_POST'
export const GET_POSTS_BY_CATEGORY = 'GET_POSTS_BY_CATEGORY'
export const SORT_POSTS_BY_VALUE = 'SORT_POSTS_BY_VALUE'
export const POST_POST = 'POST_POST'
export const PUT_POST = 'PUT_POST'
export const DELETE_POST = 'DELETE_POST'
export const VOTE_POST = 'VOTE_POST'

export const GET_COMMENTS_BY_POST = 'GET_COMMENTS_BY_POST'
export const POST_COMMENT = 'POST_COMMENT'
export const PUT_COMMENT = 'PUT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const MODAL_OPEN = 'MODAL_OPEN'
export const MODAL_CLOSE = 'MODAL_CLOSE'
