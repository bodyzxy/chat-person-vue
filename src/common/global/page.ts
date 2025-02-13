export interface DataBaseInfo {
    id: number;
    name: string;
    title: string;
    time: string; // 如果是 Date 类型，可以用 `string | Date`
  }
  
  export interface PageData<T> {
    content: T[];  // 数据列表
    totalElements: number; // 总条数
    totalPages: number; // 总页数
    number: number; // 当前页码（从0开始）
    size: number; // 每页大小
  }
  