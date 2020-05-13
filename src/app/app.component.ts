import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private authService:AuthService,
            private router:Router){
    this.navLinks = [{path:'/newInput',label:'New Input'},
    {path:'/summary',label:'Summary'},
    {path:'/expensesByYear',label:'Expenses By Year'},
    {path:'/loans',label:'Loans'},
    {path:'/rawData',label:'Data'}];
    this.activeLink = this.navLinks[0].path;
  }    
  
  navLinks = [];
  activeLink:string;

  isAuthenticated:boolean = false;

  ngOnInit(){
    this.isAuthenticated = this.authService.autoLogin();
    if(this.isAuthenticated){
      this.router.navigate(['/newInput']);
    }else{
      this.router.navigate(['/login']);
    }
    this.checkOnAuthenticatedUser();
  }

  checkOnAuthenticatedUser(){
    this.authService.user.subscribe( userData =>{
        this.isAuthenticated = !!userData;
    });
}

}
