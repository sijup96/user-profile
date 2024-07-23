
const nameRegex = /^[a-zA-Z ]{2,30}$/
const emailRegex = /^[^\s@]+@(?!.*\.[^\s@]+)[a-zA-Z\d-]+\.(com|org|in|net|edu|gov|co|uk)$/
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_+=])[A-Za-z\d!@#$%^&*()-_+=]{8,}$/

interface ValidateUserProps {
    name: string;
    email: string;
    password: string;
}
export const validateUser = ({ name, email, password }: ValidateUserProps) => {
    const errors = []
    let isValid = true
    if (!nameRegex.test(name)) {
        errors.push("nameError")
        isValid = false;
    }
    if (!emailRegex.test(email)) {
        errors.push("emailError")
        isValid = false;
    }
    if (!passwordRegex.test(password)) {
        errors.push("passwordError")
        isValid = false;
    }
    return { isValid, errors }
}