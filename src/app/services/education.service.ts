import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class EducationService {
    path: string = environment.apiUrl;
    lang: string = "tr"

    constructor(
        private httpClient: HttpClient) { }

      
        educationSend(data: any):any{
            return this.httpClient.post<any>(this.path+"/Education/AddEducationForm", data);
        }
        stateList():any {
            return this.httpClient.get<any>(this.path+"/Education/GetAllState/");
        }
        mosqueList():any {
            return this.httpClient.get<any>(this.path+"/Education/GetAllMosque/");
        }
        mosqueByStateIdlist(id:any):any {
            return this.httpClient.get<any>(this.path+"/Education/GetAllMosque/" + id);
        }
        fileUpload(data:FormData): Observable<any> {
            return this.httpClient.post<any>(this.path+"/fileUpload",data)
          }
}