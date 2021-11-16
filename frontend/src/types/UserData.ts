import User from "./User";

interface UserData {
    GetUserByEmailAndPassword: User;
    GetUserByEmail: User[];
}

export default UserData;