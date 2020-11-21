import React,{useEffect, useState} from 'react'
import {useRequest} from '../hooks/useRequest'

export const ConfirmEmail = (props)=>{
	const {uidb64,token} = props.match.params
	const {request, loading, error, setError} = useRequest()
	const [message, setMessage] = useState('')

	useEffect(async ()=>{
		try{
			let data = await request(`/api/activate/${uidb64}/${token}`, 'POST')
			setMessage(data.message)
		}
		catch(e){
			//console.log(e)
		}
	},[])

	return (
		<div className='container mt-3'>
			<div className='row justify-content-center'>
				<div className='col-sm-12'>
					{message ? 
						<h2 className='text-uppercase text-center text-main'>{message}</h2> 
					: 
						<h2 className='text-uppercase text-center text-main'>Loading ...</h2>
					}
				</div>
			</div>
		</div>
	);
}