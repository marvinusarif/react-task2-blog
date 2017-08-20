import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ButtonToolbar, Button, Well } from 'react-bootstrap'
import Modal from 'react-modal'
import CommentForm from '../comments/commentForm'
import { getCommentsByPost, voteCommentById,
        commentsModalOpen,
        commentsModalClose, removeComment} from '../../actions/commentsAction.js'

class Comments extends Component {
  constructor(props){
    super(props)
    this._voteComments = this._voteComments.bind(this)
    this.state = {
      modalIsOpen: false,
      commentId : null
    };

    this._openModal = this._openModal.bind(this)
    this._closeModal = this._closeModal.bind(this)
    this._removeComment = this._removeComment.bind(this)
  }
  componentWillMount(){
    const { post_id } = this.props.match.params
    this.props.getCommentsByPost(post_id)
  }
  _voteComments(option,commentId){
    this.props.voteCommentById({option,commentId})
  }
  _openModal(comment) {
    this.props.commentsModalOpen(comment, this.props.match.params.post_id)
  }
  _closeModal() {
    this.props.commentsModalClose()
  }
  _removeComment(comment){
    this.props.removeComment(comment)
  }
  render(){
    const { comments,match } = this.props
    if(!comments.byPost[match.params.post_id]){
      return (null)
    }
    return (
      <div style={{marginTop:20+'px'}}>
        <Button bsStyle="primary" bsSize="small" onClick={this._openModal.bind(this,null)}>New Comment</Button>
          {comments.byPost[match.params.post_id].map(commentId => {
            const { body,voteScore,author,timestamp } = comments.byId[commentId]
            return (
              <div style={{marginTop:10+'px'}} key={commentId}>
                <Well>
                  <p>{body}</p>
                  <p className="blog-post-meta">{Date(timestamp*1000)} by {author}</p>
                  <p>Score : {voteScore}</p>
                  <div>
                    <ButtonToolbar>
                      <Button bsStyle="primary" bsSize="xsmall" onClick={this._voteComments.bind(this,'upVote',commentId)}>
                        <span className="glyphicon glyphicon-thumbs-up"></span>
                      </Button>
                      <Button bsStyle="danger" bsSize="xsmall" onClick={this._voteComments.bind(this,'downVote',commentId)}>
                        <span className="glyphicon glyphicon-thumbs-down"></span>
                      </Button>
                    </ButtonToolbar>
                  </div>
                  <div style={{marginTop:20+'px'}}>
                    <ButtonToolbar>
                      <Button bsSize="small" bsStyle="warning" onClick={this._openModal.bind(this,comments.byId[commentId])}>Edit Comment</Button>
                      <Button bsSize="small" bsStyle="danger" onClick={this._removeComment.bind(this,comments.byId[commentId])}>Delete Comment</Button>
                    </ButtonToolbar>
                  </div>
                </Well>
              </div>
            )
          })}
        <Modal
          isOpen={this.props.comments.modal.isOpen}
          onRequestClose={this._closeModal}
          contentLabel="Example Modal"
        >
          <h2>{this.props.comments.modal.onShow ? 'Edit Comment' : 'New Comment'}</h2>
          <Button onClick={this._closeModal} bsStyle="danger">
            <span className="glyphicon glyphicon-remove"></span> Close</Button>
          <CommentForm/>
        </Modal>
      </div>
    )
  }
}
const mapStateToProps = ({comments}) => {
  return {
    comments
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getCommentsByPost,
    voteCommentById,
    commentsModalClose,
    commentsModalOpen,
    removeComment
  },dispatch)
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Comments))
