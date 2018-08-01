/*
* @Author: zhong
* @Date:   2018-07-29 09:58:25
* @Last Modified by:   zhong
* @Last Modified time: 2018-07-31 10:30:53
* 登录界面
*/

var oName = document.getElementById("loginName");
var okey = document.getElementById("loginKey");

var oBtn = document.getElementById("loginBtn");


var emailWarn = document.getElementById("emailWarn");
var nameWarn = document.getElementById("nameWarn");
var keyWarn = document.getElementById("keyWarn");
var key2Warn = document.getElementById("key2Warn");


var reg1 = /^[a-zA-Z0-9_\u4e00-\u9fa5]{3,10}$/;
var reg2 = /^\w{6,12}$/;


loginBtn.onclick = function() {

  if (localStorage.getItem("bank")) {
    var arrBank = localStorage.getItem("bank").split("↭");
    var judge = false; 

    for (var i = 0; i < arrBank.length; i++) {
      var obj = convertCartStrToObj(arrBank[i]);
      if (oName.value == obj.name) {    //通过对象.属性的方法获取姓名，并与文本框输入对比
        if(okey.value == obj.key){     //通过对象.属性的方法获取密码，并与文本框输入对比
          alert("登陆成功");
          localStorage.setItem("user", arrBank[i]);
          window.location.href = "homePage.html";
          return;
        } else {
          alert("密码错误")
          okey.innerHTMl = "";
          return;
        }
      var judge = true;           
      }
    }
    alert("该用户不存在！");
  }
}

///////////////

oName.onblur = function() {
  if (reg1.test(oName.value)) {
    nameWarn.innerHTML = "✓";
    nameWarn.style.color = "green";
  } else {
    nameWarn.innerHTML = "✗请输入3~10位的字母、数字或汉字";
    oName.value = "";
    nameWarn.style.color = "red";   
  }
}

okey.onblur = function() {
  if (reg2.test(okey.value)) {
    keyWarn.innerHTML = "✓";
    keyWarn.style.color = "green";
  } else {
    keyWarn.innerHTML = "✗请输入6~12位的字母、数字或汉字";
    okey.value = "";
    keyWarn.style.color = "red";   
  }
}

function convertCartStrToObj(arr){        
   var obj ={};
 
   var arrVal = arr.split(",");  
   for (var i = 0; i < arrVal.length ;i++){
      data = arrVal[i].split(":"); 
      console.log(data);
      obj[data[0]] = data[1]; 
   }
  return obj;
}
