/*
 * @Author: xiaoHao
 */
/*
 * @Author: xiaoHao
 */
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const { Octokit, App } = require("octokit");
const path = require('path');
const shell = require("shelljs");
const vscode = require('vscode');
const octokit = new Octokit({
  auth: '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',
});

// 仓库地址 请求项目地址
const url = vscode.workspace.getConfiguration('code-auto-pull').address || 'https://api.github.com/repos/HaozaiGo/HaozaiGo';

let token = vscode.workspace.getConfiguration('code-auto-pull').token || '';
// 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

// 数据缓存
if (typeof localStorage === "undefined" || localStorage === null) {

  var LocalStorage = require('node-localstorage').LocalStorage;

  localStorage = new LocalStorage('./scratch');
}



// 载入方法
function load(url, callback) {
  const xhr = new XMLHttpRequest();

  xhr.open('GET', url, true);

  // xhr.setRequestHeader('Authorization', token);

  xhr.setRequestHeader('accept', 'application/vnd.github+json')
  xhr.setRequestHeader('Content-Type', 'application/json')

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
function compareUpdate(time) {

  const updatedTime = localStorage.getItem('updatedTime');

  let hadUpdate; //是否更新

  console.log(updatedTime) //上次更新时间
  console.log(time);

  if (updatedTime === "" || updatedTime === null) {
    localStorage.setItem('updatedTime', time);
    return hadUpdate = true;
  } else {
    hadUpdate = updatedTime === time ? false : true
  }
  return hadUpdate
}

// 更新操作
async function handleUpadte() {
  const res = new Promise((resolve, reject) => {
    // shell.cd('E:\\HaozaiGo\\HaozaiGo');
    const Path = vscode.workspace.getConfiguration('code-auto-pull').path || path.resolve(__dirname, '..');
  
    shell.cd(Path);
    shell.exec(`git pull`, (code, stdout, stderr) => {
      console.log(code);
      if (code === 0) {
        shell.echo('-----更新完成----')

        resolve()
      } else {
        shell.echo('-----更新失败----')
        reject()
      }
    })
  })
  return res
  
}
 
module.exports = function (context) {
  console.log(vscode.workspace.getConfiguration('code-auto-pull'));

  context.subscriptions.push(vscode.commands.registerCommand('code-auto-pull', () => {
    vscode.window.showInformationMessage('Hello code-auto-pull!');
    // 载入
    load(url, function (e) {
      const res = JSON.parse(e.responseText)
      // console.log(res);
      let onlineUpdate = compareUpdate(res.pushed_at)

      if (onlineUpdate) {
        // 执行更新
        console.log('-----执行更新------');
        handleUpadte().then(() => {
          console.log('写入更新时间');
          localStorage.setItem('updatedTime', res.pushed_at);
        })
      } else {
        console.log('不需要更新');

      }


    })
  }));



}