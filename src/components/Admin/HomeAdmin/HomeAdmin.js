import React, { useEffect } from 'react';
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../../constants/apiConstants';
import axios from 'axios';
import '../../../App.css';
import {useSelector, useDispatch} from 'react-redux';

function Home(props) {
    const userList = useSelector(state => state.registedReducer.userList)

 
    useEffect(() => {
        console.log("sssStateRAdmin",userList)
        axios.get(API_BASE_URL + '/user/me', { headers: { 'token': localStorage.getItem(ACCESS_TOKEN_NAME) } })
            .then(function (response) {
                if (response.status !== 200) {
                    //   redirectToLogin()
                }
            })
            .catch(function (error) {
                // redirectToLogin()
            });
    })
    function redirectToLogin() {
        // props.history.push('/login');
    }
    return (
        <>
            add query
        </>

    )
}

export default Home;