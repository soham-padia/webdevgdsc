import {Component, Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
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

export class QandA{
  constructor(public question:string,
              public options:string[]) {
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

  // @ts-ignore
  impData:QandA[]

  count=0
  cards:Card[]=[]
  answer: number[]=[];
  constructor(private http:HttpClient) { }

  getAns(value:number,question:string) {
    console.log("sd", question)
    if (value == 1) {
      this.count++
    }
    /*for (let i = 0; i<this.cards.length;i++){
      if (this.cards[i].question==question){
        this.cards[i]==null
      }
    }*/
    let index = this.cards.findIndex(x => x.question === question)
    this.cards[index].question=""
    console.log("skjdasjgb",this.cards[index])

  }

  private async fetchData(){
    this.http.get<any>(route).subscribe(
      res=>{
        this.fetchedData=res
        this.fetchedData.results.map((value, index) => {

          this.cards[index]=value/*
          let question=value.question
          let options=[value.correct_answer,...value.incorrect_answers]
          this.impData[index]={question,options}*/
          console.log("ok")
        })
        console.log("1222",this.cards)
        console.log("hjsaduyj",this.impData)
      }
    );

  }
  ngOnInit(): void {
    this.fetchData()
    this.getImpData()
    console.log(this.cards)


  }

  async getImpData(){
    for (let i = 0; i < this.cards.length; i++) {
      this.impData[i].question=this.cards[i].question
      let answers:string[]=[this.cards[i].question,...this.cards[i].incorrect_answers]
      this.impData[i].options=answers
    }
    console.log("okkkkk",this.impData)
  }

  decode(s: string) {
    return decode(s)
  }
}
