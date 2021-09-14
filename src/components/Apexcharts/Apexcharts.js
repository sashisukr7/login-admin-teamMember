
import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { mobileWidthLimit } from '../../util/apputils';

const ApexCharts = (props) => {
    const isMobileDevice = window.innerWidth < mobileWidthLimit;
    const [options, setOptions] = useState({});
    const [series, setSeries] = useState([44, 55, 41, 15]);
    const [labels, setLabels] = useState(['A', 'B', 'C', 'D']);

    return (
        <div className="pie">
            <Chart options={options} labels={labels} series={series} type="pie" width={isMobileDevice ? "320" : "380"} />
        </div>
    );

}


export default ApexCharts