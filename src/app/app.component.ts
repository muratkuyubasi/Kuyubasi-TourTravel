import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 
  title = 'dreams-rent';
  isPrivacy!:any;
  
  ngOnInit(): void {
    if(!localStorage.getItem("isPrivacy"))
    {
      // localStorage.setItem("isPrivacy","false")
      this.isPrivacy = "false"
    }
    if(localStorage.getItem("isPrivacy"))
    {
      // localStorage.setItem("isPrivacy","false")
      this.isPrivacy = "true"
    }
    // else if(localStorage.getItem("isPrivacy") == "true")
    // {
    //   // localStorage.setItem("isPrivacy","false")
    //   this.isPrivacy = "true"
    // }
    // else if(localStorage.getItem("isPrivacy") == "false")(
    //   // localStorage.setItem("isPrivacy","true"),
    //   this.isPrivacy = "false"
    // )
  }
}
