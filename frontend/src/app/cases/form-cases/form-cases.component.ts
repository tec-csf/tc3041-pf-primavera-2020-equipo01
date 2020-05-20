import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Cases } from 'src/app/shared/models/cases';
import { environment } from 'src/environments/environment';
import { Form, NgForm } from '@angular/forms';
declare var swal: any;

@Component({
  selector: 'app-form-cases',
  templateUrl: './form-cases.component.html',
  styleUrls: ['./form-cases.component.scss']
})
export class FormCasesComponent implements OnInit {
  edit = false
  case:Cases = new Cases();
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute 
  ) {
    this.route.paramMap.subscribe(paramMap => {
			if (paramMap.has('id')) {
			  this.http.get(environment.apiUrl + 'cases/get/'+ paramMap.get('id')).subscribe((res:any) => {
          if(res.success){
            this.case =  res.data;
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
      this.http.put(environment.apiUrl + 'cases/update/'+ this.case._id, this.case).subscribe((res:any) => {
        if(res.success){
          swal("The case has been updated!")
        }
      })
    }
    else{
      this.case._id = Math.floor(Math.random() * 100000000)
      this.http.post(environment.apiUrl + 'cases/add', this.case).subscribe((res:any) => {
        if(res.success){
          swal("The case has been added!")
        }
      })
    }
  }

}
