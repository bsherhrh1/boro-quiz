import React from 'react'

export default function MonthlyData({selectedMonth}){
    // STATE
    const {spending, income, month} = selectedMonth
    // UI
    return(
        <section id='monthly-data-container'>
         <h3>{month}</h3>
         <div id='monthly-data-items'>
             <DataItem text='Spending' value={spending} color='#428DFC'/>
             <DataItem text='Income' value={income}  color='#0CE381'/>
         </div>
        </section>
    )
}

function DataItem({
    text,
    value,
    color,
}){
    // UI
    return(
    <div id='monthly-data-item'>
        <div id='monthly-data-item-circle' style={{background:color}}></div>
        <div id='monthly-data-item-text'>
        {text}
        <strong>{value}</strong>
        </div>
    </div>
    )
}