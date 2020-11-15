import React from 'react'

export const Login = ()=>{
	return(
		<div className='container mt-3'>
			<div className='row justify-content-center'>
				<div className='col-lg-6 col-md-8 col-sm-12'>
					<h1 className='text-uppercase text-center text-main'>Log in</h1>
					<hr/>
					<form>
						<div className='form-group'>
							<label htmlFor="EmailUsernameInput" className='text-main'>
								<h3>Email or Username</h3>
							</label>
							<input type="email" className="form-control" id="EmailUsernameInput" placeholder='Email/Username'/>
						</div>
						<div className='form-group'>
							<label htmlFor="PasswordInput" className='text-main'>
								<h3>Password</h3>
							</label>
							<input type="password" className="form-control" id="PasswordInput" placeholder='Password'/>
						</div>
						<button type="button" className="btn btn-info btn-block">Log in</button>
					</form>
				</div>
			</div>
		</div>
	);
}