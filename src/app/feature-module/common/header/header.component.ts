import { Component } from '@angular/core';
import { Setting } from 'src/app/models/settings';
import { SettingService } from 'src/app/services/setting.service';
import { routes } from 'src/app/shared/routes/routes';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { DataService } from 'src/app/shared/services/data/data.service';
import { SidebarService } from 'src/app/shared/services/sidebar/sidebar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  base: string = '';
  page: string = '';
  last: string = '';
  header: Array<any> = [];
  public routes = routes;
  getinstagramModel!:Setting
  getyoutubeModel!:Setting
  getfacebookModel!:Setting
  getsettinphoneModel!:Setting;
  getwhatsAppModel!:Setting;
  constructor(
    private common: CommonService,
    private data: DataService,
    private sidebar : SidebarService,
    private  settingService:SettingService
  ) {
    this.common.base.subscribe((res: any) => {
      this.base = res;
    });
    this.common.page.subscribe((res: any) => {
      this.page = res;
    });
    this.common.last.subscribe((res: any) => {
      this.last = res;
    });
    this.header = this.data.header;
  }
  ngOnInit(): void {
    this.getinstgram();
    this.getfacebook();
    this.getyoutube();
    this.getsettingphoneList();
    this.getwhatsAppList();
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
  getyoutube(){
    this.settingService.get("youtube").subscribe((data: any)=> {
      this.getyoutubeModel = data;
    })
  }
  getsettingphoneList(){
    this.settingService.get("site_telefon	").subscribe((data: any)=> {
      this.getsettinphoneModel = data;
      // console.log("Telefon",this.getsettinphoneModel)
    })
  }
  getwhatsAppList(){
    this.settingService.get("whatsapp").subscribe((data: any)=> {
      this.getwhatsAppModel = data;
    })
  }
  public toggleSidebar(): void {
    this.sidebar.openSidebar();
  }
  public hideSidebar(): void {
    this.sidebar.closeSidebar();
  }
}