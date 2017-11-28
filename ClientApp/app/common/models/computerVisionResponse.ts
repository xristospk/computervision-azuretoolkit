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