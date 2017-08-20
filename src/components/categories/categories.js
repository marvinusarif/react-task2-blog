import _ from 'lodash'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { ListGroupItem, ListGroup } from 'react-bootstrap'
import { getAllCategories } from '../../actions/categoriesAction.js'

class Categories extends Component{
  constructor(props){
    super(props)
    this._changeLocation = this._changeLocation.bind(this)
  }
  componentDidMount(){
    this.props.getAllCategories()
  }
  _changeLocation(categoryPath){
    this.props.history.push(`/${categoryPath}`)
  }
  render(){
    const { categories } = this.props
    let categoriesList = {}
    categoriesList = (Object.keys(categories).length > 0 ) ? (
                         _.map(categories, category => {
                          return (
                            <ListGroupItem key={category.path}>
                              <Link to={`/${category.path}`}>{category.name}</Link>
                            </ListGroupItem>
                          )
                        })
                      )
                      : (
                         (<ListGroupItem> category is empty </ListGroupItem>)
                      )
      return (
        <div>
        { this.props.match.url !== '/' && <div><Link to="/"> Back to Index </Link><br/></div> }
        <ListGroup>
          <ListGroupItem><Link to={`/`}>All Categories</Link></ListGroupItem>
          {categoriesList}
        </ListGroup>
        </div>
      )
  }
}
const mapStateToProps = ({categories}) => {
  return {
    categories
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getAllCategories
  },dispatch)
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Categories))
