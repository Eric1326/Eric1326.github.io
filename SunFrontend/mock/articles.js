import { parse } from 'url';

const tags = [
  {id: 1, name: "python"},
  {id: 2, name: "Django"},
  {id: 3, name: "React"},
];

const articles = [];
for (let i = 1; i < 25; i+=1) {
  articles.push({
    id: i,
    title: `文章标题 ${i}`,
    body: `<p>文章内容12345 ${i} ，测试内容，一二三四五</p>`,
    excerpt: `文章内容12345 ${i} ，测试内容，一二三四五`,
    fav_num: `1 ${i}`,
    like_num:`2 ${i}`,
    views: `3 ${i}`,
    createTime: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    category: [
      '科技',
      '人文',
      '教程',
      '心得',
    ][i % 4],
    tags: tags[i % 3].name,
    // tags: [
    //   'python',
    //   'react',
    //   'antd',
    // ][i % 3],
    author: 'Mr. Zhang',
  });
};

function getArticleList(req, res, u) {
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
      url = req.url; // eslint-disable-line
    };

    const params = parse(url, true).query;
    const dataSource = articles;

    let pageSize = 10;
    if (params.pageSize) {
      pageSize = params.pageSize *1;
    };

    const result = {
      list: dataSource,
      pagination: {
        total: dataSource.length,
        pageSize,
        current: parseInt(params.currentPage, 10) || 1,
      },
    };

    return res.json(result);
}

function getArticle(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  };

  const params = parse(url, true).query;
  let dataSource = articles;
  const articleId = params.id;
  dataSource = dataSource.filter(item => articleId * 1 === item.id * 1);
  const result = dataSource[0];
  return res.json(result);
}

function getTagArticle(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  };

  const params = parse(url, true).query;

  let dataSource = articles;

  const tagName = params.tags;
  dataSource = dataSource.filter(item => tagName === item.tags);

  // let pageSize = 10;
  // if (params.pageSize) {
  //   pageSize = params.pageSize *1;
  // };

  const result = {
    list: dataSource,
    // pagination: {
    //   total: dataSource.length,
    //   pageSize,
    //   current: parseInt(params.currentPage, 10) || 1,
    // },
  };

  return res.json(result);
}

export default {
  'GET /api/articleList': getArticleList,
  'GET /api/article': getArticle,
  'GET /api/tags': tags,
  'GET /api/tagArticle': getTagArticle,
}