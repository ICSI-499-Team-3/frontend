// Template from https://github.com/venits/react-native-login-template

export function doublePasswordValidator(password1: string, password2: string) {
    if (!password1 || !password2) {
        return "Password can't be empty.";
    }
    if (password1.length < 5 || password2.length < 5) {
        return 'Password must be at least 5 characters long.';
    }
    if(password1 !== password2) {
        return 'Passwords do not match.'
    }
    return '';
}

export function singlePasswordValidator(password: string) {
    if (!password) {
        return "Password can't be empty.";
    }
    if (password.length < 5) {
        return 'Password must be at least 5 characters long.';
    }
    return '';
}
