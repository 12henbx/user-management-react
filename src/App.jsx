import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import AuthContext from './store/auth-context'
import UserProvider from './store/user-context'

import Home from './pages/Home'
import Login from './pages/Login'

import Wrapper from './components/Layout/Wrapper'
import UserDetail from './pages/UserDetail'
import UserEditData from './pages/UserEditData'

function App() {
  const [listOfUsers, setListOfUsers] = useState([]);
	const authCtx = useContext(AuthContext)

	return (
		<UserProvider.Provider value={[
      listOfUsers,
      setListOfUsers,
    ]}>
			<Wrapper>
				{/* {cartIsShown && <Cart onClose={hideCartHandler} />} */}
        <BrowserRouter>
          <Routes>
            {authCtx.isLoggedIn && <Route path='/' element={<Home />} />}
            <Route path='/' element={<Home />} />
            {authCtx.isLoggedIn && <Route path='/login' element={<Navigate to='/' />} />}
            {authCtx.isLoggedIn && <Route path='*' element={<Home />} />}
            {authCtx.isLoggedIn && <Route path="/users/:userId" element={<UserDetail />} />}
            {authCtx.isLoggedIn && <Route path="/user/edit/:userId" element={<UserEditData />} />}
            {authCtx.isLoggedIn && <Route path='*' element={<Navigate to='/' />} />}
            {!authCtx.isLoggedIn && <Route path='/' element={<Navigate to='/login' />} />}
            {!authCtx.isLoggedIn && <Route path='/login' element={<Navigate to='/login' />} />}
            {!authCtx.isLoggedIn && <Route path='*' element={<Navigate to='/login' />} />}
          </Routes>
        </BrowserRouter>
			</Wrapper>
		</UserProvider.Provider>
	)
}

export default App