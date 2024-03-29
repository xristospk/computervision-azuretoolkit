import { Component, OnInit } from '@angular/core';
import { UserService } from '../../common/services/user.service';
import { User } from '../../common/models/user';
import { AzureToolkitService } from '../../common/services/azureToolkit.service';
import { SavedImage } from '../../common/models/savedImage';

@Component({
    selector: 'gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
    user: User | null = null;

    savedImages: SavedImage[] | null = null;
    searchResults: SavedImage[] | null = null;

    constructor(private userService: UserService, private azureToolkitService: AzureToolkitService) { }

    ngOnInit(): void {
        this.userService.getUser().subscribe(user => {
            this.user = user;
            this.azureToolkitService.getImages(user.userId).subscribe(images => {
                console.log(images);
                this.savedImages = images;
            });
        });
    }

    search(searchTerm: string): void {
        if(this.user == null) return;
        this.searchResults = null;
        this.azureToolkitService.searchImages(this.user.userId, searchTerm).subscribe(searchResult => {
            console.log(searchResult);
            this.searchResults = searchResult;
        });
    }
}