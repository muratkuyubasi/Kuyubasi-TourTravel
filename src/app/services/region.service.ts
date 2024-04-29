import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class RegionService {
    

    path: string = environment.apiUrl;
    lang : string = "tr"

    constructor(
        private httpClient: HttpClient) { }

    getList(): any {
        return this.httpClient.get<any>(this.path+"/Region/GetAllRegionByLang/" + this.lang);
    }
}