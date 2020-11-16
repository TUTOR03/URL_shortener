import React, {useState, useContext} from 'react'
import {Redirect, useHistory} from 'react-router-dom'
import {useRequest} from  '../hooks/useRequest'
import {AppContext} from './AppContext'

export const Register = ()=>{
	const {request, loading, error, setError} = useRequest()
	const {auth, setAuth} = useContext(AppContext)
	const history = useHistory();
	const [form,setForm] = useState({
		username:'',
		email:'',
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
		// history.push('/rtrtrttr')
		try{
			await request('/api/register', 'POST', form)
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
					<h1 className='text-uppercase text-center text-main'>Sign up</h1>
					<hr/>
					<form onSubmit={handleFormSubmit}>
						<div className='form-group'>
							<label htmlFor="LoginInput" className='text-main'>
								<h3>Username</h3>
							</label>
							<input type="text" name='username' value={form.username} onChange={handleInputChange} className={`form-control ${error ? 'is-invalid' : ''}`} id="LoginInput" placeholder='Username'/>
							<div className="invalid-feedback">
        						Invalid username
      						</div>
						</div>
						<div className='form-group'>
							<label htmlFor="EmailInput" className='text-main'>
								<h3>Email</h3>
							</label>
							<input type="email" name='email' value={form.email} onChange={handleInputChange} className={`form-control ${error ? 'is-invalid' : ''}`} id="EmailInput" placeholder='Email'/>
							<div className="invalid-feedback">
        						Invalid email
      						</div>
						</div>
						<div className='form-group'>
							<label htmlFor="PasswordInput" className='text-main'>
								<h3>Password</h3>
							</label>
							<input type="password" name='password' value={form.password} onChange={handleInputChange} className={`form-control ${error ? 'is-invalid' : ''}`} id="PasswordInput" placeholder='Password'/>
							<div className="invalid-feedback">
        						Invalid password
      						</div>
							<small id="PasswordHelp" className="form-text text-muted">7 or more characters</small>
						</div>
						<button type="submit" disabled={loading ? true : ''} className="btn btn-info btn-block">Sign up</button>
					</form>
				</div>
			</div>
		</div>
		)
	);
}