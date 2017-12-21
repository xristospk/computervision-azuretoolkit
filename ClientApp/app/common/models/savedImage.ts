export interface SavedImage {
    SavedImageId: number;
    UserId: string;
    Description: string;
    Tags: Array<SavedImageTag>;
    StorageUrl: string;
}

export interface SavedImageTag {
    savedImageTagId: number;
    savedImageId: number;
    tag: string;
}