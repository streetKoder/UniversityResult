import { Component, OnInit } from '@angular/core';
import { AccountService } from "../services/account.services";
import { results } from "../constant";
import { HomeService } from '../services/home.services';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  result: any =[];
  userError : boolean = false;
  searchReg:any;
  resultAvailable : boolean = false;

  constructor(
    private accountService: AccountService,
    private homeService: HomeService,
    private router :Router
  ) { }

  ngOnInit(): void {
    var userDetails = localStorage.getItem(('user'));
    if(!userDetails)
    {
      alert("User Login not valid!! Please Login again.");
      this.router.navigateByUrl('/login');
    }
  }

  checkText(event: any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  checkResults(regNumber: any) {
    this.homeService.checkResult(regNumber)
      .subscribe(
        {
          next: (res) => {
              if(res && res.length >0)
              {
                
                  this.result = res[0].result.map(x=>x);
                  this.userError = false;
                  setTimeout(() => {
                    this.resultAvailable = true;
                  }, 1000);
              }
              else
              {
                setTimeout(() => {
                  this.resultAvailable = false;
                }, 1000);
                this.userError = true;
              }
          },
          error: error => {
            setTimeout(() => {
              this.resultAvailable = false;
            }, 1000);
            this.userError = true;
            alert(error);
          }


        }
      );
  }

}
