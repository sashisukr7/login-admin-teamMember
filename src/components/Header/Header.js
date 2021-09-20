import React from 'react';
import { withRouter } from "react-router-dom";
import { ACCESS_TOKEN_NAME } from '../../constants/apiConstants';
import {useSelector, useDispatch} from 'react-redux';

function Header(props) {
    const dispatch = useDispatch();
    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
    let title = capitalize(props.location.pathname.substring(1, props.location.pathname.length))
    if (props.location.pathname === '/') {
        title = 'Welcome'
    }
    function renderLogout() {
        if (props.location.pathname === '/admin' || props.location.pathname === '/teamMember') {
            return (
                <div className="ml-auto text-right col" >
                    <button className="btn btn-danger" onClick={() => handleLogout()}>Logout</button>
                </div>
            )
        }
    }
    function handleLogout() {
        dispatch({ type: 'LOGOUT' });
        localStorage.removeItem("accessToken")
        localStorage.removeItem("role")
        //localStorage.clear()
        props.history.push('/login')
        props.updateTitle('Login')
    }
    return (
        <nav className="navbar navbar-dark bg-white header-box-shadow" style={{display:(props.location.pathname=="/login" || props.location.pathname=="/" || props.location.pathname=="/register" )?"none":"block"}}>
            <div className="row col-12 d-flex justify-content-center text-black">
                <span className="h3 col m-l-16px text-left" >{props.title || title}</span>
                {renderLogout()}
            </div>
        </nav>
    )
}
export default withRouter(Header);
