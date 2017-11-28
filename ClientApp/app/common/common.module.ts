import { NgModule } from '@angular/core';
import { CognitiveService } from './services/cognitive.service';
import { AzureHttpClient } from './services/azureHttpClient';
import { UserService } from './services/user.service';

@NgModule({
    providers: [AzureHttpClient, CognitiveService, UserService]
})
export class AppCommonModule { }