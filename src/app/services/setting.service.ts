import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";


@Injectable({
    providedIn: 'root'
})
export class SettingService {
    path: string = environment.apiUrl;
    constructor(
        private httpClient: HttpClient) { }
    // AppSettings
    get(key: string): any {
        return this.httpClient.get<any>(this.path + "/AppSetting/key/3fa85f64-5717-4562-b3fc-2c963f66afa6?key=" + key);
    }
}