/* eslint-disable no-inner-declarations */
{
  'use strict';

  /* TITLE CLICK HANDLER */

  const titleClickHandler = function (event) {
    event.preventDefault();
    const clickedElement = this;

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */
    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts .post');

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

    /* get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');

    /* find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);

    /* add class 'active' to the correct article */
    targetArticle.classList.add('active');
  };

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags, .list',
    optArticleAuthorSelector = '.post-author';

  /* GENERATE TITLE LINKS */
  function generateTitleLinks(customSelector = '') {
    /* [DONE] remove the contents of titlelist */
    const titleList = document.querySelector(optTitleListSelector);

    /* [DONE] find all the articles and save them to variable: articles */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);

    let html = '';

    for (let article of articles) {

      /* [DONE] get the article id */
      const articleId = article.getAttribute('id');

      /* [DONE] find the title element & get the title from the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* [DONE] create HTML of the link */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

      /* [DONE] insert link into titleList */
      html = html + linkHTML;
    }

    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');

    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  }
  generateTitleLinks();


  /* GENERATE TAGS */

  function generateTags() {
    /* [DONE] find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* [DONE] START LOOP: for every article: */
    for (let article of articles) {

      /* [DONE] find tags wrapper */
      const tagList = article.querySelector(optArticleTagsSelector);
      //console.log('taglist:', tagList);

      /* [DONE] make html variable with empty string */
      let html = '';

      /* [DONE] get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      //console.log('articleTags:', articleTags);

      /* [DONE] split tags into array */
      const articleTagsArray = articleTags.split(' ');
      //console.log('articleTagsArray:', articleTagsArray);

      /* [DONE] START LOOP: for each tag */
      for (let tag of articleTagsArray) {
        //console.log('tag:', tag);

        /* [DONE] generate HTML of the link */
        const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
        //console.log('linkHTML:', linkHTML);

        /* [DONE] add generated code to html variable */
        html = html + linkHTML;

        /* [DONE] END LOOP: for each tag */
      }
      /* [DONE] insert HTML of all the links into the tags wrapper */
      tagList.innerHTML = html;

      /* [DONE] END LOOP: for every article: */
    }
  }
  generateTags();


  /*TAG CLICK HANDLER*/

  function tagClickHandler(event) {

    /* prevent default action for this event */
    event.preventDefault();
    console.log(event);

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    console.log('clikedElement: ', clickedElement);

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log('href: ' + href);

    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    console.log('repleceTag: ' + tag);

    /* [DONE] find all tag links with class active */
    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
    console.log('activeTag:', activeTags);


    /* [DONE] START LOOP: for each active tag link */
    for (let activeTag of activeTags) {

      /* remove class active */
      activeTag.classList.remove('active');
      console.log('removeActiveTag');

      /* END LOOP: for each active tag link */
    }

    /* find all tag links with "href" attribute equal to the "href" constant */
    const targetTags = document.querySelectorAll('a[href="' + href + '"]');
    console.log('targetTags: ', targetTags);

    /* START LOOP: for each found tag link */
    for (let targetTag of targetTags) {
      console.log('foundTag: ', targetTag);

      /* add class active */
      targetTag.classList.add('active');

      /* END LOOP: for each found tag link */
    }

    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }

  /* ADD LISTENERS TO TAG */

  function addClickListenersToTags() {

    /* find all links to tags */
    const tagLinks = document.querySelectorAll('.post-tags a');
    console.log('foundTags: ', tagLinks);

    /* START LOOP: for each link */
    for (let tagLink of tagLinks) {

      /* add tagClickHandler as event listener for that link */
      tagLink.addEventListener('click', tagClickHandler);

      /* END LOOP: for each link */
    }
  }
  addClickListenersToTags();


  /* GENERATE POST AUTHORS */

  function generateAuthors() {

    /*find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    console.log('found articles: ', articles);

    /*START LOOP: for each article */
    for (let article of articles) {

      /* [DONE] find author wrapper */
      const authorList = article.querySelector(optArticleAuthorSelector);
      console.log('found author wrapper: ', authorList);

      /* make html variable with empty string */
      let html = '';

      /* get author from data-author attribute*/
      const articleAuthor = article.getAttribute('data-author');

      /* [DONE] generate HTML of the link */
      const linkHtml = '<a href="#author-' + articleAuthor + '">' + articleAuthor + '</a>';

      /* [DONE] add generated code to html variable */
      html = html + linkHtml;

      /* [DONE] insert HTML of all the links into the author wrapper */
      authorList.innerHTML = html;

      /* [DONE] END LOOP: for each author */
    }
  }
  generateAuthors();
}



