import React from 'react';
import '../../App.css';


export default function Footer(props) {
    return (
        <FooterCall>
            <div className="footerFixedToBottom" >
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