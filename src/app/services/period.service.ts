import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class PeriodService {
    path: string = environment.apiUrl;
    lang: string = "tr"

    constructor(
        private httpClient: HttpClient) { }

        getList():any {
            return this.httpClient.get<any>(this.path+"/Period/GetAllPeriodByLang/" + this.lang);
        }
}