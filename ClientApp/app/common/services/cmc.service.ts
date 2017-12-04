import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Coin } from '../models/coin';

@Injectable()
export class CmcService {

    private cmcApiUrl: string = "https://api.coinmarketcap.com/v1/ticker/?convert=EUR";

    constructor(private http: Http) {
    }

    private handleError(error: any): Promise<any> {
        debugger;
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    public getCoins(): Observable<Array<Coin>> {
        return this.http.get(this.cmcApiUrl)
        .map(r => r.json() as Array<Coin> )
        .catch(this.handleError);
    }
}