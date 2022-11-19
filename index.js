const PORT = 8000;
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');

const app = express();

const url = 'https://www.capinhasnoatacado.com.br/fones'

app.get('/', function (req, res) {
    res.json('This is my webscraper')
})

app.get('/fones', function (req, res) {
    axios.get(url)
        .then(response => {
            const html = response.data;
            const $ = cheerio.load(html);
            const fones = [];
            $('.item').each(function (i, element) {
                const title = $(element).find('.product-name').text();
                const price = $(element).find('.price').text();
                const image = $(element).find('.primeira-imagem').attr('src');
                fones.push({
                    title,
                    price,
                    image
                });
            });
            res.json(fones);
            console.log(fones);
        })
        .catch(console.error);
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});