import React from "react"
import { Header } from "../Header/Header"
import { Container } from "../Container/Container"
import { Navbar } from "../Navbar/Navbar"
import { Outlet } from "react-router-dom"

export const Layout = () => {
  return (
    <>
      <Header />
      <Container>
        <div className="flex-2 p-4">
          <Navbar />
        </div>
        <div className="flex-1 p-4">
          <Outlet />
        </div>
        <div></div>
      </Container>
    </>
  )
}
