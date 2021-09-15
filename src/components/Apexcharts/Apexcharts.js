
import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { mobileWidthLimit } from '../../util/apputils';
import HOC from '../../hoc/auth.guard';

const ApexCharts = ({seriesParent,labelsParent}) => {
    const isMobileDevice = window.innerWidth < mobileWidthLimit;
    const [options, setOptions] = useState({});
    const [series, setSeries] = useState(seriesParent);
    const [labels, setLabels] = useState(labelsParent);
    

    //series and label array send
    useEffect(() => {
        console.log("getstate2",seriesParent,labelsParent)
        console.log("getstate223",seriesParent.seriesParent)
        setSeries(seriesParent);
        setLabels(labelsParent);
    },[seriesParent,labelsParent])


    return (
        <div className="pie">
            {console.log("getstate3")}
            <Chart options={options} labels={labels} series={series} type="pie" width={isMobileDevice ? "320" : "380"} />
        </div>
    );

}


export default  ApexCharts