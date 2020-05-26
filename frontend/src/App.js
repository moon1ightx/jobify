import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {Provider} from 'react-redux';


import Edit from  './containers/edit'
import Quiz from  './containers/quiz'
import Story from  './containers/story'
import Internship from './containers/internships'
import Vacancy from './containers/vacancy'
import Main from './containers/main'
import Profile from './containers/profile'
import Auth from './containers/auth'
import Explore from './containers/explore'
import {USER_LOGIN} from './store/actions/types'
import {store} from './store'

if(localStorage.getItem('access_token')) {
  store.dispatch({
    type: USER_LOGIN,
    payload: localStorage.getItem('access_token')
  })
}

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Route path="/" exact component={Main} />
          <Route path="/auth" exact component={Auth} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/explore" exact component={Explore} />
          <Route path="/vacancy" exact component={Vacancy} />
          <Route path="/inter" exact component={Internship} />
          <Route path="/story" exact component={Story} />
          <Route path="/quiz" exact component={Quiz} />
          <Route path="/edit" exact component={Edit} />
        </Router>
      </div>
    </Provider>
  );
}

export default App;
