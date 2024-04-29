import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class CommentService {
    path: string = environment.apiUrl;


    constructor(
        private httpClient: HttpClient) { }

        commentSend(data: any):any{
            return this.httpClient.post<any>(this.path+"/TourComment/AddTourComment", data);
        }
        getid(id: string): Observable<any> {
            return this.httpClient.get<any>(this.path + "/TourComment/GetTourCommentByMainId?activeTourId=" + id)
        }
        getCommentList(): any {
            return this.httpClient.get<any>(this.path + "/TourComment/GetAllTourPopularComments/");
        }
    }