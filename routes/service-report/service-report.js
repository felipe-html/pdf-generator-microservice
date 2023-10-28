const express = require('express');
const ejs = require('ejs');
const path = require('path');
const puppeteer = require('puppeteer');
const router = express.Router();

router.post('/service-report', async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: "Param 'name' is required." });
    }

    const pathFile = path.join(__dirname, "/model.ejs")
    const data = { name }

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
            format: "A4",
            path: "file.pdf"
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