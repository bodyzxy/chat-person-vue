export interface register{
    username: string;      // 字符串类型，最小长度 3，最大长度 20
    email: string;         // 字符串类型，必须为有效的邮箱格式，最大长度 50
    password: string;      // 字符串类型，最小长度 6，最大长度 40
    confirmPassword: string; // 字符串类型，最小长度 6，最大长度 40
    role?: Set<string>;    // 可选的字符串集合类型
}