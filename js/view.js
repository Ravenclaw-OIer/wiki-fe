/* eslint-disable require-jsdoc */
import {Octokit} from 'https://cdn.skypack.dev/octokit';
function loadArticle() {
  const title = window.location.href;
  console.log(title);
  document.getElementById('content-top-title-text')
      .append(new URL(title).searchParams.get('title'));
}


loadArticle();
