import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  loggin = false;
  sub:any
  constructor(
    private authService: AuthService,
    private router: Router
  ) { 
    this.sub = this.authService.isLogged().subscribe(res => {
      this.loggin = res;
    })
  }

  ngOnInit() {
  }

  loggOut(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }

}
