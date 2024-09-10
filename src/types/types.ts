export interface AuthResponse {
      user: User;
      access: string;
      refresh: string;
  }
  export interface AuthResponseError {
    body: {
      error: string;
    };
  }
  
  export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    created_at: string;
    is_staff: boolean;
    is_superuser: boolean;
  }
  
  export interface AccessTokenResponse {
    statusCode: number;
    body: {
      accessToken: string;
    };
    error?: string;
  }