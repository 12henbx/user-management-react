import { useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../store/auth-context'

import classes from './AuthForm.module.css'

const AuthForm = props => {
	const [isLoading, setIsLoading] = useState(false)

	const authCtx = useContext(AuthContext)

	const navigate = useNavigate()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm()

	const onSubmit = data => {
		const enteredUsername = data.username
		const enteredPassword = data.password

		setIsLoading(true)

		fetch('https://fakestoreapi.com/auth/login',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                username: enteredUsername,
                password: enteredPassword,
            })
        })
            .then(res=>{
                setIsLoading(false)
                return res.json()
            })
            .then(json=>{
                authCtx.login(json)
				navigate('/')
            })
            .catch(e => console.error(`error ${e}`))
	}

	return (
		<>
			<h2 className={classes.heading}>👋 Hi! Please Login to Access</h2>
            <h2 className={classes.heading}>User Management Dashboard</h2>
			<div className={classes.card}>
				<form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
					<input
						placeholder='Username (use : mor_2314 to login)'
						{...register('username', {
							required: true,
							minLength: {
								value: 4,
								message: 'Username should more than 4 characters.',
							},
						})}
					/>

					<p>{errors.username?.message}</p>

					<input
						placeholder='Password (use : 83r5^_ to login)'
						type='password'
						{...register('password', {
							required: true,
							minLength: {
								value: 4,
								message: 'Password must contain > 6 characters.',
							},
						})}
					/>

					<p>{errors.password?.message}</p>

					{!isLoading && (
						<button className={classes['form-btn']} type='submit'>
							Login
						</button>
					)}
					{isLoading && <button className={classes['form-btn']}>Loading...</button>}
				</form>
			</div>
		</>
	)
}

export default AuthForm