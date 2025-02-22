import type { MenuOption } from 'naive-ui';
import type { VNodeChild } from 'vue';

export interface CustomMenuOption{
    label: string;
    key: string;
    icon?: () => VNodeChild;
    children?: MenuOption[];
    url?: string; // 你可以添加自定义属性
}