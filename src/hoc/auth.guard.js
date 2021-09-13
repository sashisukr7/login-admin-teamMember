// This function takes a component...
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
//import HOC from "../assets/authData.json";
import { useLocation } from 'react-router-dom';

const fetchUsers=()=>{
    return axios.get('assets/authData.json')
}

const ValidationAndRedirection= (props)=>
{
    const location = useLocation(); 
       
useEffect(async() => {
    console.log("fetchuser_pathname",location.pathname);

checkAuthenticationFromDB();

}, [])

const checkAuthenticationFromDB= async()=>
{
    let fetchedUser= await fetchUsers();
    console.log("fetchuser",fetchedUser.data.userList);
    let userList=fetchedUser.data.userList;
    let userData={}
    userData.id=localStorage.getItem('userId');
    userData.role=localStorage.getItem('role');
    userData.accessToken=localStorage.getItem('accessToken');
    let matchedWithAnyOne=false;
    let isAuthenticated=false;
    for(let i in userList)
    {
        if(userList[i].id == userData.id && userList[i].role == userData.role && userList[i].accessToken == userData.accessToken)
        {
            matchedWithAnyOne=true;
            isAuthenticated=true;
        }
    }

    if(isAuthenticated && userData.role=="admin")
    {
    if(isAdminAceessPage)
    {
//same page
    }
    else{

        //home admin page
    }

    }
    else if(isAuthenticated && userData.role=="teamMember")
    {
      if(isteamMemberAceessPage)
       {
      //same page
       }
    else{
        
        //home teammember page
      }
    }
 else
      {
        //clear storage
        //default login
        
      }
}

const isAdminAceessPage= ()=>
{
let routePath= window.location.pathname;

switch (routePath) {
    case "/admin":
        return true
    default:
       return false;
}
}

const isteamMemberAceessPage= ()=>
{
    let routePath= window.location.pathname;
    switch (routePath) {
        case "/teamMember":
            return true
        default:
            return false;
    }
}

}



const HOC = (WrappedComponent) =>{
return (props) => {
let redirectComponentName=ValidationAndRedirection(props);
// ... and renders the wrapped component with the fresh data!
if(redirectComponentName)
{

}
else if (redirectComponentName)
{

}

else if (redirectComponentName=="samePage"){
    return <WrappedComponent {...props}/>;
}

else
{
    //login remove local storage
    return <WrappedComponent {...props}/>

}

}
}
export default HOC