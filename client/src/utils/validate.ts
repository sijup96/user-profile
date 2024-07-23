import React, { SetStateAction } from "react";

interface ValidateProps {
    data: {
        name: string;
        email: string;
        password: string;
    }
    setErrors: React.Dispatch<SetStateAction<string[]>>
}
const validate = ({ data, setErrors }: ValidateProps): boolean => {
    const nameRegex = /^[a-zA-Z ]{2,30}$/
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_+=])[A-Za-z\d!@#$%^&*()-_+=]{8,}$/;
    const errors = []
    if (!nameRegex.test(data.name) || data.name.length < 4) errors.push('nameError')
    if (!emailRegex.test(data.email) || !data.email) errors.push('emailError')
    if (!passwordRegex.test(data.password) || !data.password) errors.push('passwordError')
    setErrors(errors)
    return errors.length === 0
}

export default validate