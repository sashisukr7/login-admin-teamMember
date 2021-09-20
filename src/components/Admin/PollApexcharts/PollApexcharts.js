import React, { useEffect, useState, useRef } from 'react';
import '../../../App.css';
import { useSelector, useDispatch } from 'react-redux';
import HOC from '../../../hoc/auth.guard';
import Apexcharts from '../../Apexcharts/Apexcharts';
import { useLocation } from "react-router";

function PollApexcharts(props) {
    const [series, setSeries] = useState([44, 55, 41, 15]);
    const [labels, setLabels] = useState(['A', 'B', 'C', 'D']);
    let { state} = useLocation();
    let pollResponseList = useSelector(state => state.pollResponseReducer.pollResponseList);
    pollResponseList=pollResponseList.filter((item)=>item.requestId==state.pollRequestId)
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
        setSeries(seriesState)
        //setLabels(['E', 'B', 'C', 'D'])
    },[])

    return (
        <>
          <div className="container">
            <div className="d-flex align-items-center flex-column p-64px-16px" >
              <Apexcharts seriesParent={series} labelsParent={labels} />
            </div>
            </div>
        </>

    )
}

export default HOC(PollApexcharts)