import type React from "react"

type Props = {
  childer: React.ReactElement[] | React.ReactElement
}

export const Container = ({ children }: Props) => {
  return <div className="flex max-w-screen-x1 mx-auto mt-10">{children}</div>
}
