// Template from https://github.com/venits/react-native-login-template

/**
 * @author Habib Affinnih
 */
export function nameValidator(name: string) {
    if (!name) {
        return "Name can't be empty.";
    }
    return '';
}
