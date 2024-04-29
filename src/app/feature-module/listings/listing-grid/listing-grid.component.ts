import { Component, OnInit } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import { Options } from '@angular-slider/ngx-slider';
import { DataService } from 'src/app/shared/services/data/data.service';
import { TourService } from 'src/app/services/tour.service';
import { environment } from 'src/environments/environment';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';
import { Region } from 'src/app/models/region';
import { Period } from 'src/app/models/period';
import { PeriodService } from 'src/app/services/period.service';
import { RegionService } from 'src/app/services/region.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { TourResource } from 'src/app/models/tour-resource';

interface data {
  value: string | any;
}
@Component({
  selector: 'app-listing-grid',
  templateUrl: './listing-grid.component.html',
  styleUrls: ['./listing-grid.component.css']
})
export class ListingGridComponent implements OnInit {
  public selectedValue1: string | any;
  public selectedValue2: string | any;
  public selectedValue3: string | any;
  public listingGrid: Array<any> = [];
  activeTours!: any;
  gettourModel!: any;
  getcategoryModel!: Category[];
  getregionModel!: Region[];
  getperiodModel!: Period[];
  tourResource!: TourResource;
  getsearchtour: any[] = [];
  path = environment.serverUrl
  tours: any[] = [];
  searchKey = new FormControl();
  localtour: TourResource[] = [];
  minPrice: any = 1000; //Kodun saglıklı calısabilmesi için 0 vermek yerine 1000 vermek uygun duruyor
  maxPrice: any = 0;
  constructor(private data: DataService, private tourService: TourService, private categoryService: CategoryService, private periodService: PeriodService, private regionService: RegionService, private route: Router) {
    this.tourResource = new TourResource();
    this.tourResource.pageSize = 20;
    this.tourResource.skip = 0;
    this.tourResource.orderBy = 'createdDate desc'
    this.listingGrid = this.data.listingGrid;
  }
  ngOnInit(): void {
    this.getcategorylist();
    this.getperiodlist();
    this.getregionlist();
    this.gettourList();
    localStorage.removeItem("TourSearch");
  }
  gettourList() {
    this.tourService.getList().subscribe((data: any) => {
      this.gettourModel = data;
      // this.gettourModel = data.filter((x: { isActive: any; }) => x.isActive==true)
      this.localtour = (localStorage.getItem("TourSearch") == null ? data : JSON.parse(localStorage.getItem("TourSearch") ?? ""));
      if (this.localtour.length > 0) {
        this.gettourModel = this.localtour
      } else if (this.localtour.length = 0) {
        this.gettourModel = data
      } else {
        this.gettourModel;
      }
      //#region Min ve Max price hesaplama 
      for (let index = 0; index < this.gettourModel.length; index++) {
        const element = this.gettourModel[index].tourPrices[0].price;

        if (this.minPrice > element) {
          this.minPrice = element;
        }
        if (this.maxPrice < element) {
          this.maxPrice = element;
        }
      }
      //#endregion
    })
  }
  searchTour() {
    this.tourResource.MaxPrice = this.maxPrice
    this.tourResource.MinPrice = this.minPrice
    this.tourService
      .GetsearchTour(this.tourResource.TourName, this.tourResource.PeriodName, this.tourResource.CategoryName, this.tourResource.SearchTerm, this.tourResource.RegionName, this.tourResource.MinPrice, this.tourResource.MaxPrice)
      .subscribe((resp: any) => {
        this.gettourModel = resp;
        this.getsearchtour = resp;
        localStorage.setItem('TourSearch', JSON.stringify(this.getsearchtour));
      })
  }
  genelSearch(event: any) {
    this.tourResource.SearchTerm = event.target.value
    if (this.tourResource.SearchTerm == "") {
      this.gettourModel = new Array()
    }
    if (event.target.checked) {
      this.gettourModel = new Array()
      this.searchTours()
    }
    else {
      this.gettourModel = null;
      this.gettourModel = new Array()
    }
  }
  searchTours() {
    this.tourService.GetsearchTour(this.tourResource.TourName, this.tourResource.PeriodName, this.tourResource.CategoryName, this.tourResource.SearchTerm, this.tourResource.RegionName, this.tourResource.MaxPrice, this.tourResource.MinPrice).subscribe((resp: any) => {
      // console.log(resp)
      resp.forEach((element: any) => {
        this.gettourModel.push({
          tourRecord: element.tourRecord,
          quota: element.quota,
          tourClicks: element.tourClicks,
          reservationTotalPerson: element.reservationTotalPerson,
          dayCount: element.dayCount,
          startDate: element.startDate,
          endDate: element.endDate,
          tourPrices: element.tourPrices,
          regionRecord: element.regionRecord,
          tourMedias: element.tourMedias,
          id: element.id,
        })
      });
    })
    localStorage.clear()
  }
  getcategorylist() {
    this.categoryService.getList().subscribe((data: any) => {
      this.getcategoryModel = data.filter((x: { isActive: any; }) => x.isActive == true)
    })
  }
  getperiodlist() {
    this.periodService.getList().subscribe((data: any) => {
      this.getperiodModel = data.filter((x: { isActive: any; }) => x.isActive == true)
    })
  }
  getregionlist() {
    this.regionService.getList().subscribe((data: any) => {
      this.getregionModel = data.filter((x: { isActive: any; }) => x.isActive == true)
    })
  }
  detail(id: any) {
    this.route.navigate([routes.listingDetails, id])
  }
  public routes = routes;
  slidevalue: number = 55;
  options: Options = {
    floor: 0,
    ceil: 100,
  };
  selectedList1: data[] = [
    { value: '5' },
    { value: '10' },
    { value: '15' },
    { value: '20' },
  ];
  selectedList2: data[] = [
    { value: 'Low to High' },
    { value: 'High to Low' },
  ];
  selectedList3: data[] = [
    { value: 'Popular' },
    { value: 'Toyota Camry SE 350' },
    { value: 'Audi A3 2019 new' },
    { value: 'Ferrari 458 MM Speciale' },
    { value: 'Chevrolet Camaro' },
    { value: 'Acura Sport Version' },
  ];
}


