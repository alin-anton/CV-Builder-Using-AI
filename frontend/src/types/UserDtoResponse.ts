export interface UserDtoResponse {
  id: string;
  username: string;
  email: string;
  role: 'USER' | 'ADMIN';
}