import User from "./User";

interface UserData {
    email: string;
    GetUserByEmailAndPassword: User;
    GetUserByEmailForShare: User[];
}

export default UserData;