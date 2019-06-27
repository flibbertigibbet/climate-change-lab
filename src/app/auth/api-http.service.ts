
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpRequest, HttpHeaders,
         HttpResponse, URLSearchParams } from '@angular/common/http';



import { ApiHttp } from 'climate-change-components';

import { AuthService } from './auth.service';


/**
 * Wrapper for Http that appends authorization headers for requests to the API backend,
 * and redirects unauthorized responses to the API login page.
 */
@Injectable()
export class LabApiHttp extends HttpClient implements ApiHttp {

    constructor(protected _backend: HttpBackend,
                protected _defaultOptions: HttpRequest,
                protected authService: AuthService) {
        super(_backend, _defaultOptions);
    }

    request(url: string | Request, options?: any): Observable<Response> {
        return super.request(url, this.appendAPIHeaders(options)).catch((error: Response) => {
            if (error.status === 401 || error.status === 403) {
                this.authService.logout();
            }
            return observableThrowError(error);
        });
    }

    get(url: string, options?: any): Observable<Response> {
        return super.get(url, this.appendAPIHeaders(options));
    }

    post(url: string, body: any, options?: any): Observable<Response> {
        return super.post(url, body, this.appendAPIHeaders(options));
    }

    put(url: string, body: any, options?: any): Observable<Response> {
        return super.put(url, body, this.appendAPIHeaders(options));
    }

    delete(url: string, options?: any): Observable<Response> {
        return super.delete(url, this.appendAPIHeaders(options));
    }

    private appendAPIHeaders(options?: any): any {
        const token = this.authService.getToken();
        if (!token) {
            this.authService.logout();
            return;
        }
        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }
        options.headers.set('Authorization', 'Token ' + token);
        options.headers.set('Accept', 'application/json');

        if (options.search == null) {
            options.search = new URLSearchParams();
        }
        // Switch params to instance of URLSeachParams if options.search is string
        //  so that we can always safely use the URLSearchParams.append() method to add 'format'
        if (typeof options.search === 'string') {
            options.search = new URLSearchParams(options.search);
        }

        return options;
    }
}
