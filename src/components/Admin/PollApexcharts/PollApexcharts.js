import React, { useEffect, useState, useRef } from 'react';
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../../constants/apiConstants';
import axios from 'axios';
import '../../../App.css';
import { useSelector, useDispatch } from 'react-redux';
import {generateRandomValue} from '../../../util/apputils';
import HOC from '../../../hoc/auth.guard';
import Apexcharts from '../../Apexcharts/Apexcharts';
import { useLocation } from "react-router";

function PollApexcharts(props) {
    const dispatch = useDispatch();
    const [series, setSeries] = useState([44, 55, 41, 15]);
    const [labels, setLabels] = useState(['A', 'B', 'C', 'D']);
    let { state} = useLocation();
    let pollResponseList = useSelector(state => state.pollResponseReducer.pollResponseList);
    pollResponseList=pollResponseList.filter((item)=>item.requestId==state.pollRequestId)
    console.log("getstate1pr",pollResponseList)
    for(let i in pollResponseList )
    {
        for(let j in state.options)
        {
            if(pollResponseList[i].responseId==state.options[j].id)
            {
                state.options[j].count++
                break;
            }
        }
    }
    let seriesState=[];
    for(let k in state.options)
    {
        seriesState.push(state.options[k].count)
    }

   

    
    useEffect(() => {
        console.log("getstate1",state)
        setSeries(seriesState)

        //setSeries([4, 55, 1, 15])

        //setLabels(['E', 'B', 'C', 'D'])

        //question Id 
        //using state.pollRequestId fetch series,labels

    },[])

    return (
        <>
            <div className="d-flex align-items-center flex-column p-64px-16px" >
              <Apexcharts seriesParent={series} labelsParent={labels} />
            </div>
        </>

    )
}

export default HOC(PollApexcharts)