import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Locations } from 'src/app/shared/models/locations';
declare var swal: any;

@Component({
  selector: 'app-all-locations',
  templateUrl: './all-locations.component.html',
  styleUrls: ['./all-locations.component.scss']
})
export class AllLocationsComponent implements OnInit {
  link = environment.apiUrl
  locations: Locations[];
  loading = true;
  p: number = 1;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.http.get(environment.apiUrl + 'locations/getAll').subscribe((res:any) => {
      this.loading = false;
      if (res.success){
        this.locations = res.data as Locations[]
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
      this.http.delete(environment.apiUrl + 'locations/delete/' + id.toString()).subscribe((res:any) => {
        if (res.success){
          swal("The location has been deleted");
          this.http.get(environment.apiUrl + 'locations/getAll').subscribe((res:any) => {
            if (res.success){
              this.locations = res.data as Locations[]
            }
          })
        }
      })
    }, (cancel) => {});
  }

}
