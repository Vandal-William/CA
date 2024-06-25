export interface TempCommentData {
    id: string;
    content: string;
    userId: string;
    publicationId: string;
    createdAt: Date;
}

export interface TempCommentCreateData {
    content: string;
    userId: string;
    publicationId: string;
}