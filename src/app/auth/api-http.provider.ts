import { HttpClient, HttpRequest, HttpXhrBackend } from '@angular/common/http';

import { LabApiHttp } from './api-http.service';
import { AuthService } from './auth.service';

export function apiHttpLoader(xhrBackend: HttpXhrBackend,
                              requestOptions: HttpRequest<any>,
                              authService: AuthService) {
                                  return new LabApiHttp(xhrBackend, requestOptions, authService);
                              }

export let apiHttpProvider = {
    provide: LabApiHttp,
    useFactory: apiHttpLoader,
    deps: [HttpXhrBackend, HttpRequest, AuthService]
};
