import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class TestService {
    path: string = environment.apiUrl;
    lang: string = "tr"

    constructor(
        private httpClient: HttpClient) { }

    public getList(): any {
        return this.httpClient.get<any>("/ActiveTour/GetAllTourByLang"+ this.lang);
    }
}