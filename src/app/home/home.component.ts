import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router : Router, private authServ: AuthService) { }

  ngOnInit() {
  }

  onLoadServers(){
    //bla bla bla
    //loading the server
    this.router.navigate(['servers'])
  }
  
  onLogin(){
    this.authServ.login();
  }

  onLogout(){
    this.authServ.logout();

  }

}
