import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import 'rxjs/Rx';

import { Scenario } from '../models/scenario';
import { ApiHttp } from '../auth/api-http.service';
import { apiHost } from "../constants";

/*
 * Scenario Service
 * Returns scenarios from API
 */
@Injectable()
export class ScenarioService {

    constructor(private apiHttp: ApiHttp) {}

    public list(): Observable<Scenario[]> {
        let url = apiHost + '/api/scenario/';
        return this.apiHttp.get(url).map(resp => resp.json() || [] as Scenario[]);
    }
}
