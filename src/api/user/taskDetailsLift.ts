import { ref } from "vue";
import {type User} from './userInfoData';

export const showPopover = ref(false);
export const showModal = ref(false);  // 控制弹框的显示状态
export const selectedUser = ref<User|null>(null);  // 存储当前选择的用户信息
export const message = ref(''); // 存储输入框的消息



// 点击 n-list-item 时显示用户详情
export function showChat(userItem: User) {
  selectedUser.value = userItem;  // 设置当前选择的用户
  showModal.value = true;  // 显示弹框
}
