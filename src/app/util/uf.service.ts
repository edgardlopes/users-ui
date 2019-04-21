import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UFService{
    constructor(private http: HttpClient){}

    getUFs():Observable<any>{
        return this.http.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    }
}