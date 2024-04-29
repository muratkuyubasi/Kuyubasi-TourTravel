import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class RequestService {
    path: string = environment.apiUrl;


    constructor(
        private httpClient: HttpClient) { }

        requestSend(data: any):any{
            return this.httpClient.post<any>(this.path+"/Contact/AddTourRequest", data);
        }
    }