import React, {useEffect} from 'react'
import moment from 'moment';  

// CONSTS
const maxBarHeight= 30; // 30vh

const defaultInputData={
    "overall_budget": 200,
    "spending": [
    {
    "month": 10,
    "spending": 700
    },
    {
    "month": 7,
    "spending": 1000
    },
    {
    "month": 9,
    "spending": 300
    },
    {
    "month": 8,
    "spending": 200
    }
    ],
    "income": [
    {
    "month": 10,
    "income": 500
    },
    {
    "month": 9,
    "income": 500
    },
    {
    "month": 7,
    "income": 210
    },
    {
    "month": 8,
    "income": 575.55
    },
]}


export default function Chart({setSelectedMonth, selectedMonth}){
    // STATE
    let inputData = updateInputData(defaultInputData)
    const {overall_budget} = inputData
    const maxValue = calculateMaxValue(inputData)
    
    // LOGIC
    function updateInputData(data){
        sortInputData(data)
        return convertInputData(data)
    }

    function sortInputData({spending, income}){
        spending.sort((a, b) => a.month - b.month)
        income.sort((a, b) => a.month - b.month)
    }

    function convertInputData({overall_budget, spending, income}){
        spending = convertMonths(spending)
        income = convertMonths(income)
        return {overall_budget, spending, income}
    }

    function convertMonths(array){
        return array.map((element) => ({
                ...element,
                month: moment(element.month, 'MM').format('MMMM'),
                monthShort: moment(element.month, 'MM').format('MMM'),
                monthFull: element.month+' - '+moment(element.month, 'MM').format('MMMM'),
            })
        )
    }

    function calculateBudgetHeight(){
        const budgetHeight = (maxBarHeight*overall_budget) / maxValue
        return maxBarHeight-budgetHeight
    }

    function calculateMaxValue({income, spending}){
        const maxIncome=Math.max.apply(Math, income.map(function(o) { return o.income; }))  
        const maxSpending=Math.max.apply(Math, spending.map(function(o) { return o.spending; }))
        return maxIncome>maxSpending? maxIncome: maxSpending
    }

    function budgetWithCommas(x) {
        x = x.toString();
        var pattern = /(-?\d+)(\d{3})/;
        while (pattern.test(x))
            x = x.replace(pattern, "$1,$2");
        return x;
    }

    useEffect(()=>{
        const latestMonthDataIndex=inputData.spending.length-1;
        setSelectedMonth({
            income: inputData.income[latestMonthDataIndex].income,
            spending: inputData.spending[latestMonthDataIndex].spending,
            month: inputData.spending[latestMonthDataIndex].month,
        })
    },[])

    // UI
    return(
        <section>
            <div id='chart-container' style={{top:`${calculateBudgetHeight()}vh`}}>
                <div id='chart-budget'>
                    Budget
                    <br/>
                    <strong>${budgetWithCommas(overall_budget)}</strong>
                </div>
                <hr id='chart-budget-line'/>
            </div>
            <Bars inputData={inputData} maxValue={maxValue} selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth}/>
        </section>
    )
}


function Bars({inputData, maxValue, setSelectedMonth, selectedMonth}){
    // STATE
    const {income, spending} = inputData

    // UI
    return(
        <div id='chart-bars-container'>
        {spending && spending.map((element, index)=> 
            <MonthlyBar 
                key={index}
                spending={element.spending} 
                income={income[index].income}
                month={element.month}
                monthShort={element.monthShort}
                selected={selectedMonth.month===element.month}
                setSelectedMonth={setSelectedMonth}
                maxValue={maxValue}

            /> 
        )}
        </div>
    )
}

function MonthlyBar({
    spending, 
    income, 
    month, 
    monthShort,
    selected, 
    setSelectedMonth,
    maxValue,

}){
    // STATE
    const spendingBarHeight = calculateBarHeight(spending)
    const incomeBarHeight = calculateBarHeight(income)
    
    // LOGIC
    function calculateBarHeight(value){
        return ((maxBarHeight*value) / maxValue) // calculate the bar's height based on maxBarHeight
      }

    // UI
    return(
        <div id='chart-bars-coupled' onClick={()=>setSelectedMonth({spending, income, month})}>
          <div>
            <Bar type='spending' height={spendingBarHeight}/>
            <Bar type='income' height={incomeBarHeight}/>
          </div>
          {/* TODO apply gradient for font color */}
          <div id='chart-bars-coupled-label' style={{backgroundColor:`${!selected ? '#172041': 'white'}`, color:`${!selected ? 'white': '#172041'}`}}>
            {monthShort}
          </div>
        </div>
    )
}

function Bar({type, height}){
    // UI
    return(
        <div id='chart-bars-indvi' style={{ 
            backgroundColor:`${type==='spending'? '#428DFC': '#0CE381'}`, 
            height: `${height}vh`
        }}>
        </div>
    )
}