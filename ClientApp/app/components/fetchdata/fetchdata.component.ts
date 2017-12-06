import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { CmcService } from '../../common/services/cmc.service';
import { Coin } from '../../common/models/coin';
import { Asset } from '../../common/models/asset';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
// import { asEnumerable } from 'linq-es2015';

@Component({
    selector: 'fetchdata',
    templateUrl: './fetchdata.component.html',
    styleUrls: ['./fetchdata.component.css']
})
export class FetchDataComponent implements OnInit {
    hideZeroValues: boolean = false;

    public coins: Array<Coin>;

    invested:number = 3675;
    assetsValue: number = 0;
    assetsBTCValue: number = 0;

    assets: { [symbol: string]: number; } = {
        "BTC": 0.26322947,
        // "ETH": 1.69308715,
        "LTC": 12.36369744,
        "XMR": 10,
        "XLM": 2527.08061242,
        "BTG": 0.41557555,
        "SALT": 298.27136517,
        "KMD": 569.74092816,
        "DGB": 6926.40980769,
        "XRP": 500,
    };

    constructor(private cmcService: CmcService) {}

    hideZeroChanged(event: any) {
        debugger;
        this.hideZeroValues = event.target.checked;
    }

    ngOnInit(): void {
        this.cmcService.getCoins().subscribe(response => {
            response.forEach(coin => {

                var assetAmount = this.assets[coin.symbol];
                if (assetAmount) {
                    coin.amount = assetAmount;
                    this.assetsValue += assetAmount * coin.price_eur;
                    this.assetsBTCValue += assetAmount * coin.price_btc;
                } else {
                    coin.amount = 0;
                }
            });
            this.coins = response;
        });
    }

}
