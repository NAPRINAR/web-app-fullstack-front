import type { Comment, Like } from "../types"
import { api } from "./api"

export const likesApi = api.injectEndpoints({
  endpoints: builder => ({
    likePost: builder.mutation<Like, { postId: string }>({
      query: body => ({
        url: "/likes",
        method: "POST",
        body,
      }),
    }),
    unlikePost: builder.mutation<void, string>({
      query: postId => ({
        url: `/likes/${postId}`,
        method: "DELETE",
      }),
    }),
  }),
})
