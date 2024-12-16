import { ref } from 'vue'
import { useMessage} from 'naive-ui'

const message = useMessage()
const showModalRef = ref(false)


export const showModel = showModalRef

export function onNegativeClick(){
    message.success('Cancel')
    showModalRef.value = false
}

export function onPositiveClick(){
    message.success('Submit')
    showModalRef.value = false
}

export function createDatabase(name: string){
    //请求后端接口
    console.log(name);
}
