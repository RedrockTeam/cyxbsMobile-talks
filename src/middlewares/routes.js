const Router = require('koa-router');
const axios = require('axios');

const home = new Router();

async function transferData (id) {
  const requestURL = `http://hongyan.cqupt.edu.cn/cyxbsMobile/index.php/Home/Topic/listTopicArticle?topic_id=${id}`;

  return await axios.get(requestURL).then((response) => {
    const res = response.data.data;

    return {
      keyword: `#${res.keyword}#`,
      content: res.content,
      views: res.read_num,
      titleImg: res.photo_src,
      articles: res.articles.map((item) => {
        return {
          content: item.content.replace(`#${res.keyword}#`, '').trim(),
          nickname: item.nickname,
          avatar: item.user_thumbnail_src,
          likes: item.like_num,
          remarks: item.remark_num,
          imgs: item.article_thumbnail_src.split(',').filter((item) => {return item.length > 0}),
          time: ~~(Date.now() - new Date(item.created_time)) > 86400000 
                ? `${~~((Date.now() - new Date(item.created_time)) / 86400000)} 天前` 
                : `${~~((Date.now() - new Date(item.created_time)) / 3600000)} 小时前`
        }
      })
    };
  })
  .catch((err) => {
    console.log(err);
  });
}

home.get('cyxbsMobileTalk', async (ctx) => {
  // const query = ctx.request.query;
  // const list = await transferData(query.id);

  await ctx.render('index');
});
// 前端渲染模板的路由

home.get('cyxbsMobileTalk/react', async (ctx) => {
  // const query = ctx.request.query;
  // const list = await transferData(query.id);

  // await ctx.render('react', {
  //   keyword,
  //   content,
  //   views,
  //   titleImg,
  //   articles
  // } = { ...list });
  await ctx.render('react');
});

home.post('cyxbsMobileTalk/list', async (ctx) => {
  ctx.body = await transferData(ctx.request.body.id);
});
// 提供给 node 做的中间层

const router = new Router();
router.use('/', home.routes(), home.allowedMethods());

module.exports = router;