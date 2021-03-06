// Template from https://github.com/venits/react-native-login-template

/**
 * @author Habib Affinnih
 */
export function passwordValidator(password: string) {
    if (!password) {
        return "Password can't be empty.";
    }
    if (password.length < 5) {
        return 'Password must be at least 5 characters long.';
    }
    return '';
}
