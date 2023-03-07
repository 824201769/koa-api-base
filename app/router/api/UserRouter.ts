import koaRouter from 'koa-router';
import UserService from '../../service/UserService';
const router=new koaRouter({prefix:'/api'})


router.get("/userList",async (ctx)=>{
    ctx.body=  await UserService.getUserList()
})
export default router