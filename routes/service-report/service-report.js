const express = require('express');
const ejs = require('ejs');
const path = require('path');
var puppeteer = require('puppeteer')

const data = {
    establishmentName: "Estabelecimento batata",
    workersTotalNumber: 1230,
    totalSampleSize: 630,
    answersTotalNumber: 400,
    drUfName: "Mato Grosso",
    answerData: {
      demographic: {
        sex: {
          woman: 50,
          man: 50,
        },
        age: {
          lessThan18: "",
        },
      },
    },
};
  

const router = express.Router();

router.post('/service-report', async (req, res) => {
    const browser = await puppeteer.launch({
        headless: "new",
      });

      const page = await browser.newPage();

      const filePath = path.join(
        __dirname,
        "model.ejs",
      );
      
      ejs.renderFile(filePath, { data }, async (error, html) => {
        if (error) {
          return res.status(500).json({
            message: "There was an error generating the ejs file",
            timeStamp: new Date(),
            error,
          });
        }

        await page.setContent(html);
        const pdf = await page.pdf({
          printBackground: true,
          height: "828px",
          width: "1280px",
        });

        await browser.close();
        console.log("Pdf was generated successfully!")
        return res.status(200).json({ pdf });
    })
})

module.exports = router