import React from 'react';
import { withRouter } from "react-router-dom";
import { ACCESS_TOKEN_NAME } from '../../constants/apiConstants';
function Header(props) {
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
        localStorage.removeItem(ACCESS_TOKEN_NAME)
        props.history.push('/login')
        props.updateTitle('Login')
    }
    return (
        <nav className="navbar navbar-dark bg-black">
            <div className="row col-12 d-flex justify-content-center text-white">
                <span className="h3 col m-l-16px text-left" >{props.title || title}</span>
                {renderLogout()}
            </div>
        </nav>
    )
}
export default withRouter(Header);
