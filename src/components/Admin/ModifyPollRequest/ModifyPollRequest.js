import React, { useEffect, useState, useRef } from 'react';
import '../../../App.css';
import HOC from '../../../hoc/auth.guard';
import PollRequestForm from "./PollRequestForm";

function ModifyPollRequest(props) {

    useEffect(() => {

    }, [])

    return (
        <>
            <div className="container">
                <PollRequestForm fromPage="modifyPollRequest" />
            </div>
        </>

    )
}

export default HOC(ModifyPollRequest)