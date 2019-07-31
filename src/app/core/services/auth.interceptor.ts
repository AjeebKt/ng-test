import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalDataService } from './global-data.service';
import { environment } from '../../../environments/environment';
import { CurrentUser } from '../../model/current-user';
import { ProgressBarService } from './progress-bar.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private globalDataService: GlobalDataService, private progressbarService: ProgressBarService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let headers = new HttpHeaders();
        const apiUrl = environment.API.URL + req.urlWithParams;

        const user: CurrentUser = sessionStorage.getItem('currentUser') ? JSON.parse(sessionStorage.getItem('currentUser')) : null;
        const loggedUser = this.globalDataService.currentUser || user;
        let token = !!loggedUser && loggedUser.token ? loggedUser.token : null;
        token = this.globalDataService.currentUser.token;

        if (!req.url.toLowerCase().includes('exist')) {
            this.progressbarService.display(true);
        }

        if (!!token && req.url.includes('http')) {
            let authHeader = new HttpHeaders();
            const authReq = req.clone({ headers: authHeader, url: req.urlWithParams });
            return next.handle(authReq);
        }
        const anonymousReq = req.clone({ url: apiUrl, headers: headers });
        // if (!this.progressbarService.getStatus()) {
        //  }
        return next.handle(anonymousReq);
    }
}
