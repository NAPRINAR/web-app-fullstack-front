import React from "react"
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useSelector } from "react-redux"
import { selectCurrent } from "../../features/user/userSlice"
import { Link } from "react-router-dom"
import { Card, CardBody } from "@nextui-org/react"
import { User } from "../../components/User/User"

export const Follower = () => {
  const currentUser = useSelector(selectCurrent)
  if (!currentUser) {
    return null
  }
  return currentUser.followers.length ? (
    <div className="gap-5 flex flex-col">
      {currentUser?.followers?.map(user => {
        return (
          <Link to={`users/${user.follower.id}`} key={user.follower.id}>
            <Card>
              <CardBody className="block">
                <User
                  name={user.follower.name ?? ""}
                  avatarUrl={user.follower.avatarUrl ?? ""}
                  description={user.follower.email ?? ""}
                />
              </CardBody>
            </Card>
          </Link>
        )
      })}
    </div>
  ) : (
    <h2>У вас нету подписчиков</h2>
  )
}
