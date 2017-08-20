import _ from 'lodash'
import uuid from 'uuid/v1';
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getAllCategories } from '../../actions/categoriesAction'
import { getPostById, addPost, editPost} from '../../actions/postsAction'

class PostsForm extends Component {
  componentWillMount(){
    this.props.getAllCategories()
    this.props.match.params.post_id && (
      this.props.getPostById(this.props.match.params.post_id)
    )
  }

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

  renderSelect(field){
    return (
      <div className="form-group">
        <label className="control-label col-sm-3">{field.label}</label>
        <select className="form-control" {...field.input}>
          {
            _.map(this.props.categories, category => {
              return (
                <option key={category.path} value={category.name}>{category.name}</option>
              )
            })
          }
        </select>
        {field.touched && field.error && <div className="text-danger">{field.error}</div>}
      </div>
    )
  }
  handleFormSubmit(formProps){
    let formValue
    if (this.props.match.path === '/post/new/:category?') {
      formValue = {
        id : uuid(),
        data : formProps
      }
      this.props.addPost(formValue)
    }else{
      formValue = {
        id : this.props.match.params.post_id,
        data : formProps
      }
      this.props.editPost(formValue)
    }
    const url = `/${formProps.category}/${formValue.id}`
    this.props.history.push(url)

  }
  render(){
    const { handleSubmit } = this.props
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field name="title" type='text' component={this.renderField.bind(this)} label="Posts title :" placeholder="insert post title"/>
        <Field name="body" type='text' component={this.renderTextArea.bind(this)} label="Posts Body :" placeholder="insert post body"/>
        <Field name="category" type='text' component={this.renderSelect.bind(this)} label="Posts Category :" />
        <Field name="author" type='text' component={this.renderField.bind(this)} label="Posts Author :" placeholder="insert your comment"/>
        { this.props.match.path === '/post/new/:category?' ?
        <button action="submit" className="btn btn-primary">
          Create New Post
        </button> :
        <button action="submit" className="btn btn-warning">
          Edit Post
        </button>}
      </form>
    )
  }
}
function validate(values){
  const errors = {}
  if(!values.title){
    errors.title = `insert title`
  }
  if(!values.body){
    errors.body = `insert posts`
  }
  if(!values.author){
    errors.author = `insert author`
  }
  return errors
}

const mapStateToProps = ({posts, categories},prevProps) => {
  return {
    posts,
    categories,
    initialValues : posts.byId[prevProps.match.params.post_id] ? posts.byId[prevProps.match.params.post_id] : {category : prevProps.match.params.category ? prevProps.match.params.category : 'react'}
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getAllCategories,
    getPostById,
    addPost,
    editPost
  },dispatch)
}

PostsForm = reduxForm({
 form: 'postsForm',
 enableReinitialize : true,
 validate
})(PostsForm)

PostsForm = withRouter(connect(mapStateToProps,mapDispatchToProps)(PostsForm));

export default PostsForm;
