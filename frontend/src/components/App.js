import React from 'react'
import {Route, BrowserRouter, Switch, Redirect, Link} from 'react-router-dom'
import {AppProvider} from './AppContext'
import {NavBar} from './NavBar'
import {Register} from './Register'
import {Login} from './Login'
import {ConfirmEmailAlert} from './ConfirmEmailAlert'

const App = ()=>{
  return (
    <AppProvider>
    	<BrowserRouter>
    		<NavBar/>
    		<Switch>
    			<Route exact path='/register' component={Register}/>
    			<Route exact path='/login' component={Login}/>
                <Route exact path='/confirm_email' component={ConfirmEmailAlert}/>
                <Route exact path='/active/:uidb64/:token' component={ConfirmEmail}/>
    		</Switch>
    	</BrowserRouter>
    </AppProvider>
  );
}

export default App;
