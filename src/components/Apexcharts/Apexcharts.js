
import React, { useState,useEffect } from "react";
import Chart from "react-apexcharts";
import {mobileWidthLimit} from '../../util/apputils';

const ApexCharts=(props)=> {
const isMobileDevice= window.innerWidth < mobileWidthLimit;
 const [state, setState] =useState( {
      options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: ["A","B","C","D"]
        }
      },
      series: [
        {
          name: "series-1 igiughiuh iyoiuiououo yuguyguy tuty8 iygiiiiiiiiiii ",
          data: [30, 400, 2505, 5000]
        },

      ]
    })
 

  
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={state.options}
              series={state.series}
              type="bar"
              width={isMobileDevice?"320":"500"}
            />
          </div>
        </div>
      </div>
    );
  
}

  
  export default ApexCharts