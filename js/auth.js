/* eslint-disable require-jsdoc */
import {instOctokit} from './common.js';
async function auth(event) {
  event.preventDefault();
  const userPAT = document.getElementById('user-pat').value;
  console.log('Auth called with user PAT = ' + userPAT);
  // validate PAT
  if (!userPAT.match('ghp_*')) {
    document.getElementById('bad-pat-format')
        .innerHTML = 'Incorrect PAT format' +
        ', does it start with <code>ghp_</code> ?';
    document.getElementById('user-pat').value = '';
  } else {
    try {
      const octokit = instOctokit(userPAT);
      document.getElementById('bad-pat-format')
          .innerHTML =
          'Awaiting response from GitHub...';
      const {
        data: {login},
      } = await octokit.rest.users.getAuthenticated();
      console.log(login);
      // save data in sessionStorage
      window.sessionStorage.setItem('PAT', userPAT);
      window.location.href = '../view/?title=MainPage';
    } catch (e) {
      console.log('Bad credentials');
      document.getElementById('bad-pat-format')
          .innerHTML =
          'Incorrect PAT, please check whether you have pasted it correctly';
    }
  }
}


document.getElementById('github-pat-form').addEventListener('submit', auth);
