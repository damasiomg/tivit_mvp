export interface Purchase {
  id: number;
  item: string;
  price: number;
}

export interface Report {
  id: number;
  title: string;
  status: string;
}

export interface UserData {
  name: string;
  email: string;
  purchases?: Purchase[];
  reports?: Report[];
}

export interface AuthUser {
  username: string;
  role: 'user' | 'admin';
  token: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface TokenPayload {
  sub: string;
  role?: string;
  exp?: number;
  [key: string]: unknown;
}

export interface ApiHealthResponse {
  status: string;
  message: string;
}

export interface ApiTokenResponse {
  access_token: string;
  token_type: string;
}

export interface ApiUserResponse {
  message: string;
  data: UserData;
}

export interface ApiAdminResponse {
  message: string;
  data: UserData;
}
