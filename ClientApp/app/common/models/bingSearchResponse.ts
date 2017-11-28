export interface BingSearchResponse {
    totalEstimatedMatches: number;
    value: ImageResult[];
}

export interface ImageResult {
    name: string;
    thumbnailUrl: string;
}