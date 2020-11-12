import React, { useState } from 'react'
import MonthlyData from './MonthlyData'
import Chart from './Chart'

export default function Widget(){
    // STATE
    let [selectedMonth, setSelectedMonth] = useState({})

    // UI
    return(
    <>
      <MonthlyData selectedMonth={selectedMonth}/>
      <Chart selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth}/> 
    </>
    )
}