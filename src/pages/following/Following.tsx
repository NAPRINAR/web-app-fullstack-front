import React from "react"
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useSelector } from "react-redux"
import { selectCurrent } from "../../features/user/userSlice"
import { Card, CardBody } from "@nextui-org/react"
import { Link } from "react-router-dom"
import { User } from "../../components/User/User"

export const Following = () => {
  const currentUser = useSelector(selectCurrent)
  if (!currentUser) {
    return null
  }
  return currentUser.following.length ? (
    <div className="gap-5 flex flex-col">
      {currentUser?.following?.map(user => {
        return (
          <Link to={`users/${user.following.id}`} key={user.following.id}>
            <Card>
              <CardBody className="block">
                <User
                  name={user.following.name ?? ""}
                  avatarUrl={user.following.avatarUrl ?? ""}
                  description={user.following.email ?? ""}
                />
              </CardBody>
            </Card>
          </Link>
        )
      })}
    </div>
  ) : (
    <h2>У вас нету подписок</h2>
  )
}
