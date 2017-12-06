import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { CmcService } from '../../common/services/cmc.service';
import { Coin } from '../../common/models/coin';
import { Asset } from '../../common/models/asset';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
    selector: 'fetchdata',
    templateUrl: './fetchdata.component.html',
    styleUrls: ['./fetchdata.component.css']
})
export class FetchDataComponent implements OnInit {

    public coins: Array<Coin>;

    invested:number = 3675;
    assetsValue: number = 0;

    assets: { [symbol: string]: number; } = {
        "BTC": 0.27823447,
        // "ETH": 1.69308715,
        "LTC": 12.36369744,
        "XMR": 10,
        "XLM": 2527.08061242,
        "BTG": 0.41557555,
        "SALT": 298.27136517,
        "KMD": 629.74092816,
        "DGB": 6926.40980769,
        "XRP": 500,
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
                }
            });
            this.coins = response;
        });
    }

}
