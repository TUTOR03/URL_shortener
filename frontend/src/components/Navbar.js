import React, {useContext} from 'react'
import AppContext from './AppContext'
import {Link} from 'react-router-dom'

export const NavBar = ()=>{
	return(
		<nav className="navbar navbar-expand-sm text-white navbar-imerald">
			<div className='container-md'>
			<Link className="navbar-brand text-white" to='/'>
				<h1>TS SHORTENER</h1>
			</Link>
			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse justify-content-sm-end" id="navbarSupportedContent">
			    <form className="form-inline my-lg-0 justify-content-sm-center">
			    	<Link to='/register'>
				    	<button className="text-uppercase text-white btn btn-lg btn-info mx-2 my-2 my-sm-0">Sign up</button>
				    </Link>
				    <Link to='/login'>
				    	<button className="text-uppercase text-white btn btn-lg btn-info mx-2 my-2 my-sm-0">Log in</button>
				    </Link>
			    </form>
			</div>
			</div>
		</nav>
	);
}