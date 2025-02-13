import { defineStore } from 'pinia';

interface Comment {
  id: number;
  pid: number;
  content: string;
  userName: string;
  toUserName: string | null;
  likesCount: number;
  createTime: string;
  updateTime: string;
  replies: Comment[];
}

export const useCommentStore = defineStore('comments', {
  state: () => ({
    comments: [] as Comment[], // 存储所有评论
  }),
  actions: {
    // 设置评论数据
    setComments(comments: Comment[]) {
      this.comments = comments;
    },

    // 获取指定评论的子评论（如果没有加载过，则加载）
    getRepliesByCommentId(id: number): Comment[] | undefined {
      const comment = this.comments.find((comment) => comment.id === id);
      return comment?.replies;
    },

    // 通过评论ID加载子评论
    loadReplies(id: number, replies: Comment[]) {
      const comment = this.comments.find((comment) => comment.id === id);
      if (comment) {
        comment.replies = replies;
      }
    },
  },
});
