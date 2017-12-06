import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { CmcService } from '../../common/services/cmc.service';
import { Coin } from '../../common/models/coin';
import { Asset } from '../../common/models/asset';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
    selector: 'fetchdatadona',
    templateUrl: './fetchdatadona.component.html',
    styleUrls: ['./fetchdatadona.component.css']
})
export class FetchDataDonaComponent implements OnInit {

    public coins: Array<Coin>;

    invested:number = 300;
    assetsValue: number = 0;
    assetsBTCValue: number = 0;

    assets: { [symbol: string]: number; } = {
        "BTC": 0.0150015,
        "KMD": 60,
    };

    constructor(private cmcService: CmcService) {}

    ngOnInit(): void {
        // debugger;
        this.cmcService.getCoins().subscribe(response => {
            response.forEach(coin => {
                // coin.price_eur = parseInt(coin.price_eur.toFixed(2));
                // coin.price_usd = parseInt(coin.price_usd.toFixed(2));

                var assetAmount = this.assets[coin.symbol];
                if (assetAmount) {
                    coin.amount = assetAmount;
                    var assetValue = assetAmount * coin.price_eur;
                    coin.value = assetValue;
                    this.assetsValue += assetValue;
                    this.assetsBTCValue += assetAmount * coin.price_btc;
                }
            });
            this.coins = response;
        });
    }

}
