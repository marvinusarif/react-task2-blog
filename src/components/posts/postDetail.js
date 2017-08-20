import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Button, ButtonToolbar, Jumbotron} from 'react-bootstrap'
import { getPostById, votePostById, removePost} from '../../actions/postsAction'
import Comments from '../comments/comments'

class PostDetail extends Component {
  constructor(props){
    super(props)
    this._vote = this._vote.bind(this)
    this._removePost = this._removePost.bind(this)
    this._editPost = this._editPost.bind(this)
  }

  componentWillMount(){
    const { post_id } = this.props.match.params
    this.props.getPostById(post_id)
  }

  _vote(option,postId){
    this.props.votePostById({
      option,
      postId
    })
  }

  _removePost(post){
    this.props.removePost(post)
    const redirectTo = `/${post.category}`
    this.props.history.push(redirectTo)
  }

  _editPost(post){
    const redirectTo = `/post/edit/${post.id}`
    this.props.history.push(redirectTo)
  }

  render(){
    const { post_id } = this.props.match.params
    const post  = this.props.posts.byId[post_id]
    if(!post){
      return (<p> post does not exist </p>)
    }
    return (
        <div key={post.id} className="blog-post">
          <Jumbotron>
            <h1>{post.title}</h1>
            <p>{Date(post.timestamp*1000)} by {post.author}</p>
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
            <div style={{marginTop:20+'px'}}>
              <ButtonToolbar>
                <Button bsStyle="warning" onClick={this._editPost.bind(this,post)}>Edit Post</Button>
                <Button bsStyle="danger"  onClick={this._removePost.bind(this,post)}>Delete Post</Button>
              </ButtonToolbar>
            </div>
        </Jumbotron>
        <Comments />
      </div>
    )
  }
}

const mapStateToProps = ({posts}) => {
  return {
    posts
  }
}

const mapActionToProps = (dispatch) => {
  return bindActionCreators({
    getPostById,
    votePostById,
    removePost
  },dispatch)
}

export default connect(mapStateToProps,mapActionToProps)(PostDetail)
