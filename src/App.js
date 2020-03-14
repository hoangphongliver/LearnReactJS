import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ViewMember from './components/Member/ViewMember';
import ViewMemberDetail from './components/Member/ViewMemberDetail/ViewMemberIDetail';
import Home from './components/Home';
import './App.css';
import { connect } from 'react-redux';
import * as courseAction from './State/Action'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NotFound from './components/NotFound';
import '@fortawesome/fontawesome-free';
import Menu from './components/menu/menu'
import AddMemberByStep from './components/Member/AddMemberByStep/AddMemberByStep';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {

    const href = window.location.href
    const route = href.substr(href.lastIndexOf("0/") + 2, href.length);

    return (
      <Router>
        <div className="App">
          {href.indexOf('/detail') !== -1 ? <Menu></Menu> : ''}
          <Switch>
            <Route path="/" exact component={Home}></Route>
            <Route path="/viewmember/:courseID" exact component={ViewMember}></Route>
            <Route path="/viewmember/:courseID/detail/:id" component={ViewMemberDetail}></Route>
            <Route path="/viewmember/:courseID/addmember/:memberID" component={AddMemberByStep}></Route>
            <Route component={NotFound}></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.course
  }
};


const mapDispatchToProps = (dispatch, props) => {
  return {
    resetEdit: () => {
      dispatch(courseAction.resetEdit());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

