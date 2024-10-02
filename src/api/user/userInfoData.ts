import { defineComponent, ref } from 'vue'

// 定义用户对象的类型
export interface User {
    image:string;
    name: string;
    content: string;
    data:string;
  }

export const dataBase = [
    {
        'name': "bodyzxy",
        'title': "学习",
        'time': "2024/8/12",
        'content': "静夜思是怎么背的"
    },
    {
        'name': "boyzxy",
        'title': "学习1",
        'time': "2024/8/22",
        'content': "静夜思是怎么背的1"
    },
    {
        'name': "bodyzxy",
        'title': "学习2",
        'time': "2024/8/23",
        'content': "静夜思是怎么背的2"
    },
    {
        'name': "bodyzxy",
        'title': "学习3",
        'time': "2024/8/23",
        'content': "静夜思是怎么背的3"
    },
    {
        'name': "bodyzxy",
        'title': "学习4",
        'time': "2024/8/24",
        'content': "静夜思是怎么背的4"
    },
    {
        'name': "bodyzxy",
        'title': "学习5",
        'time': "2024/8/25",
        'content': "静夜思是怎么背的5"
    },
    {
        'name': "bodyzxy",
        'title': "学习6",
        'time': "2024/8/26",
        'content': "静夜思是怎么背的6"
    },
    {
        'name': "bodyzxy",
        'title': "学习7",
        'time': "2024/8/26",
        'content': "静夜思是怎么背的6"
    }
] 

export const user = ref<User[]>([
    {
        'image':"https://images.app.goo.gl/iqqFALJ8q2SPwKMi6",
        'name':"zxx",
        'content':"askdhaksjhdasjhdkajsbdajsbkajsbkajsbdasdasd",
        'data':'2024-09-09'
    },
    {
        'image':"https://images.app.goo.gl/iqqFALJ8q2SPwKMi6",
        'name':"z",
        'content':"askdhaksjhdasjhdkajsbdajsbkajsbkajsbdasdasd",
        'data':'2024-09-09'
    },
    {
        'image':"https://images.app.goo.gl/iqqFALJ8q2SPwKMi6",
        'name':"实时",
        'content':"askdhaksjhdasjhdkajsbdajsbkajsbkajsbdasdasd",
        'data':'2024-09-09'
    },
    {
        'image':"https://images.app.goo.gl/iqqFALJ8q2SPwKMi6",
        'name':"史蒂夫",
        'content':"askdhaksjhdasjhdkajsbdajsbkajsbkajsbdasdasd",
        'data':'2024-09-09'
    },
    {
        'image':"https://images.app.goo.gl/iqqFALJ8q2SPwKMi6",
        'name':"史蒂夫",
        'content':"askdhaksjhdasjhdkajsbdajsbkajsbkajsbdasdasd",
        'data':'2024-09-09'
    },
    {
        'image':"https://images.app.goo.gl/iqqFALJ8q2SPwKMi6",
        'name':"是的减肥呢",
        'content':"askdhaksjhdasjhdkajsbdajsbkajsbkajsbdasdasd",
        'data':'2024-09-09'
    },
])