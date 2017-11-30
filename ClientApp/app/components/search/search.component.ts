import { Component, ViewChild } from '@angular/core';
import { CognitiveService } from '../../common/services/cognitive.service';
import { AzureToolkitService } from '../../common/services/azureToolkit.service';
import { ImageResult } from '../../common/models/bingSearchResponse';
import { ComputerVisionRequest, ComputerVisionResponse, FaceResponse } from '../../common/models/computerVisionResponse';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Element } from '@angular/compiler';
import { ImagePostRequest } from '../../common/models/imagePostRequest';

@Component({
    selector: 'search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent {

    searchResults: ImageResult[] | null;
    isSearching = false;

    currentAnalytics: ComputerVisionResponse | null;
    currentItem: ImageResult | null;
    isAnalyzing: boolean = false;
    currentItemSaved: boolean = false;
    isSavingImage: boolean = false;

    @ViewChild('image') image: any;
    @ViewChild('faceRectangles') faceRectangles: any;

    constructor(private cognitiveService: CognitiveService, private azureToolkitService: AzureToolkitService) { }

    search(searchTerm: string) {
        if (!searchTerm) return;
        this.searchResults = null;
        this.currentAnalytics = null;
        this.isSearching = true;
        this.cognitiveService.searchImages(searchTerm).subscribe(searchResult => {
            this.searchResults = searchResult.value;
            this.isSearching = false;
        });
    }

    analyze(imageResult: ImageResult) {
        this.currentItem = imageResult;
        this.currentItemSaved = false;
        this.currentAnalytics = null;
        if (this.faceRectangles) this.faceRectangles.nativeElement.innerHTML = "";
        this.isAnalyzing = true;

        var req: ComputerVisionRequest = {
            url: imageResult.thumbnailUrl
        }

        this.cognitiveService.analyzeImage(req).subscribe(result => {

            result.tags.forEach(tag => {
                tag.confidence = Math.trunc(tag.confidence * 100);
            });

            var rectangles: string = "";

            result.faces.forEach(face => {
                rectangles += this.drawFace(face);
            });

            this.faceRectangles.nativeElement.innerHTML = rectangles;
            this.currentAnalytics = result;
            this.isAnalyzing = false;
        });

        window.scroll(0, 0);
    }

    saveImage(): void {
        if(this.currentItem == null) return;
        this.isSavingImage = true;

        let transferObject: ImagePostRequest = {
            url: this.currentItem.thumbnailUrl,
            encodingFormat: this.currentItem.encodingFormat,
            id: this.currentItem.imageId
        }
        debugger;
        this.azureToolkitService.saveImage(transferObject).subscribe(saveSuccessfull => {
            this.isSavingImage = false;
            this.currentItemSaved = saveSuccessfull;
        });
    }

    drawFace(face: FaceResponse): any {
        var top = face.faceRectangle.top + this.image.nativeElement.offsetTop;
        var left = face.faceRectangle.left + this.image.nativeElement.offsetLeft;
        var color = '#'+Math.floor(Math.random()*16777215).toString(16);
        var template = `<div class="faceRectangle" style="width:${face.faceRectangle.width}px;height:${face.faceRectangle.height}px;top:${top}px;left:${left}px;`
                        + `position: absolute; border: 2px solid deeppink; color: deeppink; font-size: 12px;">
                            <div style="position:relative; top:-18px; width: 64px; font-weight: bold; background-color: #000000a1;">${face.gender}, ${face.age}</div>
                        </div>`;

        return template;
    }
}