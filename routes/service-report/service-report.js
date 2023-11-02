const express = require('express');
const ejs = require('ejs');
const path = require('path');
var puppeteer;
const chrome = {}

if(process.env.AWS_LAMBDA_FUNCTION_VERSION) {
    puppeteer = require('puppeteer-core');
    chrome = require("chrome-aws-lambda")
} else {
    puppeteer = require('puppeteer');
}

const router = express.Router();

router.get('/service-report', async (req, res) => {
    let options = {};

    if(process.env.AWS_LAMBDA_FUNCTION_VERSION) {
        options = {
            args: [...chrome.args,"--hide-scrollbars", "disable-web-security"],
            defaultViewport: chrome.defaultViewport,
            executablePath: await chrome.executablePath,
            headless: true,
            ignoreHTTPSErrors: true
        }
    }

    try {
        const browser = await puppeteer.launch(options)
        const page = await browser.newPage()
        await page.goto("https://www.google.com")
        return res.send(await page.title())
    } catch(error) {
        return res.send(error)
    }   
    // const pathFile = path.join(__dirname, "/model.ejs")
    // const data = { }

    // const browser = await puppeteer.launch({ headless: "new" });
    // const page = await browser.newPage();

    // ejs.renderFile(pathFile, { data }, async (error, html) => {
    //     if (error) {
    //         return res.status(500).json({
    //             message: "An error occurred while generating the file from the received data."
    //         })
    //     }
    //     await page.setContent(html);
    //     const pdf = await page.pdf({
    //         printBackground: true,
    //         height: "828px",
    //         width: "1280px",
    //     })

    //     await page.close()
    //     return res.status(201).json({
    //         status: 201,
    //         message: "PDF was generated successfuly!",
    //         file: pdf
    //     })
    // })
})

module.exports = router