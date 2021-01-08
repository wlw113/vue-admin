<template>
    <div id="login">
        <div class="login-wrap">
            <ul class="menu-tab">
                <li  v-for="item in menuTab" :key="item.id" :class="{'current':item.current}" @click="toggleMenu(item)">{{item.txt}}</li>
            </ul>
            <!-- 表单 -->
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" size="medium" class="login-form">
                <el-form-item  prop="username" class="item-form">
                    <label>手机号</label>
                    <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
                </el-form-item>
                
                <el-form-item  prop="password" v-if="menuTab[1].current" class="item-form">
                    <label>密码</label>
                    <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                </el-form-item>
                
                <el-form-item  prop="code" v-if="menuTab[0].current" class="item-form">
                    <label>验证码</label>
                    <el-row :gutter="20">
                        <el-col :span="15"><el-input v-model.number="ruleForm.code"></el-input></el-col>
                        <el-col :span="9">
                            <el-button type="success" @click="getCodes()" class="block" :disabled="codeButtonStatus.status">{{codeButtonStatus.text}}</el-button>
                            </el-col>
                    </el-row>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')" :disabled="menuTab[0].current" class="login-btn block">{{menuTab[0].current==true?"登录":"注册"}}</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import {userLogin,getCode} from "@/api/login"
import axios from "axios";
import{reactive,ref,isref,toResfss,onMounted} from "@vue/composition-api";
import{ validateUserPhone,validateCode} from "@/utils/validate";
export default {
  name:'login',
  setup(props,context){
    //模块值
    const model=ref('login');
    //挂载完成后自动执行的
    onMounted(()=>{

    })
    //验证手机号
      let checkUserPhone=(rule,value,callback)=>{
        if(!value)
        {
         return callback(new Error('手机号不能为空'));
        }
        // else if(validateUserPhone(value)){
        //   return  callback(new Error('请输入正确的手机号！'));
        // }
        else{
          callback();
        }
      }
      //验证密码
      let validatePassWord =(rule,value,callback)=>{
        if(!value){
          return callback(new Error('密码不能为空'));
        }
        else{
          callback();
        }
      }
      //验证验证码
        let checkCode = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('验证码不能为空'));
        }
        else if(validateCode(value))
        {
          return callback(new Error('请输入6位数的验证码！'));
        }
        else{
          callback();
        }
      };
    
    //声明表单数据
    const ruleForm=reactive( {
          username: '',
          password: '',
          code: ''
        })
    //表单验证
    const rules=reactive({
      username: [{ validator: checkUserPhone, trigger: 'blur' }],
      password: [{ validator: validatePassWord, trigger: 'blur' }],
      code: [{ validator: checkCode, trigger: 'blur' }]
    })
    //data数据
    const menuTab=reactive([
      {txt:'手机号登录',current:true,type:'phoneLogin'},
      {txt:'密码登录',current:false,type:'passwordLogin'}
    ])

    //声明函数
    const toggleMenu=(data=>{
            menuTab.forEach(element => {
                element.current=false
            });
            //高光
            data.current=true
            context.refs["ruleForm"].resetFields();
        })

    /**定义获取验证码按钮状态 */
    const codeButtonStatus=reactive({
      status:false,
      text:"获取验证码"
    })  
    /**倒计时 */
    const timer=ref(null);
    const countDown=((number)=>{
      let time=number
      timer.value=setInterval(() => {
        time--;
        console.log(timer.value);
        if(time===0)
        {
          clearInterval(timer.value);
          codeButtonStatus.status=false;
          codeButtonStatus.text="重新发现验证码";
        }
        codeButtonStatus.text=`已发送${time}秒`;
      }, 1000);
    })
     /**获取验证码 */
     const getCodes=(()=>{
       let data={
         username:ruleForm.username
       }
      codeButtonStatus.status=true;
      codeButtonStatus.text="已发送";
      countDown(60);
      setTimeout(()=>{
          getCode(data).then(Response=>{

                }).catch(error=>{

                });
      },3000)
      
     })   
    /**提交表单 */
    const submitForm=(formName=> {
        context.refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    })

    return{
      menuTab,
      model,
      toggleMenu,
      codeButtonStatus,
      submitForm,
      rules,
      ruleForm,
      getCodes
    }
  }
}
</script>
<style lang="scss"  scoped>
#login{
height: 100vh;
background-color: royalblue;
}
.login-wrap{
    width:330px;
    margin:auto;
}
.menu-tab{
    text-align:center;
    li{
        display: inline-block;
        width: 88px;
        line-height: 36px;
        font-size:14px;
        color: #ffffff;
        border-radius: 2px;
        cursor:pointer;
    }
    .current{
        background-color: rgba(0,0,0,.1);
    }
}
.login-form{
    margin-top: 29px;
    label{
        display: block;
        margin-bottom: 3px;
        font-size: 14px;
        color: #ffffff;
    }
    .item-from{margin-bottom: 13px;}
    .block{
        display: block;
        width:100%;
    }
    .login-btn{margin-top: 10px;}
    }

</style>
