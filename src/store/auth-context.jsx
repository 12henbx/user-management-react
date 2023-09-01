import React, { useState } from 'react'

const AuthContext = React.createContext({
	token: '',
	isLoggedIn: false,
	login: token => {},
	logout: () => {},
})

export const AuthContextProvider = props => {
	const initialToken = document.cookie
	const [token, setToken] = useState(initialToken)

	const userIsLoggedIn = !!token

	const loginHanlder = token => {
		setToken(token)
		document.cookie = `token=${token}; SameSite=None; Secure;`
	}

	const logoutHandler = () => {
		setToken(null)
		document.cookie = 'token=; SameSite=None; Secure; expires=Thu, 01 Jan 1999 00:00:00 UTC; path=/'
	}

	const contextValue = {
		token: token,
		isLoggedIn: userIsLoggedIn,
		login: loginHanlder,
		logout: logoutHandler,
	}

	return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}

export default AuthContext