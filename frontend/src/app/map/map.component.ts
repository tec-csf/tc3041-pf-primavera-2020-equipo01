import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Cases } from 'src/app/shared/models/cases';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  loading = true;
  cases: Cases[];

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.http.get(environment.apiUrl + 'cases/getAll').subscribe((res:any) => {
      this.loading = false;
      if (res.success){
        console.log(res.data)
        this.cases = res.data as Cases[]
      }
    }, error =>  console.log(error))
  }


}
