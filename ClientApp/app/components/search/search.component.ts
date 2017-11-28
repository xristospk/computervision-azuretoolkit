import { Component } from '@angular/core';
import { CognitiveService } from '../../common/services/cognitive.service';
import { ImageResult } from '../../common/models/bingSearchResponse';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

 @Component({
     selector: 'search',
     templateUrl: './search.component.html',
     styleUrls: ['./search.component.css']
 })
 export class SearchComponent {
    
    searchResults: ImageResult[] | null;
    isSearching = false;

    constructor(private cognitiveService: CognitiveService) {}

    search(searchTerm: string) {
        this.searchResults = null;
        this.isSearching = true;
        this.cognitiveService.searchImages(searchTerm).subscribe(searchResult => {
            this.searchResults = searchResult.value;
            this.isSearching = false;
        });
    }
 }