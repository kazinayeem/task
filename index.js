

const puppeteer = require('puppeteer');

async function searchOnGoogle(query) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
    
        await page.goto('https://www.google.com');

     
        await page.waitForSelector('input[name="q"]', { visible: true });

       
        await page.type('input[name="q"]', query);

      
        await Promise.all([
            page.click('input[value="Google Search"]'),
            page.waitForNavigation({ waitUntil: 'networkidle0' })
        ]);

      
        await page.waitForSelector('.g'); 

       
        const searchResults = await page.evaluate(() => {
            let results = [];
         
            document.querySelectorAll('.g').forEach(result => {
                let title = result.querySelector('h3').innerText;
                let url = result.querySelector('a').href;
                results.push({ title, url });
            });
            return results;
        });

        console.log('Search Results for:', query);
        console.log(searchResults);
    } catch (error) {
        console.error('Error searching on Google:', error);
    } finally {
        await browser.close();
    }
}




searchOnGoogle("javascript")