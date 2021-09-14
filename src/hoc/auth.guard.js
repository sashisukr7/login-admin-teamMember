// This function takes a component...
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
//import HOC from "../assets/authData.json";
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import LoginForm from "../components/LoginForm/LoginForm.js";

const fetchUsers = () => {
    return axios.get('assets/authData.json')
}

const ValidationAndRedirection = (WrappedComponent, props) => {
    const location = useLocation();
    const history = useHistory();
    const [pageName, setPageName]=useState("");

    useEffect( () => {
        if(pageName)
       return pageName
       
       checkAuthenticationFromDB(WrappedComponent);

    }, [pageName])


    const redirectToAdminHome = () => {
        props.updateTitle('Home')
        history.push('/admin');
    }
    const redirectToTeamMemberHome = () => {
        props.updateTitle('Home')
        history.push('/teamMember');
    }
    const redirectToLogin = () => {
        props.updateTitle('Login')
        history.push('/login');

    }

    const checkCondition =(isAuthenticated,userData)=>
    {
        if (isAuthenticated && userData.role == "admin") {
            let iaAdminAcc=isAdminAccessPage()
            if (iaAdminAcc) {
                //same page
                setPageName("samePage")
            }
            else {
                //home admin page
                redirectToAdminHome();

            }

        }
        else if (isAuthenticated && userData.role == "teamMember") {
            let isteamMemberAcc=isteamMemberAccessPage()
            if (isteamMemberAcc) {
                //same page
                  setPageName("samePage")
            }
            else {
                //home teammember page
                redirectToTeamMemberHome();
            }
        }
          else  {
            //login
            let isPublicAcc=isPublicAccessPage()
            if (isPublicAcc) {
            localStorage.clear()
            setPageName("samePage")
        }
        else{
            localStorage.clear()
            redirectToLogin();  
        }
    }
}

    const checkAuthenticationFromDB = async () => {
        
        let fetchedUser = await fetchUsers();
        let userList = fetchedUser.data.userList;
        let userData = {}
        userData.id = localStorage.getItem('userId');
        userData.role = localStorage.getItem('role');
        userData.accessToken = localStorage.getItem('accessToken');
        let matchedWithAnyOne = false;
        let isAuthenticated = false;
        for (let i in userList) {
            if (userList[i].id == userData.id && userList[i].role == userData.role && userList[i].accessToken == userData.accessToken) {
                matchedWithAnyOne = true;
                isAuthenticated = true;
                break;
            }
        }

        checkCondition(isAuthenticated,userData);      
    }

    const isAdminAccessPage = () => {
        let routePath = location.pathname;

        if (routePath == "/admin")
            return true
        else
            return false;
    }


    const isteamMemberAccessPage = () => {
        let routePath = location.pathname;
        if (routePath == "/teamMember")
            return true
        else
            return false;
    }

    const isPublicAccessPage = () => {
        let routePath = location.pathname;
        if (routePath == "/login" || routePath == "/register")
            return true
        else
            return false;
    }
    

    if(pageName)
    {
    return pageName
        
    }
}



const HOC =  (WrappedComponent,props) => {
    return (props) => {
        let pageName = ValidationAndRedirection(WrappedComponent, props);
        // ... and renders the wrapped component with the fresh data!
        if(pageName=="samePage")
        return <WrappedComponent {...props} />;
        else
        return null
    }
}
export default HOC

