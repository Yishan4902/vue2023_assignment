
import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

const app = {
    data(){
        return{
            products:[],
            tempProducts:{},
        }
    },

    methods:{
        //登入驗證 初始化時就執行
        userCheck(){
            axios.post(`${url}/api/user/check`)
            .then(res=>{
                console.log(res.data);
                this.getProductList();
            })
            .catch(err=>{
                alert(err.response.data.message);
                window.location.href = "login.html";
            })
                
            
        },
        //取得商品列表，資料賦予在this.products內
        getProductList(){
            axios.get(`${url}/api/${api_path}/admin/products/all`)
            .then(res=>{
                console.log(res.data);
                this.products = res.data.products;
            })
            .catch(err=>{
                alert(err.response.data.message);
            })
        },
        //商品細節，資料賦予在this.tempProducts內
        productDetail(item){
            this.tempProducts = item;
        }

    },

    mounted(){
        //把暫存cookie的token取出
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        //設定token自動帶入header
        axios.defaults.headers.common['Authorization'] = token;
        this.userCheck();

    }
}

createApp(app).mount('#app'); //渲染