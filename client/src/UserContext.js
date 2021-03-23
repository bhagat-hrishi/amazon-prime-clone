import React,{useState, createContext, useEffect} from 'react'

export const UserInfoContext = createContext();

export const UserInfoProvider=(props)=>{

    const [userinfo, setUserInfo]=useState({
        name:"",
        _id:""
    });
    return (
        <UserInfoContext.Provider value={[userinfo , setUserInfo ]} >
            {props.children}
        </UserInfoContext.Provider> 
    )
}

