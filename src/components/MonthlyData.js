import React from 'react'

export default function MonthlyData({selectedMonth}){
    // STATE
    const {spending, income, month} = selectedMonth
    // UI
    return(
        <section style={{display:'flex', flexDirection:'column', marginLeft:'3rem'}}>
         <h3>{month}</h3>
         <div style={{display:'flex'}}>
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
    <div style={{display:'flex', alignItems:'baseline', marginRight:'2.5rem'}}>
        <div style={{background:color, width:'1rem', height:'1rem', borderRadius:'50%', marginRight:'0.5rem'}}></div>
        <div style={{display: 'flex',flexDirection:'column'}}>
        {text}
        <strong>{value}</strong>
        </div>
    </div>
    )
}