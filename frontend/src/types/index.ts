export interface AuthResponse {
    token: string;
}

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface RegisterCredentials {
    username: string;
    password: string;
}

export interface AiSummaryResponse {
    summary: string;
}