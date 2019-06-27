import { Response } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Project } from '../models/project.model';
import { ProjectData } from '../models/project-data.model';
import { LabApiHttp } from '../auth/api-http.service';
import { apiHost } from '../constants';

@Injectable()
export class ProjectService {

    constructor(private apiHttp: LabApiHttp) {}

    add(project: Project): Observable<Project> {
        const url = `${apiHost}/api/project/`;
        return this.apiHttp.post(url, project).pipe(map(resp => resp.json() || {} as Project));
    }

    get(id: string): Observable<Project> {
        const url = `${apiHost}/api/project/${id}/`;
        return this.apiHttp.get(url).pipe(map(resp => resp.json() || [] as Project[]));
    }

    list(): Observable<Project[]> {
        const url = `${apiHost}/api/project/`;
        return this.apiHttp.get(url)
            .pipe(map(resp => resp.json().results || [] as Project[]));
    }

    remove(id: string): Observable<Response> {
        const url = `${apiHost}/api/project/${id}/`;
        return this.apiHttp.delete(url);
    }

    update(project: Project): Observable<Project> {
        const url = `${apiHost}/api/project/${project.id}/`;
        return this.apiHttp.put(url, project).pipe(map(resp => resp.json() || {} as Project));
    }
}
