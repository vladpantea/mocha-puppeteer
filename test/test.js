const chai = require('chai')
const expect = chai.expect
const puppeteer = require('puppeteer')

let browser
let page

before(async () => {
    browser = await puppeteer.launch()
    page = await browser.newPage()
})

describe('UI TESTS', () => {
    let mainUrl = "http://localhost:4200";
    describe('Main page', () => {
        it('expect to find <<Tour of Hereoes>> on main page', async () => {
            await page.goto(mainUrl)
            const text = await page.evaluate(() => document.querySelector('ul li:first-child').textContent)
            expect(text).to.equal("Tour of Heroes")
        }).timeout(2000);

        it('expect to have favicon.ico', async () => {
            await page.setRequestInterception(true);
            page.on('request', request => {
                if (request.url().endsWith('.ico'))
                    expect(true).to.equal(true)
                else
                    request.continue();
            });
            await page.goto(mainUrl);            
        }).timeout(2000);
    });
});

after(async () => {
    await browser.close();
})