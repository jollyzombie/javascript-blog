/* eslint-disable no-inner-declarations */
'use strict';

{
  const opts = {
    tagSizes: {
      count: 5,
      classPrefix: 'tag-size-',
    },
  };

  const select = {
    all: {
      articles: '.post',
      linksTo: {
        tags: 'a[href^="#tag-"]',
        authors: 'a[href^="#author-"]',
      },
    },
    article: {
      title: '.post-title',
      tags: '.post-tags .list',
      author: '.post-author',
    },
    listOf: {
      titles: '.titles',
      tags: '.tags.list',
      authors: '.authors.list',
    },
  };

  const active = {
    articles: '.posts article.active',
    links: {
      tags: 'a.active[href^="#tag-"]',
      authors: 'a.active[href^="#author-"]',
    },
  };


  const titleClickHandler = function (event) {
    event.preventDefault();

    const clickedElement = this;
    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    clickedElement.classList.add('active');
    const activeArticles = document.querySelectorAll(active.articles);

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

    const articleSelector = clickedElement.getAttribute('href');
    const targetArticle = document.querySelector(articleSelector);
    targetArticle.classList.add('active');
  };



  function generateTitleLinks(customSelector = '') {
    const titleList = document.querySelector(select.listOf.titles);
    const articles = document.querySelectorAll(select.all.articles + customSelector);

    let html = '';

    for (let article of articles) {
      const articleId = article.getAttribute('id');
      const articleTitle = article.querySelector(select.article.title).innerHTML;
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      html +=linkHTML;
    }

    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');

    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  }

  function calculateTagsParams(tags) {
    const params = {
      max: 0,
      min: 999999
    };

    for (let tag in tags) {
      params.max = Math.max(tags[tag], params.max);
      params.min = Math.min(tags[tag], params.max);
    }
    return params;
  }

  function calculateTagClass(count, params) {

    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(percentage * (opts.tagSizes.count - 1) + 1);
    const tagClass = opts.tagSizes.classPrefix + classNumber;

    return tagClass;
  }


  function generateTags() {
    let allTags = {};
    const articles = document.querySelectorAll(select.all.articles);

    for (let article of articles) {
      const tagWrapper = article.querySelector(select.article.tags);
      let html = '';
      const articleTags = article.getAttribute('data-tags');
      const tags = articleTags.split(' ');

      for (let tag of tags) {
        const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';

        html += linkHTML;
        if (!allTags[tag]) {
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
      }
      tagWrapper.innerHTML = html;
    }

    const tagList = document.querySelector(select.listOf.tags);
    const tagsParams = calculateTagsParams(allTags);
    let allTagsHTML = '';

    for (let tag in allTags) {
      const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + '</a></li>';

      allTagsHTML += tagLinkHTML;//+ ' (' + allTags[tag] + ') ';
    }
    tagList.innerHTML = allTagsHTML;
  }


  function tagClickHandler(event) {
    event.preventDefault();

    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const tag = href.replace('#tag-', '');
    const activeTags = document.querySelectorAll(active.links.tags);


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

    const tagLinksList = document.querySelectorAll('.list.tags a');

    for (let tagLinkList of tagLinksList) {
      tagLinkList.addEventListener('click', tagClickHandler);
    }
  }


  function generateAuthors() {
    let allAuthors = {};
    const articles = document.querySelectorAll(select.all.articles);

    for (let article of articles) {
      const authorWrapper = article.querySelector(select.article.author);
      let html = '';
      const articleAuthor = article.getAttribute('data-author');
      const authorLink = 'by <a href="#author-' + articleAuthor + '">' + articleAuthor + '</a>';

      html += authorLink;
      if (!allAuthors[articleAuthor]) {
        allAuthors[articleAuthor] = 1;
      } else {
        allAuthors[articleAuthor]++;
      }
      authorWrapper.innerHTML = html;
    }
    const authorList = document.querySelector(select.listOf.authors);
    let allAuthorsHTML = '';

    for (let author in allAuthors) {
      allAuthorsHTML += '<li><a href="#author-' + author + '"><span>' + author + ' (' + allAuthors[author] + ')</span></a></li>';
    }

    authorList.innerHTML = allAuthorsHTML;
  }


  function authorClickHandler(event) {
    event.preventDefault();

    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const author = href.replace('#author-', '');
    const activeAuthors = document.querySelectorAll(active.links.authors);

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
    const authorListLinks = document.querySelectorAll('.authors.list a');

    for (let authorListLink of authorListLinks) {
      authorListLink.addEventListener('click', authorClickHandler);
    }
  }

  generateTitleLinks();
  generateTags();
  addClickListenersToTags();
  generateAuthors();
  addClickListenerToAuthors();
}



