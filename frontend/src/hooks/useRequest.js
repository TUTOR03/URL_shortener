import {useState, useCallback} from 'react'

export const useRequest = ()=>{
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)

	const request = useCallback(async (url, method = 'GET', body=null, headers={})=>{
		setLoading(true)
		if(body){
			body = JSON.stringify(body)
			headers['Content-Type'] = 'application/json'
		}
		try{
			const response = await fetch(url, {method, body, headers})
			if(response.ok){
				const responseData = await response.json()
				setLoading(false)
				return(responseData)
			}
			else{
				setError(true)
				setLoading(false)
				throw new Error(responseData.error)
			}
		}
		catch(error){
			setError(true)
			setLoading(false)
			throw error
		}
	},[])
	return({request, loading, error, setError})
}