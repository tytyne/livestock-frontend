import React from "react"
import classNames from 'classnames';
// import { Switch,Route, useHistory } from 'react-router-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
// authentication
import Register from './myPages/Authentication/Register';
import {Login} from './myPages/Authentication/Login';
import{Forgot} from './myPages/Authentication/Forgot_password';
import {Reset} from './myPages/Authentication/Reset_password'

//end authantication

const Auth =()=>{
return(
  <BrowserRouter>

    <Switch>
    <Route path="/register" exact component={Register} />
    <Route path="/login" exact component={Login} />
    <Route path="/reset" exact component={Reset} />
    <Route path="/forgot" exact component={Forgot} />

    </Switch>
    </BrowserRouter>
         


  
)
}

export default Auth