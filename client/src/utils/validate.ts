import React, { SetStateAction } from "react";

interface ValidateProps {
    data: {
        name: string;
        email: string;
        password: string;
    }
    setError: React.Dispatch<SetStateAction<string[]>>
}
const validate = ({ data, setError }: ValidateProps): boolean => {
    const nameRegex = /^[a-zA-Z ]{2,30}$/
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
    const errors = []
    if (!nameRegex.test(data.name) || data.name.length < 4) errors.push('nameError')
    if (!emailRegex.test(data.email) || !data.email) errors.push('emailError')
    if (!passwordRegex.test(data.name) || !data.password) errors.push('passwordError')
    setError(errors)
    return errors.length === 0
}

export default validate