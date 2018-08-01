/*
* @Author: zhong
* @Date:   2018-07-29 10:27:45
* @Last Modified by:   zhong
* @Last Modified time: 2018-08-01 20:17:34
* 注册界面
*/

var oEmail = document.getElementById("email");
var oName = document.getElementById("name");
var okey = document.getElementById("key");
var okey2 = document.getElementById("key2");
var oBtn = document.getElementById("btn");


//验证信息
var emailWarn = document.getElementById("emailWarn");
var nameWarn = document.getElementById("nameWarn");
var keyWarn = document.getElementById("keyWarn");
var key2Warn = document.getElementById("key2Warn");

var reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/; //邮箱
var reg1 = /^[a-zA-Z0-9_\u4e00-\u9fa5]{3,10}$/; //
var reg2 = /^\w{6,12}$/ //  6~12位的字母数字或下划线

var a = 0,
    b = 0,
    c = 0,
    d = 0;


oBtn.onclick = function() {

  if (a + b + c + d != 4) {
    alert("请补充完整信息");
    return;
  }

  //判断用户名是否已经被注册
  if (localStorage.getItem("bank")) {
    var arrBank = JSON.parse(localStorage.getItem("bank"));

    for(var i = 0; i < arrBank.length; i++) {
      var obj = arrBank[i];
      if(oEmail.value == obj.email) {
        emailWarn.innerHTML = "✗邮箱已被注册！";
        emailWarn.style.color = "red";
        return;
      } else if(oName.value == obj.name) {
        nameWarn.innerHTML = "✗用户名已被注册！";
        nameWarn.style.color = "red";     
        return;    
      }
    }
  }



  // var val ="name"+":"+oName.value + ","+"key" +":"+okey.value+","+"email"+":"+oEmail.value;
  var val = {
    "name": oName.value,
    "key": okey.value,
    "email": oEmail.value
  } 


  localStorage.setItem("user", JSON.stringify(val));


  var bankval = (localStorage.getItem("bank") != null) ? JSON.parse(localStorage.getItem("bank")) : [];
  //判断之前是否存在bank
  // if(localStorage.getItem("bank")) {
  //   alert(typeof JSON.parse(localStorage.getItem("bank")));
  //   var bankval = JSON.parse(localStorage.getItem("bank")).push(val);  //用,分隔每个用户
  // } else {
  //   var bankval = new Array();
    bankval.push(val);
    alert(bankval);
    alert(val);
  // }

  localStorage.setItem("bank", JSON.stringify(bankval));
  window.location.href = "styles/homePage.html";
}


oEmail.onblur = function() {
  if (reg.test(oEmail.value)) {
    emailWarn.innerHTML = "✓";
    emailWarn.style.color = "green";
    a = 1;
  } else {
    emailWarn.innerHTML = "✗邮箱格式错误！";
    oEmail.value = "";
    emailWarn.style.color = "red";
  }
}

oName.onblur = function() {
  if (reg1.test(oName.value)) {
    nameWarn.innerHTML = "✓";
    nameWarn.style.color = "green";
    b = 1;
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
    c = 1;
  } else {
    keyWarn.innerHTML = "✗请输入6~12位的字母、数字或汉字";
    okey.value = "";
    keyWarn.style.color = "red";   
  }
}

okey2.onblur = function() {
  if(okey2.value == okey.value) {
    key2Warn.innerHTML = "✓";
    key2Warn.style.color = "green";
    d = 1;
  } else {
    key2Warn.innerHTML = "✗两次输入的密码不同";
    okey2.value = "";
    key2Warn.style.color = "red";
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







