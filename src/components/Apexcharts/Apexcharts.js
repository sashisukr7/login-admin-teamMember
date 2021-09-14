
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
          categories: ["2021",]
        }
      },
      series: [
        {
          name: "option-A igiughiuh iyoiuiououo yuguyguy tuty8 iygiiiiiiiiiii ",
          data: [30]
        },
        {
            name: "option-B igiughiuh iyoiuiououo yuguyguy tuty8 iygiiiiiiiiiii ",
            data: [300]
          },
          {
            name: "option-C igiughiuh iyoiuiououo yuguyguy tuty8 iygiiiiiiiiiii ",
            data: [357]
          },
          {
            name: "option-D igiughiuh iyoiuiououo yuguyguy tuty8 iygiiiiiiiiiii ",
            data: [3044]
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