export interface ChatMessage {
    user: string;
    body: string;
    uuid: string;
    postedDate: string;
}

export interface Recording {
    start: string;
    uuid: string;
    fileName: string;
    end: string;
}
