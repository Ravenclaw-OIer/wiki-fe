/* eslint-disable require-jsdoc */
import {instOctokit} from './common.js';


async function loadArticle() {
  const title = window.location.href;
  console.log(title);
  const titleText = new URL(title).searchParams.get('title');
  document.getElementById('content-top-title-text')
      .append(titleText);
  // gets the repo from config.json
  const config = await
  fetch('../js/config.json').then((response)=> response.json())
      .then((data) => {
        console.log(data);
        return data;
      });
  console.log(config);
  const contentRepo = config.contentRepo;
  console.log(contentRepo);
  // actually grab the MD source
  try {
    const {
      data: {content},
    } = await
    octokit.rest.repos.getContent({
      owner: contentRepo.owner,
      repo: contentRepo.repo,
      path: '/' + titleText + '.md',
    });
    console.log(content);
    const markdownSource = decodeURIComponent(escape(window.atob(content)));
    console.log(markdownSource);
    // render markdownSource
    const rendered = await
    octokit.rest.markdown.render({
      text: markdownSource,
    });
    console.log(rendered.data);
    document.getElementById('content-body').innerHTML = rendered.data;
  } catch (e) {
    console.error(e);
  }
}


const userPAT = window.sessionStorage.getItem('PAT');
const octokit = instOctokit(userPAT);
loadArticle();
