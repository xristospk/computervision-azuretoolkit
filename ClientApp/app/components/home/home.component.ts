import { Component } from '@angular/core';

import { UserService } from '../../common/services/user.service';
import { User } from '../../common/models/user';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit{
    
    user: User;
    
    ngOnInit(): void {
        this.userService.getUser().subscribe(user => {
            this.user = user;
        });
    }

    constructor(private userService: UserService) {
    }
}
