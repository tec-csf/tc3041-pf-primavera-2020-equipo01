import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  cases:any;
  deaths:any;
  recovered:any;
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.http.get('https://api.covid19api.com/world/total').subscribe((res:any) => {
      console.log(res)
      this.cases = res.TotalConfirmed
      this.deaths = res.TotalDeaths
      this.recovered = res.TotalRecovered
    }, error =>  console.log(error))
  }
    
  

}
