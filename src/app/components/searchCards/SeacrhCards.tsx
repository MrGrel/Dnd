import { useState } from "react"
import { useForm } from "react-hook-form";


export const SeacrhCards = () => {
	const {
		register,
    handleSubmit,
    formState: { errors },
	} = useForm();
  const [fastButtons, setFastButtons] = useState<string[]>([])

	return
}