import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter, Link } from 'react-router-dom'
import { getPostsById, getPostsByCategory, sortPostsBy, votePostById, removePost } from '../../actions/postsAction.js'
import { ButtonToolbar, Button, Well } from 'react-bootstrap'

class PostsList extends Component {
  constructor(props){
    super(props)
    this._sortByHandler = this._sortByHandler.bind(this)
    this._vote = this._vote.bind(this)
    this._removePost = this._removePost.bind(this)
    this._editPost = this._editPost.bind(this)
    this._newPost = this._newPost.bind(this)
  }
  componentWillMount(){
    const {match, getPostsById, getPostsByCategory } = this.props
    getPostsById()
    match.params.category && (
      getPostsByCategory(match.params.category)
    )
  }

  componentWillReceiveProps(nextProps){
    const { match, getPostsByCategory } = nextProps
    if (this.props.match.params.category !== match.params.category ) {
      getPostsByCategory(match.params.category)
    }
  }
  _filterByCategory({match, posts}){
    if(!match.params.category){
      return Object.keys(posts.byId)
            .reduce( (arr,key) => {
              return arr.concat(posts.byId[key])
            }, [])
    }
    if(posts.byCategory[match.params.category]){
      const allowed = posts.byCategory[match.params.category]
      return Object.keys(posts.byId)
                      .filter(key => allowed.includes(key))
                      .reduce((arr, key) => {
                        return arr.concat(posts.byId[key]);
                      }, [])

    }
  }
  _sortByHandler(e){
    const sortValue = e.target.value
    this.props.sortPostsBy(sortValue)
  }
  _showPosts(){
    const {sortBy} = this.props.posts
    if(this._filterByCategory(this.props)){
      return this._filterByCategory(this.props).sort( (a,b) => {
        return a[sortBy] - b[sortBy]
      })
    }
    return null
  }
  _vote(option,postId){
    this.props.votePostById({
      option,
      postId
    })
  }
  _removePost(post){
    this.props.removePost(post)
  }
  _editPost(post){
    const redirectTo = `/post/edit/${post.id}`
    this.props.history.push(redirectTo)
  }
  _newPost(){
    let redirectTo
    this.props.match.params.category ? (
      redirectTo = `/post/new/${this.props.match.params.category}`
    ) : (
      redirectTo = `/post/new`
    )
    this.props.history.push(redirectTo)
  }
  render() {
    if(!this._showPosts()){
      return null
    }
    return (
      <div>
        <div>
          <Well>
            Sort Posts in {this.props.match.params.category ? this.props.match.params.category : 'All Posts'} By :
            <select value={this.props.posts.sortBy} onChange={this._sortByHandler}>
              <option value="timestamp">time</option>
              <option value="voteScore">vote</option>
            </select>
            <ButtonToolbar>
              <Button bsStyle="primary" onClick={this._newPost.bind(this)}>
                Create New Post { this.props.match.params.category ? `in ${this.props.match.params.category}` : ''}
              </Button>
            </ButtonToolbar>
          </Well>
        </div>

          {this._showPosts().map(post => {
            return (
              <div key={post.id} className="blog-post">
                <Well>
                  <h2 className="blog-post-title"> <Link to={`/${post.category}/${post.id}`}>{post.title}</Link></h2>
                  <p className="blog-post-meta">{Date(post.timestamp*1000)} by {post.author}</p>
                  <p>{post.body}</p>
                  <p>Score : {post.voteScore}</p>
                  <div>
                    <ButtonToolbar>
                      <Button bsStyle="primary" bsSize="small" onClick={this._vote.bind(this,'upVote',post.id)}>
                        <span className="glyphicon glyphicon-thumbs-up"></span>
                      </Button>
                      <Button bsStyle="danger" bsSize="small" onClick={this._vote.bind(this,'downVote',post.id)}>
                        <span className="glyphicon glyphicon-thumbs-down"></span>
                      </Button>
                    </ButtonToolbar>
                  </div>
                  <div className="row" style={{marginTop:20+'px'}}>
                    <ButtonToolbar>
                      <Button bsStyle="warning" onClick={this._editPost.bind(this,post)}>Edit Post</Button>
                      <Button bsStyle="danger" onClick={this._removePost.bind(this,post)}>Delete Post</Button>
                    </ButtonToolbar>
                  </div>
                </Well>
            </div>
            )
          }) }
      </div>
    )
  }
}

const mapStateToProps = ({posts}) => {
  return {
    posts
  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getPostsById,
    getPostsByCategory,
    sortPostsBy,
    votePostById,
    removePost
  },dispatch)
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostsList))
