import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { AzureHttpClient } from './azureHttpClient';
import { BingSearchResponse } from '../models/bingSearchResponse';
import { ComputerVisionResponse, ComputerVisionRequest } from '../models/computerVisionResponse';

@Injectable()
export class CognitiveService {
    
    bingSearchApiUrl = "https://api.cognitive.microsoft.com/bing/v7.0";
    bingSearchApiKey = "BING SEARCH API KEY";

    computerVisionApiUrl = "https://westeurope.api.cognitive.microsoft.com/vision/v1.0";
    computerVisionApiKey = "CV API KEY";

    constructor(private http: AzureHttpClient) { }

    public searchImages(searchTerm: string): Observable<BingSearchResponse> {

        let url = this.bingSearchApiUrl + '/images/search?q=' + searchTerm;

        return this.http.get(url, this.bingSearchApiKey)
            .map(r => r.json() as BingSearchResponse)
            .catch(this.handleError);
    }

    public analyzeImage(request: ComputerVisionRequest): Observable<ComputerVisionResponse> {

        let url = this.computerVisionApiUrl + '/analyze?visualFeatures=Description,Tags,Faces,Categories,ImageType,Color,Adult';

        return this.http.post(url, this.computerVisionApiKey, request)
            .map(r => r.json() as ComputerVisionResponse)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error("An error occured", error);
        return Promise.reject(error.message || error);
    }
}
