import React, { useEffect, useState } from "react"
import {useParams} from "react-router-dom"

const UserDetail = () => {
    const { userId } = useParams()
    const [userDetail, setUserDetail] = useState();

    useEffect(() => {
        fetch(`https://fakestoreapi.com/users/${userId}`)
            .then(res=>res.json())
            .then(json => {
                setUserDetail(json)
            })
    }, [])
    
    return (
        <div style={{ padding: '100px'}}>
            <h1>User Detail</h1>
            <h2>Name: {userDetail?.name?.lastname} {userDetail?.name?.firstname}</h2>
            <h2>Address: {userDetail?.address?.street}</h2>
            <h2>Email: {userDetail?.email}</h2>
            <h2>City: {userDetail?.address?.city}</h2>
            <h2>Phone: {userDetail?.phone}</h2>
        </div>
    )
}

export default UserDetail