import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  cases:any;
  deaths:any;
  recovered:any;
  news: [];
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    // Stats
    this.http.get('https://api.covid19api.com/world/total').subscribe((res:any) => {
      console.log(res)
      this.cases = res.TotalConfirmed
      this.deaths = res.TotalDeaths
      this.recovered = res.TotalRecovered
    }, error =>  console.log(error))
    // News TODO
    // http://newsapi.org/v2/top-headlines?q=Coronavirus&from=2020-05-28&category=general&sortBy=popularity&apiKey=73930ae77d0d4ebaae0b7db2cc74b0f5
    // environment.news + 'news'
    this.http.get('http://newsapi.org/v2/top-headlines?q=Coronavirus&from=2020-05-28&category=general&sortBy=popularity&apiKey=73930ae77d0d4ebaae0b7db2cc74b0f5').subscribe((res:any) => {
      console.log(res)
      this.news = res.articles;
    }, error =>  console.log(error))
  }
    
  

}
