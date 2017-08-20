import uuid from 'uuid/v1';
import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { commentsModalClose, addComment, editComment } from '../../actions/commentsAction.js'

class CommentForm extends Component {
  renderField(field){
    return (
      <div className="form-group">
        <label className="control-label col-sm-3">{field.label}</label>
        <input className="form-control" {...field.input}/>
        <div className="text-danger">
          {field.meta.touched
            ? field.meta.error
            : ''}
        </div>
      </div>
    )
  }

  renderTextArea(field){
    return (
      <div className="form-group">
        <label className="control-label col-sm-3">{field.label}</label>
        <textarea className="form-control" {...field.input}/>
        <div className="text-danger">
          {field.meta.touched
            ? field.meta.error
            : ''}
        </div>
      </div>
    )
  }

  handleFormSubmit(formProps){
    let formValue
    if (!this.props.comments.modal.onShow) {
      formValue = {
        id : uuid(),
        parentId : this.props.comments.modal.onPost,
        data : formProps
      }
      this.props.addComment(formValue)
    }else{
      formValue = {
        id : this.props.comments.modal.onShow.id,
        parentId : this.props.comments.modal.onPost,
        data : formProps
      }
      this.props.editComment(formValue)
    }
    this.props.commentsModalClose()
  }
  render(){
    const { handleSubmit } = this.props
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field name="body" type='text' component={this.renderTextArea.bind(this)} label="Comments:" placeholder="insert your comment"/>
        <Field name="author" type='text' component={this.renderField.bind(this)} label="Author :" placeholder="Author's Name"/>
        { this.props.comments.modal.onShow === null ?
        <button action="submit" className="btn btn-primary">
          Create New Comment
        </button> :
        <button action="submit" className="btn btn-warning">
          Edit Comment
        </button>}
      </form>
    )
  }
}
function validate(values){
  const errors = {}
  if(!values.body){
    errors.body = `insert comments`
  }
  if(!values.author){
    errors.author = `insert author`
  }
  return errors
}

const mapStateToProps = ({comments},prevProps) => {
  return {
    comments,
    initialValues : comments.modal.onShow
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addComment,
    editComment,
    commentsModalClose
  },dispatch)
}

CommentForm = reduxForm({
 form: 'commentsForm',
 enableReinitialize : true,
 validate
})(CommentForm)

CommentForm = withRouter(connect(mapStateToProps,mapDispatchToProps)(CommentForm));

export default CommentForm;
