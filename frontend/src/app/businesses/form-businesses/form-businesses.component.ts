import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Businesses } from 'src/app/shared/models/businesses';
import { environment } from 'src/environments/environment';
import { Form, NgForm } from '@angular/forms';
declare var swal: any;

@Component({
  selector: 'app-form-businesses',
  templateUrl: './form-businesses.component.html',
  styleUrls: ['./form-businesses.component.scss']
})
export class FormBusinessesComponent implements OnInit {
  edit = false
  business:Businesses = new Businesses();
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute 
  ) {
    this.route.paramMap.subscribe(paramMap => {
			if (paramMap.has('id')) {
			  this.http.get(environment.apiUrl + 'businesses/get/'+ paramMap.get('id')).subscribe((res:any) => {
          if(res.success){
            this.business =  res.data;
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
      this.http.put(environment.apiUrl + 'businesses/update/'+ this.business._id, this.business).subscribe((res:any) => {
        if(res.success){
          swal("The business has been updated!")
        }
      })
    }
    else{
      this.business._id = Math.floor(Math.random() * 100000000)
      this.http.post(environment.apiUrl + 'businesses/add', this.business).subscribe((res:any) => {
        if(res.success){
          swal("The business has been added!")
        }
      })
    }
  }
}
