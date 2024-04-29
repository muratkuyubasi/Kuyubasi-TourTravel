import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ContactService {
    path: string = environment.apiUrl;
    lang: string = "tr"


    constructor(
        private httpClient: HttpClient) { }

        contactSend(data: any):any{
            return this.httpClient.post<any>(this.path+"/Contact/AddContactMessage", data);
        }
        requestSend(data: any):any{
            return this.httpClient.post<any>(this.path+"/Contact/AddTourRequest", data);
        }
        getList():any {
            return this.httpClient.get<any>(this.path+"/Contact/GetAllTourRequests/");
        }
    }