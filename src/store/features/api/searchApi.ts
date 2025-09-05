import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Types for Content API
export interface ContentUser {
  _id: string;
  username: string;
  email: string;
  country: string;
  favoriteGenre: string;
  role: string;
  artistBio: string;
  socialMediaLinks: {
    instagram?: string;
    youtube?: string;
    spotify?: string;
  };
}

export interface ContentItem {
  _id: string;
  title: string;
  file: string;
  genre: string;
  description: string;
  type: 'audio' | 'video' | 'image';
  createdAt: string;
  user: ContentUser;
  likeCount?: number;
  weeklyTrendingScore?: number;
  isLiked: boolean;
}

export interface Artist {
  _id: string;
  username: string;
  email: string;
  country: string;
  favoriteGenre: string;
  role: string;
  artistBio: string;
  socialMediaLinks: {
    instagram?: string;
    youtube?: string;
    spotify?: string;
  };
  isLiked: boolean;
  isFollowed?: boolean;
}

export interface GetTrendingContentRequest {
  page?: number;
  limit?: number;
  type: 'top' | 'songs' | 'artists';
  search?: string;
}

export interface GetTrendingContentResponse {
  success: boolean;
  message: string;
  data: ContentItem[] | { artists: Artist[] };
  type: 'top' | 'songs' | 'artists';
}

export interface LikeDislikeContentRequest {
  contentId: string;
}

export interface LikeDislikeContentResponse {
  success: boolean;
  message: string;
}

export interface LikeDislikeArtistRequest {
  artistId: string;
}

export interface LikeDislikeArtistResponse {
  success: boolean;
  message: string;
}

export interface FollowUnfollowArtistRequest {
  artistId: string;
}

export interface FollowUnfollowArtistResponse {
  success: boolean;
  message: string;
}

// Get base URL from environment variable
const getBaseUrl = () => {
  return import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
};

export const searchApi = createApi({
  reducerPath: 'searchApi',
  baseQuery: fetchBaseQuery({
    baseUrl: getBaseUrl(),
    credentials: 'include',
    prepareHeaders: (headers) => {
      // Add auth headers for authenticated requests
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['TrendingContent', 'Artists', 'Songs'],
  endpoints: (builder) => ({
    getTrendingContent: builder.query<GetTrendingContentResponse, GetTrendingContentRequest>({
      query: ({ page = 1, limit = 10, type, search = '' }) => ({
        url: '/api/v1/content/getTrendingContent',
        params: { page, limit, type, search },
      }),
      providesTags: (result, error, { type }) => [
        { type: 'TrendingContent', id: type },
        { type: 'Artists', id: 'LIST' },
        { type: 'Songs', id: 'LIST' },
      ],
    }),
    likeDislikeContent: builder.mutation<LikeDislikeContentResponse, LikeDislikeContentRequest>({
      query: ({ contentId }) => ({
        url: `/api/v1/content/likeDislikeContent/${contentId}`,
        method: 'PUT',
      }),
      invalidatesTags: ['TrendingContent', 'Songs'],
    }),
    likeDislikeArtist: builder.mutation<LikeDislikeArtistResponse, LikeDislikeArtistRequest>({
      query: ({ artistId }) => ({
        url: `/api/v1/artist/likeDislikeArtist/${artistId}`,
        method: 'PUT',
      }),
      invalidatesTags: ['Artists'],
    }),
    followUnfollowArtist: builder.mutation<FollowUnfollowArtistResponse, FollowUnfollowArtistRequest>({
      query: ({ artistId }) => ({
        url: `/api/v1/artist/followUnfollowArtist/${artistId}`,
        method: 'PUT',
      }),
      invalidatesTags: [
        { type: 'Artists', id: 'LIST' },
        { type: 'TrendingContent', id: 'artists' },
        { type: 'TrendingContent', id: 'top' },
        { type: 'TrendingContent', id: 'songs' },
      ],
    }),
  }),
});

export const {
  useGetTrendingContentQuery,
  useLikeDislikeContentMutation,
  useLikeDislikeArtistMutation,
  useFollowUnfollowArtistMutation,
} = searchApi;
