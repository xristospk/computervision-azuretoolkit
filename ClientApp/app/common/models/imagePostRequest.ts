import { FaceResponse } from "./computerVisionResponse";

export interface ImagePostRequest {
    userId: string;
    description: string;
    tags: string[];
    faces: FaceResponse[];
    url: string;
    id: string;
    encodingFormat: string;
}