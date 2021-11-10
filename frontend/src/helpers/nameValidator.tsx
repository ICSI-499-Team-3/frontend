// Template from https://github.com/venits/react-native-login-template

export function nameValidator(name: string) {
    if (!name) {
        return "Name can't be empty.";
    }
    return '';
}
