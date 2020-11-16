import React,{useState, useEffect} from 'react'

export const AppContext = React.createContext()

export const AppProvider = ({children})=>{
	const [auth, setAuth] = useState()

	useEffect(()=>{
		if(localStorage.token){
			setAuth(true)
		}
		else{
			setAuth(false)
		}
	},[])

	useEffect(()=>{
		if(auth === false){
			localStorage.token = ''
		}
	},[auth])

	return(
	<AppContext.Provider value={{auth, setAuth}}>
		{children}
	</AppContext.Provider>
	);
}