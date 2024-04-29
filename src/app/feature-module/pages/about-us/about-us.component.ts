import { Component, OnInit } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import { DataService } from 'src/app/shared/services/data/data.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Setting } from 'src/app/models/settings';
import { SettingService } from 'src/app/services/setting.service';
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
})
export class AboutUsComponent implements OnInit {
  public carousel: Array<any> = [];
  public routes = routes;
  getaboutModel!: Setting;
  constructor(public data: DataService, private settingService: SettingService) {
    this.carousel = this.data.carousel;
  }
  ngOnInit(): void {
    this.getettingsaboutList()
  }
  getettingsaboutList() {
    this.settingService.get("hakkimizda").subscribe((data: any) => {
      this.getaboutModel = data;
    })
  }
}