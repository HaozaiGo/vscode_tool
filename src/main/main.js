/*
 * @Author: xiaoHao
 */
/*
 * @Author: xiaoHao
 */
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const { Octokit, App } = require("octokit");
const shell = require("shelljs"); 
const octokit = new Octokit({ 
  auth: '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',
});


// 仓库地址 请求项目地址
const url = 'https://api.github.com/repos/HaozaiGo/HaozaiGo';
// const url = 'https://api.github.com/users/HaozaiGo/repos';


// 数据缓存
if (typeof localStorage === "undefined" || localStorage === null) {

  var LocalStorage = require('node-localstorage').LocalStorage;

  localStorage = new LocalStorage('./scratch');
}

// 载入方法
  function load(url, callback) {
    const xhr = new XMLHttpRequest();
  
    xhr.open('GET', url, true);

    xhr.setRequestHeader('Authorization','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');
    xhr.setRequestHeader('accept','application/vnd.github+json')
    xhr.setRequestHeader('Content-Type','application/json')

    xhr.onreadystatechange = () => {
      
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
              callback(xhr)
          }
      }
    }
  
    xhr.send('');
  }

  /*
    对比更新时间
    @params: 更新时间

    return 是否更新
  */
  function compareUpdate(time){

    const updatedTime = localStorage.getItem('updatedTime');

    let hadUpdate; //是否更新

    console.log(updatedTime)
    console.log(time);

    if(updatedTime === "" || updatedTime === null){
      localStorage.setItem('updatedTime',time);
      return hadUpdate = true;
    }else{
      hadUpdate = updatedTime === time ? false : true
    }
    return hadUpdate
  } 

  // 更新操作
  async function handleUpadte(){

    await shell.exec(`git pull`)
    console.log('-----更新完成----');
  }


  // 载入
  load(url,function(e){
    const res = JSON.parse(e.responseText)

     let onlineUpdate = compareUpdate(res.updated_at)
    console.log(onlineUpdate);
     if(onlineUpdate){
      // 执行更新
      console.log('-----执行更新------');
      handleUpadte()
     }else{
      console.log('不需要更新');
      // handleUpadte()
     }

  
  })



module.exports = load