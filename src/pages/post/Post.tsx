import React from "react"
import { useGetAllPostsQuery } from "../../app/services/postsApi"
import { CreatePost } from "../../components/CreatePost/CreatePost"
import { CustomCard } from "../../components/CustomCard/CustomCard"

export const Post = () => {
  const { data } = useGetAllPostsQuery()
  return (
    <>
      <div className="mb-10 w-full">
        <CreatePost />
      </div>

      {data && data.length
        ? data.map(
            ({
              content,
              author,
              id,
              comments,
              authorId,
              likes,
              createdAt,
              likedByUser,
            }) => {
              return (
                <CustomCard
                  key={id}
                  avatarUrl={author.avatarUrl ?? ""}
                  content={content}
                  name={author.name ?? ""}
                  likesCount={likes.length}
                  commentsCount={comments.length}
                  authorId={authorId}
                  id={id}
                  likedByUser={likedByUser}
                  createdAt={createdAt}
                  cardFor="post"
                />
              )
            },
          )
        : null}
    </>
  )
}
