// ==UserScript==
// @name         琉璃神社自动下载
// @namespace    http://tampermonkey.net/
// @version      2024-03-08
// @description  try to take over the world!
// @author       You
// @match        https://www.hacg.mov/wp/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=hacg.mov
// @grant        GM_xmlhttpRequest

// ==/UserScript==

//11111

var cili = [];
var a = 3111111;
function main() {
    var main_div = document.getElementsByClassName('entry-content')[0];
    var content = main_div.innerHTML;
    //console.log(content)
    let regex = /[0-9a-z]{30,}/gim;
    let result1 = content.match(regex); // 匹配磁链
    var result = Array.from(new Set(result1));
    console.log(result)

    //添加定位

    content = content.replace(result[0],'<div id="popup" class="popup"><p id="popupContent"></p></div><span id="showme"></span>'+result[0])
    for (var i in result){
        cili[i] = 'magnet:?xt=urn:btih:' + result[i]
        console.log(cili[i]);
        content = content.replace(result[i],'<span style="color:red">'+cili[i]+'</span>')
    };
    var num = result.length;
    main_div.innerHTML = content+'<a href ="#" ><button id="btn_show">磁</button></a><button id="btn_download" onclick="download()">下</button></a>';


};


function set_btn_style(){
    var button = document.getElementById('btn_show')
    button.style.position = 'fixed';
    button.style.top = '400px'; // 距离顶部的距离
    button.style.right = '10px'; // 距离右侧的距离
    button.style.width='50px';
    button.style.height='50px';
    button.style.textAlign = 'center'; //
    button.style.border = 'none'; // 去除边框
    button.style.borderRadius = '5px'; // 圆角
    button.style.backgroundColor = '#4CAF50'; // 背景颜色
    button.style.color = 'white'; // 文字颜色
    button.style.fontSize = '16px'; // 文字大小
    button.style.cursor = 'pointer'; // 鼠标样式为手指
    button.style.zIndex = 9999;

    var button2 = document.getElementById('btn_download')
    button2.style.position = 'fixed';
    button2.style.top = '500px'; // 距离顶部的距离
    button2.style.right = '10px'; // 距离右侧的距离
    button2.style.width='50px';
    button2.style.height='50px';
    button2.style.textAlign = 'center'; //
    button2.style.border = 'none'; // 去除边框
    button2.style.borderRadius = '5px'; // 圆角
    button2.style.backgroundColor = '#4CAF50'; // 背景颜色
    button2.style.color = 'white'; // 文字颜色
    button2.style.fontSize = '16px'; // 文字大小
    button2.style.cursor = 'pointer'; // 鼠标样式为手指
    button2.style.zIndex = 9999;
    button2.onclick=function(){
        download();
    }

}

//添加磁力到qbittorrent
function download(){
    var add_url = 'http://192.168.0.108:8088/api/v2/torrents/add';
    var add_m = ''
    var formdata = new FormData;


    for (var index in cili){
        add_m = add_m + cili[index] + '\n';
    }

    formdata.append('urls',add_m)
    formdata.append( 'autoTMM', 'false')
    formdata.append('savepath','/downloads')
    formdata.append('paused', 'false')
    formdata.append('stopCondition', 'None')
    formdata.append('contentLayout', 'Original')
    formdata.append('dlLimit', 'NaN')
    formdata.append('upLimit', 'NaN')

    GM_xmlhttpRequest({
        url:add_url,
        method :"POST",
        data:formdata,
        onload:function(xhr){
            console.log(add_m);
            console.log(xhr.responseText);
            showPopup(xhr.responseText)
        }
    });
};



function scroll(){
    // 获取按钮元素
    var scrollButton = document.getElementById('btn_show');

    // 点击按钮时滚动到组件 并使其居中显示
    scrollButton.addEventListener('click', function() {
        var targetElement = document.getElementById('showme');
        var yOffset = targetElement.getBoundingClientRect().top - window.innerHeight / 2 + targetElement.clientHeight / 2;
        window.scrollTo({
            top: yOffset,
            behavior: 'smooth'
        });
    });
}


// 显示弹出提示窗函数
function showPopup(message) {
    // 设置popup按钮 CSS 样式规则
    var cssCode = `.popup {\
        display: none;\
        position: fixed;\
        top: 50%;\
        left: 50%;\
        transform: translate(-50%, -50%);\
        padding: 20px;\
        background-color: lightblue;\
        border: 1px solid #ccc;\
        color:red;\
        border-radius: 5px;\
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);\
        z-index: 9999;\
    }`;
    //创建新的style
    var styleElement = document.createElement('style');
    // 将 CSS 样式规则添加到 style 元素中
    styleElement.appendChild(document.createTextNode(cssCode));
    // 将 style 元素添加到 head 中
    document.head.appendChild(styleElement);
    //定位按钮
    var popup = document.getElementById('popup');

    var popupContent = document.getElementById('popupContent');
    popupContent.textContent = message; // 设置提示内容
    popup.style.display = 'block'; // 显示弹出提示窗

    // 2秒后自动关闭弹出提示窗
    setTimeout(function() {
        popup.style.display = 'none';
    }, 2000);
};



main();
set_btn_style();
scroll();
