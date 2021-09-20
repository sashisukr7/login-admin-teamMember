import React from 'react';
import '../../App.css';
import { withRouter } from "react-router-dom";


 function Footer(props) {
    return (
        <FooterCall >
            <div className="footerFixedToBottom" style={{display:(props.location.pathname=="/login" || props.location.pathname=="/")?"none":"block"}}>
                <div className="cenContainer">
                    <div className="cenContainerAbsolute">
                        <span>Copyright © 2021 Admin TeamMember.</span>
                        <span>
                            <a href="#!">Terms</a> | <a href="#!">Privacy Policy</a>
                        </span>
                    </div >
                </div>
            </div>
        </FooterCall>
    )

}

function FooterCall({ children }) {
    return <footer className="app-footer" >{children}</footer>;
}

export default withRouter(Footer);