import React, { useEffect } from 'react';
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../../constants/apiConstants';
import axios from 'axios';
import '../../../App.css';


function Home(props) {
    useEffect(() => {
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