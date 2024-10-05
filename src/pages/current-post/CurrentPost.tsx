import React from "react"
import { useParams } from "react-router-dom"
import { useGetPostByIdQuery } from "../../app/services/postsApi"
import { CustomCard } from "../../components/CustomCard/CustomCard"
import { GoBack } from "../../components/GoBack/GoBack"
import { CreateComment } from "../../components/CreateComment/CreateComment"

export const CurrentPost = () => {
  const params = useParams<{ id: string }>()
  const { data } = useGetPostByIdQuery(params?.id ?? "")

  if (!data) {
    return <h2>Поста не существует</h2>
  }

  const {
    content,
    id,
    authorId,
    comments,
    likedByUser,
    author,
    createdAt,
    likes,
  } = data

  return (
    <>
      <GoBack />
      <CustomCard
        cardFor="current-post"
        avatarUrl={author.avatarUrl ?? ""}
        content={content}
        name={author.name ?? ""}
        likesCount={likes.length}
        commentsCount={comments.length}
        authorId={authorId}
        id={id}
        likedByUser={likedByUser}
        createdAt={createdAt}
      />
      <div className="mt-10">
        <CreateComment />
      </div>
      <div className="mt-10">
        {data.comments
          ? data.comments.map(comment => {
              return (
                <CustomCard
                  cardFor="comment"
                  key={comment.id}
                  avatarUrl={comment.user.avatarUrl ?? ""}
                  content={comment.content}
                  name={comment.user.name ?? ""}
                  authorId={comment.userId}
                  commentId={comment.id}
                  id={id}
                />
              )
            })
          : null}
      </div>
    </>
  )
}
