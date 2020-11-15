import {useState, useCallback} from 'react'

export const UseRequest = ()=>{
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	const request = useCallback((url, method = 'GET', headers={}, body=null)=>{
		if

	},[])
}