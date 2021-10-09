const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');
const PORT = 8000

const app = express();

const url = 'https://www.theguardian.com/us'

axios(url)
.then(res => {
    const html = res.data
    const $ = cheerio.load(html)
    const articles = []
    $('.fc-item_container', html).each(function() {
        const title = $(this).text()
        const url = $(this).find('a').attr('href')
        articles.push({
            title,
            url
        })
    })
    console.log(articles)
}).catch(error => console.log(error))

app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`));