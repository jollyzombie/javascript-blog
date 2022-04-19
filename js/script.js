/* eslint-disable no-inner-declarations */
'use strict';

{
  const optArticleSelector = '.post';
  const optTitleSelector = '.post-title';
  const optTitleListSelector = '.titles';
  const optArticleTagsSelector = '.post-tags, .list';
  const optArticleAuthorSelector = '.post-author';
  const optTagsListSelector = '.list.tags';


  const titleClickHandler = function (event) {
    event.preventDefault();

    const clickedElement = this;
    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    clickedElement.classList.add('active');
    const activeArticles = document.querySelectorAll('.posts .post');

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

    const articleSelector = clickedElement.getAttribute('href');
    const targetArticle = document.querySelector(articleSelector);
    targetArticle.classList.add('active');
  };


  function generateTitleLinks(customSelector = '') {
    const titleList = document.querySelector(optTitleListSelector);
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    let html = '';

    for (let article of articles) {

      const articleId = article.getAttribute('id');
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

      html = html + linkHTML;
    }

    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');

    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  }


  function generateTags() {
    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};

    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */
    for (let article of articles) {
      /* find tags wrapper */
      const tagList = article.querySelector(optArticleTagsSelector);

      /* make html variable with empty string */
      let html = '';

      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');

      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');

      /* START LOOP: for each tag */
      for (let tag of articleTagsArray) {

        /* generate HTML of the link */
        const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';

        /* add generated code to html variable */
        html = html + linkHTML;

        /* [NEW] check if this link is NOT already in allTags */
        if (!allTags[tag]) {

          /** [NEW] add tag to allTags object */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }

        /* END LOOP: for each tag */
      }

      /* insert HTML of all the links into the tags wrapper */
      tagList.innerHTML = html;

      /* END LOOP: for every article: */
    }

    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(optTagsListSelector);

    /* [NEW] create variable for all links HTML code */
    let allTagsHTML = '';

    /* [NEW] START LOOP: for each tag in allTags: */
    for (let tag in allTags) {

      /* [NEW] generate code of a link and add it to allTagsHTML */
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      allTagsHTML += linkHTML + ' (' + allTags[tag] + ') ';

    /* [NEW] END LOOP: for each tag in allTags: */
    }

    /*[NEW] add HTML from allTagsHTML to tagList */
    tagList.innerHTML = allTagsHTML;

    /* [NEW] add HTML from allTags to taglist */
    //tagList.innerHTML = allTags.join('');
  }

  
  function tagClickHandler(event) {
    event.preventDefault();

    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const tag = href.replace('#tag-', '');
    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');


    for (let activeTag of activeTags) {
      activeTag.classList.remove('active');
    }

    const targetTags = document.querySelectorAll('a[href="' + href + '"]');

    for (let targetTag of targetTags) {
      targetTag.classList.add('active');
    }
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }


  function addClickListenersToTags() {
    const tagLinks = document.querySelectorAll('.post-tags a');

    for (let tagLink of tagLinks) {
      tagLink.addEventListener('click', tagClickHandler);
    }
  }


  function generateAuthors() {
    const articles = document.querySelectorAll(optArticleSelector);

    for (let article of articles) {
      const authorList = article.querySelector(optArticleAuthorSelector);
      let html = '';
      const articleAuthor = article.getAttribute('data-author');
      const linkHtml = 'by <a href="#author-' + articleAuthor + '">' + articleAuthor + '</a>';
      html = html + linkHtml;
      authorList.innerHTML = html;
    }
  }


  function authorClickHandler(event) {
    event.preventDefault();

    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const author = href.replace('#author-', '');
    const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');

    for (let activeAuthor of activeAuthors) {
      activeAuthor.classList.remove('active');
    }

    const targetAuthors = document.querySelectorAll('a[href="' + href + '"]');

    for (let targetAuthor of targetAuthors) {
      targetAuthor.classList.add('active');
    }
    generateTitleLinks('[data-author="' + author + '"]');
  }

  function addClickListenerToAuthors() {

    const authorLinks = document.querySelectorAll('.post-author a');

    for (let authorLink of authorLinks) {
      authorLink.addEventListener('click', authorClickHandler);

    }
  }

  generateTitleLinks();
  generateTags();
  addClickListenersToTags();
  generateAuthors();
  addClickListenerToAuthors();
}



