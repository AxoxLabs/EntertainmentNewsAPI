const express = require("express");
const router = express.Router();
const axios = require('axios')
const songSites = require('../data/songsSites');
const cheerio = require('cheerio')

const articles = []


songSites.forEach(music => {
    axios.get(music.address)
        .then(res => {
            const html = res.data
            const $ = cheerio.load(html)

            //naijamusic
            $('.list-post', html).each(function () {
                    const title = $(this).find('h2').text()
                    const url = $(this).find('a').attr('href')
                    const time = $(this).find('time').attr('datetime')
                    articles.push({
                        title,
                        url: music.base + url,
                        source: music.name,
                        time
                    })
                }) 
                     // pluse
                $('.story-role-article' , html).each(function () {
                    const title = $(this).find('h2').text()
                    const url = $(this).find('a').attr('href')
                    const time = $('script').text() //nw
                    articles.push({
                        title,
                        url: music.base + url,
                        source: music.name,
                        time
                    })
                })

                   // pluse
                   $('.mvp-blog-story-wrap' , html).each(function () {
                    const title = $(this).find('h2').text()
                    const url = $(this).find('a').attr('href')
                    const time = $('script').text() //nw
                    articles.push({
                        title,
                        url: music.base + url,
                        source: music.name,
                        time
                    })
                })

                    // legit
                $('.c-article-card-no-border', html).each(function () {
                    const title = $(this).text()
                    const url = $(this).find('a').attr('href')
                    const time = $(this).find('time').attr('datetime')
                    articles.push({
                        title,
                        url: music.base + url,
                        source: music.name,
                        time
                    })
                })  
        })
        .catch(err => { })
       
})





router.get('/', (req, res) => {
    let { keywords } = req.query;
    keywords = keywords ? keywords.toLowerCase().split(' ') : [];

    if (keywords.length === 0) {
        return res.json(articles);
    }

    const filteredArticles = articles
        .filter(a => keywords.some(k => a.title.toLowerCase().includes(k)))

    return res.json(filteredArticles)
});


module.exports = router;
