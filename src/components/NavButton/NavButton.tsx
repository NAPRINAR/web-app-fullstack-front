import { Link } from "react-router-dom"
import { CustomButton } from "../CustomButtom/CustomButton"
type Props = {
  children: React.ReactNode
  icon: JSX.Element
  href: string
}

export const NavButton = ({ children, icon, href }: Props) => {
  return (
    <CustomButton className="flex justify-start text-xl" icon={icon}>
      <Link to={href}>{children}</Link>
    </CustomButton>
  )
}
