export interface Artist {
  id: number;
  name: string;
  username: string;
  email: string;
  genre?: string;
  country?: string;
  bio?: string;
  description?: string;
  image?: string;
  imageUrl?: string;
  stats?: {
    streams?: number;
    followers?: number;
    revenue?: number;
    growth?: string;
    investmentRaised?: number;
    activeProjects?: number;
    roi?: string;
  };
  streamingLinks?: {
    spotify?: string;
    appleMusic?: string;
    youtube?: string;
    soundcloud?: string;
  };
  socialLinks?: {
    instagram?: string;
    twitter?: string;
    tiktok?: string;
    facebook?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  role?: string;
  firstName?: string;
  lastName?: string;
  genre?: string;
  bio?: string;
}
