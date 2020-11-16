import {useState, useCallback} from 'react'

export const UseRequest = ()=>{
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	const request = useCallback((url, method = 'GET', headers={}, body=null)=>{
		setLoading(true)
		if(body){
			body = JSON.stringify(body)
		}
		fetch(url,{method, headers, body})
		.then(response =>{
			if(response.ok){
				return(response.json())
			}
			setError(true)
			setLoading(false)
		})
		.then(responseData =>{
			setLoading(false)
			return(responseData)
		})
		.catch(new_error =>{
			setError(true)
			setLoading(false)
			console.log(new_error)
		})
	return({request, loading, error})

	},[])
}