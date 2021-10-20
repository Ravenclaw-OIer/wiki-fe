/* eslint-disable require-jsdoc */
import {Octokit} from 'https://cdn.skypack.dev/octokit';

async function checkAuth() {
  if (!userPAT) {
    // redirect user to login page
    window.location.href = '../auth/';
  } else {
    const menuInst = new mdui.Menu('#appbar-user', '#user-menu');
    menuInst.open();
  }
}
async function jumpUserPage() {
  const {
    data: {login},
  } = await octokit.rest.users.getAuthenticated();
  window.location.href = '../view/?title=User:' + login;
}
export function instOctokit(userPAT) {
  const octokit = new Octokit({auth: userPAT}); 
  return octokit;
}

try {
  document.getElementById('appbar-user').
      addEventListener('click', checkAuth);
  document.getElementById('user-menu-userpage').
      addEventListener('click', jumpUserPage);
} catch (e) {
  if (e instanceof TypeError) {
    console.error('Cannot find element: check your html');
  }
}
const userPAT = window.sessionStorage.getItem('PAT');
console.log(userPAT);

