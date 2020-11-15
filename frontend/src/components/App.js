import React from 'react'
import {Route, BrowserRouter, Switch, Redirect, Link} from 'react-router-dom'
import {AppProvider} from './AppContext'
import {NavBar} from './NavBar'
import {Register} from './Register'
import {Login} from './Login'

const App = ()=>{
  return (
    <AppProvider>
    	<BrowserRouter>
    		<NavBar/>
    		<Switch>
    			<Route exact path='/register' component={Register}/>
    			<Route exact path='/login' component={Login}/>
    		</Switch>
    	</BrowserRouter>
    </AppProvider>
  );
}

export default App;
