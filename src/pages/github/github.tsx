import React, {Component} from 'react';
import {NavLink, Redirect, Route, Switch} from 'react-router-dom';
import Repositories from './repositories';

export class GitHub extends Component {
   render() {
      return (
         <div className="row">
            <div className="col-12" style={{textAlign: 'center'}}>
               <div className="btn-group">
                  <NavLink className="btn btn-info" to="/github/users">Users</NavLink>
                  <NavLink className="btn btn-info" to="/github/topics">Topics</NavLink>
                  <NavLink className="btn btn-info" to="/github/repositories">Repositories</NavLink>
               </div>
            </div>
            <div className="col-12 mt-3">
               <Switch>
                  <Route path="/github/repositories" component={Repositories}/>
                  <Redirect to="/github/repositories"/>
               </Switch>
            </div>
         </div>
      );
   }
}
