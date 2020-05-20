import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Businesses } from 'src/app/shared/models/businesses';
declare var swal: any;

@Component({
  selector: 'app-all-businesses',
  templateUrl: './all-businesses.component.html',
  styleUrls: ['./all-businesses.component.scss']
})
export class AllBusinessesComponent implements OnInit {
  json = ""
  businesses: Businesses[];
  p: number = 1;
  loading = true;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.http.get(environment.apiUrl + 'businesses/getAll').subscribe((res:any) => {
      this.loading = false;
      if (res.success){
        this.businesses = res.data as Businesses[]
      }
    })
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
      this.http.delete(environment.apiUrl + 'businesses/delete/' + id.toString()).subscribe((res:any) => {
        if (res.success){
          swal("The business has been deleted");
          this.http.get(environment.apiUrl + 'businesses/getAll').subscribe((res:any) => {
            if (res.success){
              this.businesses = res.data as Businesses[]
            }
          })
        }
      })
    }, (cancel) => {});
  }

  openModal(query){
    this.json = "loading.."
    this.http.get(environment.apiUrl + 'businesses/' +  query).subscribe((res:any) => {
      if (res.success){
        this.json = JSON.stringify(res.data)
      }
    })
  }
}
