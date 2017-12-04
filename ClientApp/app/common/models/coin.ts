export interface Coin {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    amount: number;
    value: number;
    price_usd: number;
    price_btc: number;
    volume_usd_24h: string;
    market_cap_usd: string;
    available_supply: string;
    total_supply: string;
    percent_change_1h: number;
    percent_change_24h: number;
    percent_change_7d: number;
    last_updated: string;
    price_eur: number;
    volume_eur_24h: string;
    market_cap_eur: string;
}