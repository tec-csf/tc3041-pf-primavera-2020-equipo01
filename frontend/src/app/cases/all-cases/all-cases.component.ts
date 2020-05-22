import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Cases } from 'src/app/shared/models/cases';
import * as Papa from 'papaparse';
declare var swal: any;
declare var $: any;

@Component({
  selector: 'app-all-cases',
  templateUrl: './all-cases.component.html',
  styleUrls: ['./all-cases.component.scss']
})
export class AllCasesComponent implements OnInit {
  loading = true;
  json:String;
  cases: Cases[];
  p: number = 1;
  casesCSV: [];

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.http.get(environment.apiUrl + 'cases/getAll').subscribe((res:any) => {
      this.loading = false;
      if (res.success){
        this.cases = res.data as Cases[]
      }
    }, error =>  console.log(error))
  }

  delete(id: string){
    swal({
      title: 'Are you sure you want to delete?',
      text: "",
      type: '',
      showCancelButton: true,
      confirmButtonText: 'YES, DELETE!',
      cancelButtonText: 'CANCEL'
    }).then((result) => {    
      this.http.delete(environment.apiUrl + 'cases/delete/' + id.toString()).subscribe((res:any) => {
        if (res.success){
          swal("The case has been deleted");
          this.http.get(environment.apiUrl + 'cases/getAll').subscribe((res:any) => {
            if (res.success){
              this.cases = res.data as Cases[]
            }
          })
        }
      })
    }, (cancel) => {});
  }


  openModal(query){
    this.json = "loading.."
    this.http.get(environment.apiUrl + 'cases/' +  query).subscribe((res:any) => {
      if (res.success){
        this.json = JSON.stringify(res.data)
      }
    })
  }

  addCSV() {
    this.http.post(environment.CSV + 'cases/addCSV', this.casesCSV).subscribe((res:any) => {
      console.log(res)
      res.forEach(r => {   
        if (r.success){
          swal("The case has been added");
        } else {
          swal(r.msg);
        }
      });
    })
  }

  onChange(files: File[]) {
    if (files[0]) {
      Papa.parse(files[0], {
        header: true,
        skipEmptyLines: true,
        complete: (result, file) => {
          this.casesCSV = result.data;
        }
      });
    }
  }

}
