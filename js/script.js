/* eslint-disable no-inner-declarations */
"use strict";
{
  const templates = {
    articleLink: Handlebars.compile(
      document.querySelector("#template-article-link").innerHTML
    ),
    articleTagLink: Handlebars.compile(
      document.querySelector("#template-article-tag").innerHTML
    ),
    articleAuthorLink: Handlebars.compile(
      document.querySelector("#template-article-author").innerHTML
    ),
    tagCloudLink: Handlebars.compile(
      document.querySelector("#template-tag-cloud-link").innerHTML
    ),
    authorList: Handlebars.compile(
      document.querySelector("#template-author-list").innerHTML
    ),
  };

  const opts = {
    tagSizes: {
      count: 5,
      classPrefix: "tag-size-",
    },
  };

  const select = {
    all: {
      articles: ".post",
      linksTo: {
        tags: 'a[href^="#tag-"]',
        authors: 'a[href^="#author-"]',
      },
    },
    article: {
      title: ".post-title",
      tags: ".post-tags .list",
      author: ".post-author",
    },
    listOf: {
      titles: ".titles",
      tags: ".tags.list",
      authors: ".authors.list",
    },
  };

  const active = {
    articles: ".posts article.active",
    links: {
      tags: 'a.active[href^="#tag-"]',
      authors: 'a.active[href^="#author-"]',
    },
  };

  const clearActiveClass = function () {
    const allLinks = document.querySelectorAll(
      select.all.linksTo.tags + ", " + select.all.linksTo.authors
    );

    for (let link of allLinks) {
      link.classList.remove("active");
    }
  };

  const titleClickHandler = function (event) {
    event.preventDefault();

    const clickedElement = this;
    const activeLinks = document.querySelectorAll(".titles a.active");

    for (let activeLink of activeLinks) {
      activeLink.classList.remove("active");
    }

    clickedElement.classList.add("active");
    const activeArticles = document.querySelectorAll(active.articles);

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove("active");
    }

    const articleSelector = clickedElement.getAttribute("href");
    const targetArticle = document.querySelector(articleSelector);
    targetArticle.classList.add("active");
  };

  function generateTitleLinks(customSelector = "") {
    const titleList = document.querySelector(select.listOf.titles);
    const articles = document.querySelectorAll(
      select.all.articles + customSelector
    );

    let html = "";

    for (let article of articles) {
      const articleId = article.getAttribute("id");
      const articleTitle = article.querySelector(
        select.article.title
      ).innerHTML;

      const linkHTMLData = { id: articleId, title: articleTitle };
      const linkHTML = templates.articleLink(linkHTMLData);
      html += linkHTML;
    }

    titleList.innerHTML = html;

    const links = document.querySelectorAll(".titles a");

    for (let link of links) {
      link.addEventListener("click", titleClickHandler);
    }
  }

  function calculateTagsParams(tags) {
    const params = {
      max: 0,
      min: 999999,
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
      let html = "";
      const articleTags = article.getAttribute("data-tags");
      const tags = articleTags.split(" ");

      for (let tag of tags) {
        const linkHTMLData = { tag: tag };
        const linkHTML = templates.articleTagLink(linkHTMLData);

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

    const allTagsData = { tags: [] };

    for (let tag in allTags) {
      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams),
      });
    }
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
  }

  function tagClickHandler(event) {
    event.preventDefault();
    clearActiveClass();

    const clickedElement = this;
    const href = clickedElement.getAttribute("href");
    const tag = href.replace("#tag-", "");
    const activeTags = document.querySelectorAll(active.links.tags);

    for (let activeTag of activeTags) {
      activeTag.classList.remove("active");
    }

    const targetTags = document.querySelectorAll('a[href="' + href + '"]');

    for (let targetTag of targetTags) {
      targetTag.classList.add("active");
    }
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }

  function addClickListenersToTags() {
    const tagLinks = document.querySelectorAll(".post-tags a");

    for (let tagLink of tagLinks) {
      tagLink.addEventListener("click", tagClickHandler);
    }

    const tagLinksList = document.querySelectorAll(".list.tags a");

    for (let tagLinkList of tagLinksList) {
      tagLinkList.addEventListener("click", tagClickHandler);
    }
  }

  function generateAuthors() {
    let allAuthors = {};
    const articles = document.querySelectorAll(select.all.articles);

    for (let article of articles) {
      const authorWrapper = article.querySelector(select.article.author);
      let html = "";
      const articleAuthor = article.getAttribute("data-author");

      const linkHTMLData = { id: articleAuthor, title: articleAuthor };
      const authorLink = templates.articleAuthorLink(linkHTMLData);

      html += authorLink;
      if (!allAuthors[articleAuthor]) {
        allAuthors[articleAuthor] = 1;
      } else {
        allAuthors[articleAuthor]++;
      }
      authorWrapper.innerHTML = html;
    }
    const authorList = document.querySelector(select.listOf.authors);

    const allAuthorsData = { authors: [] };

    for (let author in allAuthors) {
      allAuthorsData.authors.push({
        author: author,
        count: allAuthors[author],
      });
    }
    authorList.innerHTML = templates.authorList(allAuthorsData);
  }

  function authorClickHandler(event) {
    event.preventDefault();
    clearActiveClass();

    const clickedElement = this;
    const href = clickedElement.getAttribute("href");
    const author = href.replace("#author-", "");
    const activeAuthors = document.querySelectorAll(active.links.authors);

    for (let activeAuthor of activeAuthors) {
      activeAuthor.classList.remove("active");
    }

    const targetAuthors = document.querySelectorAll('a[href="' + href + '"]');

    for (let targetAuthor of targetAuthors) {
      targetAuthor.classList.add("active");
    }
    generateTitleLinks('[data-author="' + author + '"]');
  }

  function addClickListenerToAuthors() {
    const authorLinks = document.querySelectorAll(".post-author a");

    for (let authorLink of authorLinks) {
      authorLink.addEventListener("click", authorClickHandler);
    }
    const authorListLinks = document.querySelectorAll(".authors.list a");

    for (let authorListLink of authorListLinks) {
      authorListLink.addEventListener("click", authorClickHandler);
    }
  }

  function addClickListenerToLogo() {
    clearActiveClass();

    const logo = document.querySelector(".logo");

    logo.addEventListener("click", function () {
      generateTitleLinks();
    });
  }

  generateTitleLinks();
  generateTags();
  addClickListenersToTags();
  generateAuthors();
  addClickListenerToAuthors();
  addClickListenerToLogo();
}
