import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TourResource } from "../models/tour-resource";
import { Reservation } from "../models/reservation";
import { environment } from "src/environments/environment";
import { TourClick } from "../models/click";


@Injectable({
    providedIn: 'root'
})
export class TourService {

    path: string = environment.apiUrl;
    lang: string = "tr"
    



    constructor(
        private httpClient: HttpClient) { }

    getList(): any {
        return this.httpClient.get<any>(this.path + "/ActiveTour/GetAllTourByLang/" + this.lang);
    }
    getTourList(): any {
        return this.httpClient.get<any>(this.path + "/Tour/GetAllTourByLang/" + this.lang);
    }

    getid(id: string): Observable<any> {
        return this.httpClient.get<any>(this.path + "/ActiveTour/GetActiveTour/" + id)
    }

    addReservation(user: Reservation): Observable<Reservation> {
        return this.httpClient.post<any>(this.path + "/Reservation/AddTourReservation", user);
    }

    
    GetsearchTour(TourName: any, PeriodName: any, CategoryName: any, SearchTerm: any, RegionName:any, MinPrice:any,MaxPrice:any,) {
        const url = `/ActiveTour/GetAllTourSearchByLang?LanguageCode=tr&TourName=${TourName}&PeriodName=${PeriodName}&CategoryName=${CategoryName}&SearchTerm=${SearchTerm}&RegionName=${RegionName}&MinPrice=${MinPrice}&MaxPrice=${MaxPrice}`;
        return this.httpClient.get(this.path + url);

    }
    postclick(data:TourClick): Observable<TourClick> {
        return this.httpClient.post<any>(this.path + "/Tour/AddTourClick/",data)
    }
    
     getIPAddress()
      {
       return  this.httpClient.get("http://api.ipify.org/?format=json")
      }

      getReservationList(): any {
        return this.httpClient.get<any>(this.path + "/Reservation/GetAllTourReservation/");
    }
     // Tours Filtered
     getFeaturedTours(lang:string, tourName:string):any {
        return this.httpClient.get<any>(this.path+"/ActiveTour/GetAllTourSearchByLang?LanguageCode="+lang+"&TourName="+tourName);
    }
    fileUpload(data:FormData): Observable<any> {
        return this.httpClient.post<any>(this.path+"/fileUpload",data)
      }
}