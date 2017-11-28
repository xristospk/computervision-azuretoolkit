import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { AzureHttpClient } from './azureHttpClient';
import { BingSearchResponse } from '../models/bingSearchResponse';

@Injectable()
export class CognitiveService {
    
    bingSearchApiUrl = "https://api.cognitive.microsoft.com/bing/v7.0";
    bingSearchApiKey = "6e12cec1f636483aa20bd5bbb1704b85";

    constructor(private http: AzureHttpClient) { }

    public searchImages(searchTerm: string): Observable<BingSearchResponse> {

        let url = this.bingSearchApiUrl + '/images/search?q=' + searchTerm;

        return this.http.get(url, this.bingSearchApiKey)
            .map(r => r.json() as BingSearchResponse)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error("An error occured", error);
        return Promise.reject(error.message || error);
    }
}