import type React from "react"
import { useContext, useState } from "react"
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
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@nextui-org/react"
import { CustomInput } from "../CustomInput/CustomInput"
import { MdOutlineEmail } from "react-icons/md"
import { ErrorMessage } from "../ErrorMessage/ErrorMessage"
import { CustomButton } from "../CustomButtom/CustomButton"
import { hasErrorField } from "../../utils/has-error-field"

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
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      setSelectedFile(e.target.files[0])
    }
  }
  const onSubmit = handleSubmit(async data => {
    // console.log(data)
    if (id) {
      try {
        const formData = new FormData()
        // formData.append("name", "lolosh")

        data.name && formData.append("name", data.name)
        data.email &&
          data.email !== user?.email &&
          formData.append("email", data.email)
        data.dateOfBirth &&
          formData.append(
            "dateOfBirth",
            new Date(data.dateOfBirth).toISOString(),
          )
        data.bio && formData.append("bio", data.bio)
        data.location && formData.append("location", data.location)
        selectedFile && formData.append("avatar", selectedFile)
        // console.log(formData)
        // console.log(formData.values)

        await updateUser({ userData: formData, id }).unwrap()
      } catch (error) {
        if (hasErrorField(error)) {
          setError(error.data.error)
        }
      }
    }
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
              <form className="flex flex-col gap-4" onSubmit={onSubmit}>
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
                  onChange={handleFileChange}
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
            <ModalFooter className="flex justify-center">
              <Button color="danger" variant="light" onPress={onClose}>
                Закрыть
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
