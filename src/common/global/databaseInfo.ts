interface DatabaseInfo {
    name: string | null;
    version: number | undefined;
    content?: string; // 添加一个自定义字段作为数据库描述或内容
}