import React, { useState } from "react"
import { CustomInput } from "../../components/CustomInput/CustomInput"
import { useForm } from "react-hook-form"
// import { Link } from "react-router-dom"
import { Button, Link } from "@nextui-org/react"
import { useRegisterMutation } from "../../app/services/userApi"
import { hasErrorField } from "../../utils/has-error-field"
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage"

type RegisterType = {
  email: string
  name: string
  password: string
}

type Props = {
  setSelected: (value: string) => void
}

export const Register = ({ setSelected }: Props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterType>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const [register, { isLoading }] = useRegisterMutation()
  const [error, setError] = useState("")
  const onSubmit = async (data: RegisterType) => {
    try {
      await register(data).unwrap()
      setSelected("login")
    } catch (err) {
      if (hasErrorField(err)) {
        setError(err.data.error)
      }
    }
  }
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <CustomInput
        control={control}
        name="name"
        label="Имя"
        type="text"
        required="Введите имя"
      />
      <CustomInput
        control={control}
        name="email"
        label="Email"
        type="email"
        required="Введите E-mail"
      />
      <CustomInput
        control={control}
        name="password"
        label="Пароль"
        type="password"
        required="Введите пароль"
      />

      <ErrorMessage error={error} />

      <p className="text-center text-small">
        Уже есть аккаунт?{" "}
        <Link
          size="sm"
          className="cursor-pointer"
          onPress={() => setSelected("login")}
        >
          Войдите
        </Link>
      </p>

      <div className="flex-gap-2 justify-end">
        <Button fullWidth color="primary" type="submit">
          Регистрация
        </Button>
      </div>
    </form>
  )
}
