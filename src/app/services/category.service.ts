import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";


@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    path: string = environment.apiUrl;
    lang: string = "tr"

    constructor(
        private httpClient: HttpClient){}

        getList():any {
            return this.httpClient.get<any>(this.path+"/Category/GetAllCategoryByLang/" + this.lang);
        }

        // Tours Filtered
        getFavoriteTours(lang:string, categoryName:string):any {
            return this.httpClient.get<any>(this.path+"/ActiveTour/GetAllTourSearchByLang?LanguageCode="+lang+"&CategoryName="+categoryName);
        }
        // YurtDışıTurları
        getoverseastoursList():any {
            return this.httpClient.get<any>(this.path+"/ActiveTour/GetAllTourSearchByLang?LanguageCode=tr&CategoryName=Yurt%20D%C4%B1%C5%9F%C4%B1%20Turlar%C4%B1");
        }
        // YurtİçiTurları
        getdomestictoursList():any {
            return this.httpClient.get<any>(this.path+"/ActiveTour/GetAllTourSearchByLang?LanguageCode=tr&CategoryName=Yurt%20%C4%B0%C3%A7i%20Turlar%C4%B1");
        }
        // KültürTurları
        getculturaltoursList():any {
            return this.httpClient.get<any>(this.path+"/ActiveTour/GetAllTourSearchByLang?LanguageCode=tr&CategoryName=K%C3%BClt%C3%BCr%20Turlar%C4%B1");
        }
        // GemiTurları
        getshiptoursList():any {
            return this.httpClient.get<any>(this.path+"/ActiveTour/GetAllTourSearchByLang?LanguageCode=tr&CategoryName=Gemi%20Turlar%C4%B1");
        }
    }

        // getoverseastoursList(CategoryName: any, SearchTerm: any, ) {
        //     const url = `/ActiveTour/GetAllTourSearchByLang?LanguageCode=tr&${CategoryName='GemiTurları'}&SearchTerm=${SearchTerm}`;
        //     return this.httpClient.get(this.path + url);
        // 