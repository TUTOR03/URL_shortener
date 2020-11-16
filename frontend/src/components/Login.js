import React, {useState, useContext} from 'react'
import {Redirect} from 'react-router-dom'
import {useRequest} from  '../hooks/useRequest'
import {AppContext} from './AppContext'

export const Login = ()=>{
	const {request, loading, error, setError} = useRequest()
	const {auth, setAuth} = useContext(AppContext)
	const [form,setForm] = useState({
		username:'',
		password:''
	})
	const handleInputChange = (event)=>{
		event.preventDefault()
		if(error){
			setError(false)
		}
		setForm({
			...form,
			[event.target.name]:event.target.value
		})
	}
	const handleFormSubmit = async (event)=>{
		event.preventDefault()
		try{
			let data = await request('/api/login', 'POST', form)
			localStorage.setItem('token',data.token)
			setAuth(true)
		}
		catch(e){
			//console.log(e)
		}
	}
	return(
		auth ? (<Redirect to='/' />) : (
		<div className='container mt-3'>
			<div className='row justify-content-center'>
				<div className='col-lg-6 col-md-8 col-sm-12'>
					<h1 className='text-uppercase text-center text-main'>Log in</h1>
					<hr/>
					<form onSubmit={handleFormSubmit}>
						<div className='form-group'>
							<label htmlFor="EmailUsernameInput" className='text-main'>
								<h3>Email or Username</h3>
							</label>
							<input type="text" value={form.username} onChange={handleInputChange} name='username' className={`form-control ${error ? 'is-invalid' : ''}`} id="EmailUsernameInput" placeholder='Email/Username'/>
							<div className="invalid-feedback">
        						Invalid username or email
      						</div>
						</div>
						<div className='form-group'>
							<label htmlFor="PasswordInput" className='text-main'>
								<h3>Password</h3>
							</label>
							<input type="password" value={form.password} onChange={handleInputChange} name='password' className={`form-control ${error ? 'is-invalid' : ''}`} id="PasswordInput" placeholder='Password'/>
							<div className="invalid-feedback">
        						password
      						</div>
						</div>
						<button type="submit" disabled={loading ? true : ''} className="btn btn-info btn-block">Log in</button>
					</form>
				</div>
			</div>
		</div>
		)
	);
}