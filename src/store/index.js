import { defineStore} from 'pinia'
import storage from "../util/storage";


const useStore = defineStore('boke',{
    persist:{
        enabled:true
    },
    state:()=>({
        token:"",
        userName:"",
        headImg:"",
        visit:{
            city:"",
            ip:""
        }
    }),
    getters:{
        getToken(){
            return this.token || storage.get("token") || ""
        },
        getHeadImg(){
            return this.headImg || storage.get("headImg") || ""
        },
        getVisit(){
            return this.visit
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
        setVisit(visit){
            this.visit = visit;
        },
        delToken(){
            this.token = "";
            storage.remove("token");
        },
        delHeadImg(headImg){
            this.headImg = ""
            storage.remove("headImg")
        },
        setUserInfo(userName) {
            this.userName = userName;
        }
    }
})

export default useStore