import { NgModule } from '@angular/core';
import { CognitiveService } from './services/cognitive.service';
import { AzureHttpClient } from './services/azureHttpClient';
import { UserService } from './services/user.service';
import { AzureToolkitService } from './services/azureToolkit.service';
import { CmcService } from './services/cmc.service';

@NgModule({
    providers: [AzureHttpClient, CognitiveService, UserService, AzureToolkitService, CmcService]
})
export class AppCommonModule { }