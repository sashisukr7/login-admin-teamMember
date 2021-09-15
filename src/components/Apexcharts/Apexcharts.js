
import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { mobileWidthLimit } from '../../util/apputils';

const ApexCharts = ({seriesParent,labelsParent}) => {
    const isMobileDevice = window.innerWidth < mobileWidthLimit;
    const [options, setOptions] = useState({});
    const [series, setSeries] = useState(seriesParent);
    const [labels, setLabels] = useState(labelsParent);
   
    useEffect(() => {
        setSeries(seriesParent);
        setLabels(labelsParent);
    },[seriesParent,labelsParent])


    return (
        <div className="pie">
            <Chart options={options} labels={labels} series={series} type="pie" width={isMobileDevice ? "320" : "380"} />
        </div>
    );

}


export default  ApexCharts