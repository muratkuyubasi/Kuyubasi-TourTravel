import { Component, OnInit } from '@angular/core';
import { Setting } from 'src/app/models/settings';
import { SettingService } from 'src/app/services/setting.service';
import { routes } from 'src/app/shared/routes/routes';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  public routes = routes;
  gettourModel!:any;
  getsettinggmailModel!:Setting;
  getsettinphoneModel!:Setting;
  getinstagramModel!:Setting
  getyoutubeModel!:Setting
  getfacebookModel!:Setting
  constructor(private settingService:SettingService) {
  }
  ngOnInit(): void {
    this.getsettingphoneList()
    this.getsettingmailList()
    this.getinstgram();
    this.getfacebook();
    this.gettyoutube();
  }
  getsettingphoneList(){
    this.settingService.get("site_telefon	").subscribe((data: any)=> {
      this.getsettinphoneModel = data;
      // console.log("Telefon",this.getsettinphoneModel)
    })
  }
  getsettingmailList(){
    this.settingService.get("eposta").subscribe((data: any)=> {
      this.getsettinggmailModel = data;
      // console.log("aa",this.getsettinggmailModel)
    })
  }
  getinstgram(){
    this.settingService.get("instagram").subscribe((data: any)=> {
      this.getinstagramModel = data;
    })
  }
  getfacebook(){
    this.settingService.get("facebook").subscribe((data: any)=> {
      this.getfacebookModel = data;
    })
  }
  gettyoutube(){
    this.settingService.get("youtube").subscribe((data: any)=> {
      this.getyoutubeModel = data;
    })
  }
}