import React, { useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import {useNavigate, useParams} from "react-router-dom"

import classes from './UserEditData.module.css'
import UserProvider from "../store/user-context";

const UserEditData = () => {
    const { userId } = useParams()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [userDetail, setUserDetail] = useState();
    const [setListOfUsers] = useContext(UserProvider);

    const {
		register,
        reset,
		handleSubmit,
		formState: { errors },
	} = useForm()

    useEffect(() => {
        fetch(`https://fakestoreapi.com/users/${userId}`)
            .then(res=>res.json())
            .then(json => {
                setUserDetail(json)
            })
        }, [])
        
    useEffect(() => {
        reset({
            firstname: userDetail?.name?.firstname,
            lastname: userDetail?.name?.lastname,
            address: userDetail?.address?.street,
            email: userDetail?.email,
            city: userDetail?.address?.city,
            phone: userDetail?.phone,
        })
    }, [reset, userDetail])

    const onSubmit = async (data) => {
		setIsLoading(true)

		await fetch(`https://fakestoreapi.com/users/${userId}`,{
            method:"PATCH",
            body:JSON.stringify(
                {
                email: data?.email,
                username: userDetail?.username,
                password: userDetail?.password,
                name:{
                    firstname: data?.firstname,
                    lastname: data?.lastname
                },
                address: {
                    city: data?.city,
                    street: data?.address,
                    number: userDetail?.address.number,
                    zipcode: userDetail?.address.zipcode,
                    geolocation:{
                        lat: userDetail?.address?.geolocation?.lat,
                        long: userDetail?.address?.geolocation?.long,
                    }
                },
                phone: data?.phone,
                }
            )
        })
        .then(res=>{
            setIsLoading(false)
            return res.json()
        })
        .then(json=>{
            setListOfUsers(existingItems => {
                return [
                    ...existingItems.slice(0, userId - 1),
                        {
                        id: userId,
                        email: data?.email,
                        username: userDetail?.username,
                        password: userDetail?.password,
                        name:{
                            firstname: data?.firstname,
                            lastname: data?.lastname
                        },
                        address: {
                            city: data?.city,
                            street: data?.address,
                            number: userDetail?.address.number,
                            zipcode: userDetail?.address.zipcode,
                            geolocation:{
                                lat: userDetail?.address?.geolocation?.lat,
                                long: userDetail?.address?.geolocation?.long,
                            }
                        },
                        phone: data?.phone,
                    }, // insert updated input
                    ...existingItems.slice(parseInt(userId, 10))
                ]
              })
            navigate('/');
        })
        .catch(e => console.error(`error ${e}`))
	}
    
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Edit User Data</h1>
                {/* First Name Edit Input */}
                <div className="input-group mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-default">First Name</span>
                    <input
                        placeholder='Input First Name'
                        {...register('firstname')}
                    />
                </div>
                {/* Last Name Edit Input */}
                <div className="input-group mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-default">Last Name</span>
                    <input
                        placeholder='Input Last Name'
                        {...register('lastname')}
                    />
                </div>
                {/* Address Edit Input */}
                <div className="input-group mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-default">Address</span>
                    <input
                        placeholder='Address'
                        {...register('address')}
                    />
                </div>
                {/* Email Edit Input */}
                <div className="input-group mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-default">Email</span>
                    <input
                        placeholder='Input Email'
                        {...register('email')}
                    />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-default">City</span>
                    <input
                        placeholder='Input City'
                        {...register('city')}
                    />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-default">Phone Number</span>
                    <input
                        placeholder='Input Phone Number'
                        {...register('phone')}
                    />
                </div>
                {!isLoading && (
                    <button className={classes['form-btn']} type='submit' onClick={handleSubmit(onSubmit)}>
                        Login
                    </button>
                )}
                {isLoading && <button className={classes['form-btn']}>Loading...</button>}
		    </form>
        </div>
    )
}

export default UserEditData