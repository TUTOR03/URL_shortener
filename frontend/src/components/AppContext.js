import React,{useState} from 'react'

export const AppContext = React.createContext()

export const AppProvider = ({children})=>{
	const [auth, setAuth] = useState(false)
	return(
	<AppContext.Provider value={{}}>
		{children}
	</AppContext.Provider>
	);
}