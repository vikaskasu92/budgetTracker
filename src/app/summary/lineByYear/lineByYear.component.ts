import { Component, OnInit, Input } from '@angular/core';
import { ChartMaker } from 'src/app/shared/services/chartMaker.service';
import { DataRetrieval } from 'src/app/shared/services/dataRetrieval.service';

@Component({
    selector:'app-lineByYear',
    templateUrl:'./lineByYear.component.html',
    styleUrls:['./lineByYear.component.css']
})
export class LineByYear implements OnInit{

    constructor(private chartMaker:ChartMaker, 
        private dataRetrieval:DataRetrieval
        ){}

    chart:Chart;
    yearsArray = [];
    expenseArray = [];
    yearsData = [];
    @Input()endYear;
    @Input()startYear;

    ngOnInit(){
        this.yearsData.push(this.startYear+"-01-01");
        this.yearsData.push(this.endYear+"-12-31");
        this.getOverallYearlyExpenses(this.yearsData);
    }

    getOverallYearlyExpenses(yearsData:any){
        this.dataRetrieval.getOverallYearlyExpenses(yearsData).subscribe( response => {
            this._buildOverallYearlyExpensesInputData(response);
            this.chart = this.chartMaker.createYearExpenseLineChart("lineYearExpenses",this.yearsArray,this.expenseArray,"Overall Expenses");
        }),failure =>{
            console.log("Error Occured in data Retrieval!");
        }
    }

    private _buildOverallYearlyExpensesInputData(response:any){
        for(let i=0; i<Object.values(response.yearlyExpenseSummary).length; i++){
            this.yearsArray.push(Object.values(response.yearlyExpenseSummary)[i]["yearlyExpenseSummaryDate"].substring(0,4));
            this.expenseArray.push(Object.values(response.yearlyExpenseSummary)[i]["yearlyExpenseSummaryPrice"]);
        }
    }

}