import React from 'react'

export const Register = ()=>{
	return(
		<div className='container mt-3'>
			<div className='row justify-content-center'>
				<div className='col-lg-6 col-md-8 col-sm-12'>
					<h1 className='text-uppercase text-center text-main'>Sign up</h1>
					<hr/>
					<form>
						<div className='form-group'>
							<label htmlFor="LoginInput" className='text-main'>
								<h3>Login</h3>
							</label>
							<input type="text" className="form-control" id="LoginInput" placeholder='Login'/>
						</div>
						<div className='form-group'>
							<label htmlFor="EmailInput" className='text-main'>
								<h3>Email</h3>
							</label>
							<input type="email" className="form-control" id="EmailInput" placeholder='Email'/>
						</div>
						<div className='form-group'>
							<label htmlFor="PasswordInput" className='text-main'>
								<h3>Password</h3>
							</label>
							<input type="password" className="form-control" id="PasswordInput" placeholder='Password'/>
							<small id="PasswordHelp" className="form-text text-muted">7 or more characters</small>
						</div>
						<button type="button" className="btn btn-info btn-block">Sign up</button>
					</form>
				</div>
			</div>
		</div>
	);
}