import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import Categories from './categories/categories.js'
import PostsList from './posts/postsList'
import PostDetail from './posts/postDetail.js'
import PostsForm from './posts/postForm.js'
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="col-sm-8 blog-main">
              <Switch>
                <Route exact path='/post/new/:category?' render={PostsForm}/>
                <Route path = "/post/edit/:post_id" component={PostsForm}/>
                <Route exact path='/:category?' component={PostsList}/>
                <Route path='/:category/:post_id' component={PostDetail}/>
              </Switch>
            </div>
            <div className="col-sm-4">
              <Categories />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App
