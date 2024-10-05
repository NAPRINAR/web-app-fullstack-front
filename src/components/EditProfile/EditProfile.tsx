import React, { useContext, useState } from "react"
import type { User } from "../../app/types"
import { ThemeContext } from "../theme-provider/themeProvider"
import { useUpdateUserMutation } from "../../app/services/userApi"
import { useParams } from "react-router-dom"
import { Controller, useForm } from "react-hook-form"
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Textarea,
} from "@nextui-org/react"
import { CustomInput } from "../CustomInput/CustomInput"
import { MdOutlineEmail } from "react-icons/md"
import { ErrorMessage } from "../ErrorMessage/ErrorMessage"
import { CustomButton } from "../CustomButtom/CustomButton"

type Props = {
  isOpen: boolean
  onClose: () => void
  user?: User
}

export const EditProfile = ({ isOpen, onClose, user }: Props) => {
  const { theme } = useContext(ThemeContext)
  const [updateUser, { isLoading }] = useUpdateUserMutation()
  const [error, setError] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>()
  const { id } = useParams<{ id: string }>()
  const { handleSubmit, control } = useForm({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      email: user?.email,
      name: user?.name,
      dateOfBirth: user?.dateOfBirth,
      bio: user?.bio,
      location: user?.location,
    },
  })
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className={`${theme} text-foreground`}
    >
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Изменение профиля
            </ModalHeader>
            <ModalBody>
              <form className="flex flex-col gap-4">
                <CustomInput
                  control={control}
                  name="email"
                  label="Email"
                  type="email"
                  endContent={<MdOutlineEmail />}
                />
                <CustomInput
                  control={control}
                  name="name"
                  label="Имя"
                  type="text"
                />
                <input
                  type="file"
                  name="avatarUrl"
                  placeholder="Выберите файл"
                />
                <CustomInput
                  control={control}
                  name="dateOfBirth"
                  label="Дата Рождения"
                  type="date"
                  placeholder="Дата рождения"
                />
                <Controller
                  name="bio"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      rows={4}
                      placeholder="Ваша биография"
                    />
                  )}
                />
                <CustomInput
                  control={control}
                  name="location"
                  label="Местоположение"
                  type="text"
                />
                <ErrorMessage error={error} />
                <div className="flex gap-2 justify-end">
                  <Button
                    fullWidth
                    color="primary"
                    isLoading={isLoading}
                    type="submit"
                  >
                    Обновить профиль
                  </Button>
                </div>
              </form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
