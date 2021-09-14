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
    const [pageName, setPageName]=useState("");

    useEffect(async () => {
        console.log("fetchuser_pathname", location.pathname);
      
        if(pageName)
      return pageName
       
      await checkAuthenticationFromDB(WrappedComponent);

    }, [pageName])


    const redirectToAdminHome = () => {
       // props.updateTitle('Home')
        history.push('/admin');
    }
    const redirectToTeamMemberHome = () => {
      //  props.updateTitle('Home')
        history.push('/teamMember');
    }
    const redirectToLogin = () => {
       // props.updateTitle('Login')
       console.log("pageName31",pageName)
        history.push('/login');
        console.log("pageName32",pageName)

    }

    const checkCondition =async(isAuthenticated,userData)=>
    {
        if (isAuthenticated && userData.role == "admin") {
            let iaAdminAcc=isAdminAceessPage()
            if (iaAdminAcc) {
                //same page
                console.log("pageName1acc",iaAdminAcc)
              await  setPageName("samePage")
                console.log("pageName1",pageName)
              //  return "samePage"
            }
            else {
                //home admin page
                console.log("pageName12",pageName)
                redirectToAdminHome();

            }

        }
        else if (isAuthenticated && userData.role == "teamMember") {
            let isteamMemberAcc=isteamMemberAceessPage()
            if (isteamMemberAcc) {
                //same page
                console.log("pageName21",pageName)
                await  setPageName("samePage")

                //return "samePage"
            }
            else {
                //home teammember page
                console.log("pageName22",pageName)
                redirectToTeamMemberHome();
            }
        }
        else {
            //clear storage
            //default login
            console.log("pageName3",pageName)
            localStorage.clear()
            redirectToLogin();
        }
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
                break;
            }
        }

       await checkCondition(isAuthenticated,userData);

      
    }

    const isAdminAceessPage = () => {
        let routePath = location.pathname;

        if (routePath == "/admin")
            return true
        else
            return false;
    }


    const isteamMemberAceessPage = () => {
        let routePath = location.pathname;
        if (routePath == "/teamMember")
            return true
        else
            return false;
    }
 console.log("pageNames",pageName)
    if(pageName)
    {
    return pageName
        
    }

}



const HOC =  (WrappedComponent) => {
    return (props) => {
        let pageName = ValidationAndRedirection(WrappedComponent, props);
        // ... and renders the wrapped component with the fresh data!
      console.log("pagenameh",pageName)
        if(pageName=="samePage")
        return <WrappedComponent {...props} />;
        else
        return null
    }
}
export default HOC

