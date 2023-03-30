/*
 * @Author: xiaoHao
 */
  // 仓库之间的代码相互pull
    // const res = await octokit.request('POST /repos/HaozaiGo/HaozaiGo/pulls', {
    //   title: 'Cri_wu',
    //   body: 'Please pull these awesome changes in!',
    //   head: "HaozaiGo:main",
    //   title: 'auto pull',
    //   base: "dev_next",
    //   accept:"application/vnd.github+json"
    // })

 // 获取仓库的下载url

    // const owner = 'HaozaiGo';
    // const repo ='HaozaiGo';
    // const path = 'src';
    // const res = await octokit.request(`GET /repos/${owner}/${repo}/contents/${path}`, {
    
    // })

    // await octokit.request('POST /repos/{owner}/{repo}/git/trees', {
    
    //   base_tree: '9fb037999f264ba9a7fc6274d15fa3ae2ab98312',
    //   tree: [
    //     {
    //       path: 'file.rb',
    //       mode: '100644',
    //       type: 'blob',
    //       sha: '44b4fc6d56897b048c772eb4087f854f46256132'
    //     }
    //   ],
    //   headers: {
    //     'X-GitHub-Api-Version': '2022-11-28'
    //   }
    // })
   
  //   const res = await octokit.request(`PUT /repos/${owner}/${repo}/contents/${path}`, {
    
  //     message: 'my commit message',
  //     committer: {
  //       name: 'Monalisa Octocat',
  //       email: 'octocat@github.com'
  //     },
  // })

    // console.log(res);