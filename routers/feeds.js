const router = require('express').Router();
const { listFeeds, searchFeeds } = require('../models/feeds');

//Normal search
router.get('/', async function (req, res, next) {
    let { author, category, order_by } = req.query;
    order_by = (order_by == 1 || order_by == -1)? order_by : 1;
    const query = {};
    if(author){
        query["author"] = author;
    }
    if(category){
        query["category"] = category;
    }
    const feeds = await listFeeds({ filters: query, order_by });
    res.status(200).send({ data : feeds });
});

//Filter + orderBy + Pagination
router.get('/:per_page/:page/', async function (req, res) {
    let perPage = Number(req.params.per_page);
    if(isNaN(perPage)){
        perPage=10;
    }
    let pageNumber = Number(req.params.page);
    if(isNaN(pageNumber)){
        pageNumber=1;
    }
    const start = perPage * --pageNumber;
    let { author, category, order_by } = req.query;
    order_by = (order_by == 1 || order_by == -1)? order_by : 1;
    const query = {};
    if(author){
        query["author"] = author;
    }
    if(category){
        query["category"] = category;
    }
    const feeds = await listFeeds({ perPage, pageNumber, start, filters: query, order_by });
    res.status(200).send({ perPage, page: pageNumber + 1, data: feeds });
});

//Text Keyword search on headlines
router.get('/headline', async function (req, res, next) {
    let { search } = req.query;
    if(!search){
        search="";
    }
    const feeds = await searchFeeds(search);
    res.status(200).send({ data : feeds });
});

module.exports = router;