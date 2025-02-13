import { request } from "@/http";
import { useCommentStore } from "@/store/common";
import { ref } from "vue";

const commentStore = useCommentStore();
const comments = ref(commentStore.comments);

export const getComments = async(id: string) => {

    try{
        const response = await request.get(`/comment/getDatabaseComment/${id}`);
        comments.value = response.data;
    }catch(error){
        console.error('Error fetching response:', error);
    }
    return comments.value;
};