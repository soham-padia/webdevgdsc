import {Component, Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {lastValueFrom, map, Observable, pluck, throwError} from "rxjs";
import {observableToBeFn} from "rxjs/internal/testing/TestScheduler";
import {animate} from "@angular/animations";
import {decode} from "html-entities";
const route:string="https://opentdb.com/api.php?amount=10"
export class Card{
  constructor(public category:string,
              public type:string,
              public difficulty:string,
              public question:string,
              public correct_answer:string,
              public incorrect_answers:string[]) {
  }
}
export class ResponseApi{
  constructor(public response_code:number,
              public results:Card[]) {

  }
}
@Injectable({
  providedIn:"root"
})
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  valueFromRadio=0;
  fetchedData: ResponseApi ={
    response_code:1,
    results:[]
  };
  count=0
  cards:Card[]=[]
  answer: number[]=[];
  constructor(private http:HttpClient) { }
  getAns(value:number,question:string){
    console.log("sd",question)
    if (value==1){
      this.count++
    }
    for (let i = 0; i<this.cards.length;i++){
      if (this.cards[i].question==question){
        this.cards[i]==null
      }
    }
  }
  private async fetchData(){
    this.http.get<any>(route).subscribe(
      res=>{
        this.fetchedData=res
        this.fetchedData.results.map((value, index) => {
          this.cards[index]=value
        })
        console.log("1222",this.cards)
      }
    );
  }
  ngOnInit(): void {
    this.fetchData()
    console.log(this.cards)

  }
  decode(s: string) {
    return decode(s)
  }
}
