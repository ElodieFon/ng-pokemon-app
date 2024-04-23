import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  message: string = 'Vous etes déconnecté.';
  name: string;
  password: string;
  auth : AuthService;
  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit() {
    this.auth = this.authService;
  }
  setMessage() {
    if (this.authService.isLoggedIn) {
      this.message = 'vous etes connecté.'
    }
    else {
      this.message = 'identifiant ou mot de passe inccorect.'
    }
  }
  login() {
    this.message = 'Tentative de connexion en cour';
    this.authService.login(this.name, this.password)
      .subscribe(
        (isLoggedIn: boolean) => {
          this.setMessage();
          if(isLoggedIn){
            this.router.navigate(['/pokemons'])
          }else{
            this.password =''
            this.router.navigate(['/login'])
          }
          
        }
      )
  }
  logout() {
    this.authService.logout();
    this.message='vous etes déconnecté'
  }

}
