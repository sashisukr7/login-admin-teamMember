import React, { useEffect, useState, useRef } from 'react';
import '../../../App.css';
import HOC from '../../../hoc/auth.guard';
import PollRequestForm from "./PollRequestForm";

function ModifyPollRequest(props) {
  
    useEffect(() => {
       
    },[])

    return (
        <>
            <>
              <PollRequestForm fromPage="modifyPollRequest"/>
            </>
        </>

    )
}

export default HOC(ModifyPollRequest)