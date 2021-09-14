import React, { useEffect, useState, useRef } from 'react';
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../../constants/apiConstants';
import axios from 'axios';
import '../../../App.css';
import { useSelector, useDispatch } from 'react-redux';
import {generateRandomValue} from '../../../util/apputils';
import HOC from '../../../hoc/auth.guard';
import Apexcharts from '../../Apexcharts/Apexcharts';

function PollApexcharts(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("sssStateRAdmin")
    },[])

    return (
        <>
            <div className="d-flex align-items-center flex-column p-64px-16px" >
              <Apexcharts />
            </div>
        </>

    )
}

export default HOC(PollApexcharts)