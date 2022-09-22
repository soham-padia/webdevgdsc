import {Component, Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {lastValueFrom, map, Observable, pluck, throwError} from "rxjs";
import {observableToBeFn} from "rxjs/internal/testing/TestScheduler";
import {animate} from "@angular/animations";
import {decode} from "html-entities";

const route:string="https://opentdb.com/api.php?amount=10"

/*interface Card{
  category:string,
  type:string,
  difficulty:string,
  question:string,
  correct_answer:string,
  incorrect_answers:string[]
}*/

export class Card{
  constructor(public category:string,
              public type:string,
              public difficulty:string,
              public question:string,
              public correct_answer:string,
              public incorrect_answers:string[]) {
  }
}

// interface responseApi{
//   response_code:number,
//   results:Card[]
// }

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

  fetchedData: ResponseApi ={
    response_code:1,
    results:[]
  };

  cards:any[]=[]

  constructor(private http:HttpClient) { }

  private async fetchData(){
    /*try {
      let data
      await this.http.get(route).subscribe((res)=>{
        data= res
        console.log("321",this.fetchedData)
      })
      // @ts-ignore
      data?.results.map((value, index) => {
        this.cards[index]=value
      })
    }catch (error){
      // @ts-ignore
      alert(error.message)
    }finally {
      console.log(this.cards)
    }*/

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
