/*
* @Author: zhong
* @Date:   2018-07-25 18:52:50
* @Last Modified by:   zhong
* @Last Modified time: 2018-07-27 16:48:29
*/
var EventUtil = {

  addHandler: function(element, type, handler) {
    if (element.addEventListener) {
      element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
      element.attachEvent("on" + type, handler);
    } else {
      element["on" + type] = handler;
    } 
  },

  removeHandler: function (element, type, handler) {
    if (element.removeEventListener) {
      element.removeEventListener(type, handler, false);
    } else if (element.detachEvent) {
      element.detachEvent("on" + type, handler);
    } else {
      element["on" + type] = null;
    }    
  },

  getEvent: function (event) {
    return event ? event : window.event;
  },

  getTarget: function (event) {
    return event.target || event.srcElement;
  },

  preventDefault: function (event) {
    if(event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
  },

  stopPropagation: function (event) {
    if(event.stopPropagation) {
      event.stopPropagation();
    } else {
      event.cancelBubble = true;
    }    
  }

};


//计数
var num = 0;


//添加todo
function addText(e) {
  var e = e || window.event;

  var inputText = document.getElementById("input1");
  var allNewList = document.getElementById("allNewList");




  if(e.keyCode == 13) {
    //创建todo节点
    var li = document.createElement("li"),
        icon = document.createElement("span"),
        liText = document.createElement("span"),
        destroy = document.createElement("span");


    //添加删除键
    destroy.innerHTML = "<img id = 'deleted' src='../images/destroy.png' width='40px'>";
    destroy.id = "span3";  

    li.appendChild(icon);
    li.appendChild(liText);
    li.appendChild(destroy);

    li.name = "closed";
    li.id = "liList";



    icon.id = "iconImg";
    icon.innerHTML = "<img id = 'closed' src='../images/check-0.png' width='64px' height='auto'>";
    

    //判断是否为空或者全是空格
    if(inputText.value.replace(/(^\s*)|(\s*$)/g, "") == "") {
      return;
    }

    liText.innerHTML = inputText.value;

    document.getElementById('allNewList').appendChild(li);
  
    inputText.value = "";

    num ++;
    count();

    whereClick();

  }
}


//完成todo
var allNewList = document.getElementById("allNewList");

EventUtil.addHandler(allNewList, "click", function(event) {
  event = EventUtil.getEvent(event);
  var target = EventUtil.getTarget(event);
  var li = document.getElementById("liList");
  var icon = document.getElementById("iconImg");

  switch(target.id) {

    case 'closed':
      target.src = "../images/check-1.png";
      target.id = 'on';
      target.parentElement.parentElement.children[1].style = "text-decoration: line-through; opacity: 0.5";
      num--;
      count();
      break;

    case 'on':
      target.src = "../images/check-0.png";
      target.id = 'closed';
      target.parentElement.parentElement.children[1].style = "text-decoration: none; opacity: 1";
      num++;
      count();
      break;
  }

  whereClick();

})


//删除todo
var allNewList = document.getElementById("allNewList");
EventUtil.addHandler(allNewList, "click", function(event) {
  event = EventUtil.getEvent(event);
  var target = EventUtil.getTarget(event);
  var li = document.getElementById("liList");
  // var deIcon = document.getElementById("");

  if(target.id == 'deleted') {
    var parentsSon = target.parentElement.parentElement;
    var parents = parentsSon.parentElement;
    parents.removeChild(parentsSon);

    //判断亮着删除
    if(parentsSon.children[0].children[0].id != 'on') {
      num--;
      count();
    }  
  }
})



//活动选项
var buttonAll = document.getElementById("buttonAll");
var buttonActive = document.getElementById("buttonActive");
EventUtil.addHandler(buttonActive, "click", function(event) {
  event = EventUtil.getEvent(event);
  var target = EventUtil.getTarget(event);

  buttonAll.removeAttribute("class");
  buttonCompleted.removeAttribute("class");
  buttonActive.setAttribute("class", "active");

  var eleList = allNewList.querySelectorAll('li');

  //遍历未完成的节点
  for(var i = 0; i < eleList.length; i++) {
    if(eleList[i].children[0].children[0].id == "on") {
      eleList[i].style.display = "none"; 
    } else if (eleList[i].children[0].children[0].id == "closed") {
      eleList[i].style.display = ""; 
    }
  }
})


//已完成的
var buttonCompleted = document.getElementById("buttonCompleted");
EventUtil.addHandler(buttonCompleted, "click", function(event) {
  event = EventUtil.getEvent(event);
  var target = EventUtil.getTarget(event);

  buttonAll.removeAttribute("class");
  buttonActive.removeAttribute("class");
  buttonCompleted.setAttribute("class", "active");


  var eleList = allNewList.querySelectorAll('li');

  //遍历完成的节点
  for(var i = 0; i < eleList.length; i++) {
    if(eleList[i].children[0].children[0].id == "closed") {
      eleList[i].style.display = "none"; 
    } else if (eleList[i].children[0].children[0].id == "on") {
      eleList[i].style.display = ""; 
    }
  }
})


//所有的选项
var buttonAll = document.getElementById("buttonAll");
EventUtil.addHandler(buttonAll, "click", function(event) {
  event = EventUtil.getEvent(event);
  var target = EventUtil.getTarget(event);

  buttonActive.removeAttribute("class");
  buttonCompleted.removeAttribute("class");
  buttonAll.setAttribute("class","active");

  var eleList = allNewList.querySelectorAll('li');

  //遍历完成的节点
  for(var i = 0; i < eleList.length; i++) {
        eleList[i].style.display = ""; 
  }
})


//删除已完成
var buttonClearCompleted = document.getElementById("buttonClearCompleted");
EventUtil.addHandler(buttonClearCompleted, "click", function(event) {
  event = EventUtil.getEvent(event);
  var target = EventUtil.getTarget(event);

  var eleList = allNewList.querySelectorAll('li');

  //遍历完成的节点
  for(var i = 0; i < eleList.length; i++) {
    if(eleList[i].children[0].children[0].id == "on") {
      eleList[i].parentElement.removeChild(eleList[i]);
    } 
  }

  iconSelected.src = "../images/allSelect-0.png";
})



// 全选
var p1 = document.getElementById("p1");
var allSelect = document.getElementById("selected");

var allNewList = document.getElementById("allNewList");
var iconSelected = document.getElementById("iconSelected");

EventUtil.addHandler(allSelect, "click", function(event) {
  event = EventUtil.getEvent(event);
  var target = EventUtil.getTarget(event);

  var eleList = allNewList.querySelectorAll('li');


    switch (iconSelected.name) {

      case 'closed': 
        //遍历完成的节点
        for(var i = 0; i < eleList.length; i++) {
      
          var sonList = eleList[i].children[0].children[0];
      
          if (sonList.id == "closed") {
            sonList.id = "on";
            sonList.src = "../images/check-1.png";
            sonList.parentElement.parentElement.children[1].style = "text-decoration: line-through; opacity: 0.5";
            iconSelected.src = "../images/allSelect-1.png";
            num--;
            count();
          } 
        }  
        iconSelected.name = 'on';
        break;

      case 'on': 
        //遍历完成的节点
        for(var i = 0; i < eleList.length; i++) {
      
          var sonList = eleList[i].children[0].children[0];
      
          if (sonList.id == "on") {
            sonList.id = "closed";
            sonList.src = "../images/check-0.png";
            sonList.parentElement.parentElement.children[1].style = "text-decoration: none; opacity: 1";
            iconSelected.src = "../images/allSelect-0.png";
            num++;
            count();
          } 
        }  
        iconSelected.name = 'closed';
        break;
    }

    whereClick();
})


// 目录
var leftItems = document.getElementById("leftItems");
var leftNum = document.createElement("span");
leftItems.appendChild(leftNum);

function count() {
  leftNum.innerHTML = num;
}



//判断点击事件发生的位置，以实现不同的处理
function whereClick() {

  //如果在active 清掉  id== on;
  if (buttonActive.hasAttribute('class')) {
    var eleList = allNewList.querySelectorAll('li');

    //遍历完成的节点
    for(var i = 0; i < eleList.length; i++) {
      if (eleList[i].children[0].children[0].id == "on") {
        eleList[i].style.display = "none"; 
      } else if (eleList[i].children[0].children[0].id == "closed") {
        eleList[i].style.display = ""; 
      }
    }
  }

  //如果在completed 清掉  id== closed;
  if (buttonCompleted.hasAttribute('class')) {

    var eleList = allNewList.querySelectorAll('li');

    //遍历完成的节点
    for(var i = 0; i < eleList.length; i++) {
      if(eleList[i].children[0].children[0].id == "closed") {
        eleList[i].style.display = "none"; 
      } else if (eleList[i].children[0].children[0].id == "on") {
        eleList[i].style.display = ""; 
      }
    }
  }

}