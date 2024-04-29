import { Component, OnInit } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css']
})
export class MaintenanceComponent implements OnInit {
 
  public routes = routes;

  ngOnInit(): void {
   
  }



  isPrivacy(id:any){
    if( id = 1  ){
      localStorage.setItem("isPrivacy", "true")
      window.location.reload()
    }
    // if( id = 2 ){
    //   localStorage.setItem("isPrivacy", "false")
    //   // window.location.reload()
    // }
  }

}
