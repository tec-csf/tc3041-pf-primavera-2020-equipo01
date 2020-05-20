import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Locations } from 'src/app/shared/models/locations';
import { environment } from 'src/environments/environment';
import { Form, NgForm } from '@angular/forms';
declare var swal: any;

@Component({
  selector: 'app-form-locations',
  templateUrl: './form-locations.component.html',
  styleUrls: ['./form-locations.component.scss']
})
export class FormLocationsComponent implements OnInit {
  edit = false
  location:Locations = new Locations();
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute 
  ) {
    this.route.paramMap.subscribe(paramMap => {
			if (paramMap.has('id')) {
			  this.http.get(environment.apiUrl + 'locations/get/'+ paramMap.get('id')).subscribe((res:any) => {
          if(res.success){
            this.location =  res.data;
            this.edit = true;
          }
			  })
			};
		  });
   }

  ngOnInit() {
  }

  submit(f:NgForm){
    if(!f.valid){
      swal("Form is not valid, check all fields");
      return;
    }
    if (this.edit){
      this.http.put(environment.apiUrl + 'locations/update/'+ this.location._id, this.location).subscribe((res:any) => {
        if(res.success){
          swal("The location has been updated!")
        }
      })
    }
    else{
      this.location._id = Math.floor(Math.random() * 100000000)
      this.http.post(environment.apiUrl + 'locations/add', this.location).subscribe((res:any) => {
        if(res.success){
          swal("The location has been added!")
        }
      })
    }
  }

}
