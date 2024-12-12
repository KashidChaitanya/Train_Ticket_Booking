import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TrainService } from './service/train.service';
import { APIResponse, Customer } from './model/train';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
 
  registerObj: Customer = new Customer();
  trainService = inject(TrainService);
  loginObj: any = {
    "phone": "",
    "password": ""
  };
  loggedUser: Customer = new Customer();

  constructor() {
    const localData = localStorage.getItem('trainApp');
    if(localData != null) {
      this.loggedUser =  JSON.parse(localData)
    }

  }

  onLogOff() {
    this.loggedUser = new Customer();
    localStorage.removeItem("trainApp")
  }


  onRegister() {
    this.trainService.createNewCustomer(this.registerObj).subscribe((res:APIResponse)=>{
      if(res.result) {
        alert("Registration Success")
        this.closeRegister();
      } else {
        alert(res.message)
      }
    })
  }

  onLogin() {
    this.trainService.onLogin(this.loginObj).subscribe((res:APIResponse)=>{
      if(res.result) {
        alert("Login Success");
        localStorage.setItem('trainApp', JSON.stringify(res.data));
        this.loggedUser = res.data;
        this.closeLogin();
      } else {
        alert(res.message)
      }
    })
  }
  openRegister() {
    const model =  document.getElementById("registerModel");
    if(model != null) {
      model.style.display = 'block'
    }
  }
  openLogin() {
    const model =  document.getElementById("loginModel");
    if(model != null) {
      model.style.display = 'block'
    }
  }
  closeRegister() {
    const model =  document.getElementById("registerModel");
    if(model != null) {
      model.style.display = 'none'
    }
  }
  closeLogin() {
    const model =  document.getElementById("loginModel");
    if(model != null) {
      model.style.display = 'none'
    }
  }
}
