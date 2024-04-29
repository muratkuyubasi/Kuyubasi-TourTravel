import { Component, OnInit } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import { DataService } from 'src/app/shared/services/data/data.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { TourService } from 'src/app/services/tour.service';
import { environment } from 'src/environments/environment';
import { TourResource } from 'src/app/models/tour-resource';
import { Router } from '@angular/router';
import { PeriodService } from 'src/app/services/period.service';
import { Period } from 'src/app/models/period';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { CommentService } from 'src/app/services/comment.service';
import { ContactService } from 'src/app/services/contact.service';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { Setting } from 'src/app/models/settings';
import { SettingService } from 'src/app/services/setting.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public routes = routes;
  public popularCars1: Array<any> = [];
  public popularCars2: Array<any> = [];
  public popularCars3: Array<any> = [];
  public popularCars4: Array<any> = [];
  public popularCars5: Array<any> = [];
  public popularCars6: Array<any> = [];
  public recommendedCar: Array<any> = [];
  public testimonial: Array<any> = [];
  public carTypes: Array<any> = [];
  getinstagramModel!:Setting
  getyoutubeModel!:Setting
  getfacebookModel!:Setting
  getsettinphoneModel!:Setting;
  getwhatsAppModel!:Setting;
  gettourModel!: any;
  tourResource!: TourResource;
  getsearchtour: any[] = [];
  getperiodModel!: Period[];
  getcategoryModel!: Category[];
  getcategoryShowCaseModel!: Category[];
  getoverseastoursModel: any;
  getdomestictoursModel: any
  getculturaltoursModel: any;
  getshiptoursModel!: any;
  getrezervationModel!: any;
  getcommentModel!: any;
  getrequestModel!: any;
  getannouncementModel!: any;
  path = environment.serverUrl
  selCate: any;
  constructor(private data: DataService, private tourService: TourService, private commentService: CommentService, private route: Router, private periodService: PeriodService, private categoryService: CategoryService, private contactService: ContactService, private announcementService: AnnouncementService,private  settingService:SettingService
  ) {
    
    this.popularCars1 = this.data.popularCars1;
    this.popularCars2 = this.data.popularCars2;
    this.popularCars3 = this.data.popularCars3;
    this.popularCars4 = this.data.popularCars4;
    this.popularCars5 = this.data.popularCars5;
    this.popularCars6 = this.data.popularCars6;
    this.recommendedCar = this.data.recommendedCar;
    this.testimonial = this.data.testimonial;
    this.carTypes = this.data.carTypes;
    this.tourResource = new TourResource();
    this.tourResource.pageSize = 20;
    this.tourResource.skip = 0;
    this.tourResource.orderBy = 'createdDate desc'
  }
  ngOnInit(): void {
    var mainDiv = document.getElementById('main-button');
mainDiv.addEventListener('click', function(){
  this.children.item(0).classList.toggle('fa-times');
  this.classList.toggle('open');
});
    localStorage.removeItem("TourSearch");
    this.gettourlist();
    this.getperiodlist();
    this.getcategorylist();
    this.getoverseastours();
    this.getrezervationlist();
    this.getcommentlist();
    this.getannouncementlist();
    this.getrequestList();
    this.getinstgram();
    this.getfacebook();
    this.getyoutube();
    this.getsettingphoneList();
    this.getwhatsAppList();
  }
  getannouncementlist() {
    this.announcementService.getList().subscribe((data: any[]) => {
      this.getannouncementModel = data;
      // console.log("Slider",this.getannouncementModel)
    })
  }
  searchTour() {
    this.tourService.GetsearchTour(this.tourResource.TourName, this.tourResource.PeriodName, this.tourResource.CategoryName, this.tourResource.SearchTerm, this.tourResource.RegionName, this.tourResource.MaxPrice, this.tourResource.MinPrice).subscribe((resp: any) => {
      this.getsearchtour = resp;
      localStorage.setItem('TourSearch', JSON.stringify(this.getsearchtour));
    })
    this.route.navigateByUrl("/listings/listing-grid")
  }
  gettourlist(id?: any) {
    if (id > 0) {
      this.tourService.getList().subscribe((dataa: any) => {
        this.gettourModel = dataa.filter((x: { tourCategories: any[]; }) => x.tourCategories.some((y: { categoryRecordId: any; }) => y.categoryRecordId == id));
      })
    } else {
      this.tourService.getList().subscribe((dataa: any) => {
        this.gettourModel = dataa;
      })
    }
  }
  selectCategory(event: any) {
    this.selCate = event.target.value
    console.log(this.selCate)
    this.gettourlist(this.selCate)
  }
  getperiodlist() {
    this.periodService.getList().subscribe((data: any) => {
      this.getperiodModel = data.filter((x: { isActive: any; }) => x.isActive == true)
    })
  }
  getcategorylist() {
    this.categoryService.getList().subscribe((data: any) => {
      this.getcategoryModel = data.filter((x: { isActive: any; }) => x.isActive == true)
      this.getcategoryShowCaseModel = data.filter((x: { showCase: any; }) => x.showCase);
      // console.log("Kategoriler",this.getcategoryModel)
      // console.log("Kategoriler",this.getcategoryShowCaseModel)
    })
  }
  getoverseastours() {
    this.categoryService.getoverseastoursList().subscribe((overdata: any[]) => {
      this.getoverseastoursModel = overdata;
    })
  }
  changeFavoriTour(categoryName: any) {
    this.categoryService.getFavoriteTours("tr", categoryName).subscribe((overdata: any[]) => {
      this.getoverseastoursModel = overdata;
    })
  }
  changeFeaturedTour(tourName: any) {
    this.tourService.getFeaturedTours("tr", tourName).subscribe((oversdata: any[]) => {
      this.gettourModel = oversdata;
    })
  }
  getrequestList() {
    this.contactService.getList().subscribe((data: any[]) => {
      this.getrequestModel = data;
    })
  }
  getrezervationlist() {
    this.tourService.getReservationList().subscribe((data: any[]) => {
      this.getrezervationModel = data;
    })
  }
  getcommentlist() {
    this.commentService.getCommentList().subscribe((data: any[]) => {
      this.getcommentModel = data;
    })
  }
  recommendedCarOptionsv2: OwlOptions = {
    margin: 24,
    nav: false,
    loop: true,
    dots: false,
    smartSpeed: 2000,
    navText: [
      "<i class='fa-solid fa-arrow-left'></i>",
      "<i class='fa-solid fa-arrow-right'></i>",
    ],
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 3,
      },
      1170: {
        items: 3,
      },
    },
  };
  recommendedCarOptions: OwlOptions = {
    margin: 24,
    nav: false,
    loop: true,
    dots: false,
    smartSpeed: 2000,
    navText: [
      "<i class='fa-solid fa-arrow-left'></i>",
      "<i class='fa-solid fa-arrow-right'></i>",
    ],
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 1,
      },
      1170: {
        items: 1,
      },
    },
  };
  testimonialOptions: OwlOptions = {
    margin: 24,
    nav: false,
    loop: true,
    dots: true,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      1170: {
        items: 2,
      },
    },
  };
  carTypesOptions: OwlOptions = {
    margin: 24,
    nav: false,
    loop: true,
    dots: false,
    smartSpeed: 2000,
    navText: [
      "<i class='fa-solid fa-arrow-left'></i>",
      "<i class='fa-solid fa-arrow-right'></i>",
    ],
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 5,
      },
      1170: {
        items: 5,
      },
    },
  }
  detail(id: any) {
    this.route.navigate([routes.listingDetails, id])
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
}
