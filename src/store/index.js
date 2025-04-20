import { defineStore} from 'pinia'
import storage from "../util/storage";
import { removeAdminRoutes,addAdminRoutes } from "../router/admin.js";



const useStore = defineStore('boke',{
    persist:{
        enabled:true
    },
    state:()=>({
        token:"",
        userName:"",
        headImg:"",
        city:"",
        identity:""
    }),
    getters:{
        getToken(){
            return this.token || storage.get("token") || ""
        },
        getHeadImg(){
            return this.headImg || storage.get("headImg") || ""
        },
        getCity(){
            return this.city || storage.get("city") || ""
        }
    },
    actions:{
        setToken(token){
            this.token = token;
            storage.set('token',token);
        },
        setHeadImg(headImg){
            this.headImg = headImg;
            storage.set('headImg',headImg)
        },
        setCity(city){
            this.city = city;
            storage.set('city',city)
        },
        setIdentity(identity){
            this.identity = identity
            storage.set('identity',identity)
            if(identity === "admin"){
                addAdminRoutes()
            }
        },
        delIdenttity(identity){
            this.identity = identity
            storage.remove("identity")
            removeAdminRoutes()
        },
        delToken(){
            this.token = "";
            storage.remove("token");
        },
        delHeadImg(headImg){
            this.headImg = ""
            storage.remove("headImg")
        }
    }
})

export default useStore