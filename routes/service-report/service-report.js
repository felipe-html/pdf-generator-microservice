const express = require('express');
const ejs = require('ejs');
const path = require('path');
const puppeteer = require('puppeteer');
const router = express.Router();

router.post('/service-report', async (req, res) => {

    const pathFile = path.join(__dirname, "/model.ejs")
    const data = { }

    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    ejs.renderFile(pathFile, { data }, async (error, html) => {
        if (error) {
            return res.status(500).json({
                message: "An error occurred while generating the file from the received data."
            })
        }
        await page.setContent(html);
        const pdf = await page.pdf({
            printBackground: true,
            height: "828px",
            width: "1280px",
        })

        await page.close()
        return res.status(201).json({
            status: 201,
            message: "PDF was generated successfuly!",
            file: pdf
        })
    })
})

module.exports = router