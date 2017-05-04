const Router = require('koa-router');
const qs = require('querystring');
const axios = require('axios');


const home = new Router();

home.get('/cyxbsMobileTalk', async (ctx) => {
  const query = qs.parse(ctx.url.slice(2));
  
  const requestURL = `http://hongyan.cqupt.edu.cn/cyxbsMobile/index.php/Home/Topic/listTopicArticle?topic_id=${query.id}`;
  let res = {};

  await axios.get(requestURL).then((response) => {
    res = response.data.data;
  }).catch((err) => {
    console.log(err);
  });

  let keyword = `#${res.keyword}#`;
  let content = res.content;
  let views = res.read_num;
  let titleImg = res.photo_src;
  let articles = res.articles.map((item) => {
    return {
      content: item.content.replace(keyword, '').trim(),
      nickname: item.nickname,
      avatar: item.user_thumbnail_src,
      likes: item.like_num,
      remarks: item.remark_num,
      imgs: item.article_thumbnail_src.split(',').filter((item) => {return item.length > 0}),
      time: ~~(Date.now() - new Date(item.created_time)) > 86400000 
            ? `${~~((Date.now() - new Date(item.created_time)) / 86400000)} 天前` 
            : `${~~((Date.now() - new Date(item.created_time)) / 3600000)} 小时前`
    }
  });

  await ctx.render('index', {
    keyword,
    content,
    views,
    titleImg,
    articles
  });
});

const router = new Router();
router.use('/', home.routes(), home.allowedMethods());

module.exports = router;