export interface ComputerVisionRequest {
    url: string;
}
export interface ComputerVisionResponse {
    description: {
        captions: Array<{
            confidence: number;
            text: string;
        }>;
    }
    tags: Array<{
        confidence: number;
        name: string;
    }>;
    faces: Array<FaceResponse>;
    color: {
        dominantColors: Array<string>;
    }
    metadata: {
        height: number;
        width: number;
        format: string;
    }
    imageType: {
        clipArtType: boolean;
        lineDrawingType: boolean;
    }
    adult: {
        adultScore: number;
        isAdultContent: boolean;
        isRacyContent: boolean;
        racyScore: number
    }
    categories: Array<CategoryResponse>;
}

export interface CategoryResponse {
    name: string;
    score: number;
    detail: Array<{
        celebrities: Array<{
            confidence: number;
            name: string;
        }>
        landmarks: Array<{
            confidence: number;
            name: string;
        }>
    }>
}

export interface FaceResponse {
    age: number,
    gender: string,
    faceRectangle: {
        top: number,
        left: number,
        width: number,
        height: number
    },
    faceColor: string
}