// This function takes a component...
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
//import HOC from "../assets/authData.json";
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';


const fetchUsers = () => {
    return axios.get('assets/authData.json')
}

const ValidationAndRedirection = (WrappedComponent, props) => {
    const location = useLocation();
    const history = useHistory();
    
    useEffect(async () => {
        console.log("fetchuser_pathname", location.pathname);

        checkAuthenticationFromDB(WrappedComponent);

    }, [])

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
    const checkAuthenticationFromDB = async () => {
        let fetchedUser = await fetchUsers();
        console.log("fetchuser", fetchedUser.data.userList);
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
                return
            }
        }

        if (isAuthenticated && userData.role == "admin") {
            if (isAdminAceessPage) {
                //same page
                return <WrappedComponent {...props} />;
            }
            else {
                //home admin page
                redirectToAdminHome();

            }

        }
        else if (isAuthenticated && userData.role == "teamMember") {
            if (isteamMemberAceessPage) {
                //same page
                return <WrappedComponent {...props} />;
            }
            else {
                //home teammember page
                redirectToTeamMemberHome();
            }
        }
        else {
            //clear storage
            //default login
            localStorage.clear()
            redirectToLogin();
        }
    }

    const isAdminAceessPage = () => {
        let routePath = location.pathname;

        switch (routePath) {
            case "/admin":
                return true
            default:
                return false;
        }
    }

    const isteamMemberAceessPage = () => {
        let routePath = location.pathname;
        switch (routePath) {
            case "/teamMember":
                return true
            default:
                return false;
        }
    }

}



const HOC = (WrappedComponent) => {
    return (props) => {
        ValidationAndRedirection(WrappedComponent, props);
        // ... and renders the wrapped component with the fresh data!
        return <WrappedComponent {...props} />;
    }
}
export default HOC

