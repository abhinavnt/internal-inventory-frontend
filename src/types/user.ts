export interface User {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  role: "user" | "admin";
  dob?: string;
  city?: string;
  genres?: string[];
  isVerified: boolean;
  status?: "active" | "blocked";
  avatar?: string;
  joinedDate?: string;
  isBlocked: boolean;
  createdAt: string;
  updatedAt: string;
}




export interface UserResponseDto {
  id: string;
  name: string;
  email: string;
  dob?: string;
  phone?: string;
  role: "user" |  "admin";
  status: "active" | "blocked";
  joinedDate: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserListAdminResponse {
  users: User[];
  total: number;
  page: number;
  limit: number;
}

export interface UserStatsResponseDto {
  totalUsers: number;
  activeUsers: number;
  blockedUsers: number;
}