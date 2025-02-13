export interface UserForm {
    name: string;
    user: {
        address: string;
    };
    phone: string;
    password: string;
    reenteredPassword: string;
    email: string;
    hobbies: { hobby: string }[];
}