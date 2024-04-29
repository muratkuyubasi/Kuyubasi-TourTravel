import { Component, OnInit } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import { Options } from '@angular-slider/ngx-slider';
import { RegionService } from 'src/app/services/region.service';
import { TourService } from 'src/app/services/tour.service';
import { CategoryService } from 'src/app/services/category.service';
import { PeriodService } from 'src/app/services/period.service';
import { Period } from 'src/app/models/period';
import { Region } from 'src/app/models/region';
import { Category } from 'src/app/models/category';
import { environment } from 'src/environments/environment';
interface data {
  value: string | any;
}
@Component({
  selector: 'app-listing-list',
  templateUrl: './listing-list.component.html',
  styleUrls: ['./listing-list.component.css']
})
export class ListingListComponent implements OnInit {

  public routes = routes;
  public selectedValue1: string | any;
  public selectedValue2: string | any;
  public selectedValue3: string | any;



  gettourModel!:any;
  getcategoryModel!:Category[];
  getregionModel!: Region[];
 getperiodModel!: Period[];

 path = environment.serverUrl



  constructor(private tourService:TourService,private categoryService: CategoryService, private periodService: PeriodService, private regionService: RegionService,) {
    
  }

  ngOnInit(): void {
    this.gettourlist();
    this.getcategorylist();
    this.getperiodlist();
    this.getregionlist();

  }

  gettourlist(){
    this.tourService.getList().subscribe((dataa: any)=> {
      this.gettourModel = dataa;
      console.log("Turlar Sayfa",this.gettourModel)
    })
  }

  getcategorylist() {
    this.categoryService.getList().subscribe((data: any)=> {
      this.getcategoryModel = data;
      console.log("Kategori",this.getcategoryModel)
    })
  }

  getperiodlist(){
    this.periodService.getList().subscribe((data: Period[])=> {
      this.getperiodModel = data;
      console.log("Dönemler",this.getperiodModel)

    })
  }
   getregionlist() {
      this.regionService.getList().subscribe((data: Region[]) => {
        this.getregionModel = data;
        console.log("Bölgeler",this.getregionModel)
      })
    }








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
  slidevalue: number = 55;
  options: Options = {
    floor: 0,
    ceil: 100,
  };
}
