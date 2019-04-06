module.exports = (() => {

  const createBrowser = async () => {
    let puppeteer = require('puppeteer');
    let browser = await puppeteer.launch({
      executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      args: [
        '--no-sandbox',
        '--disable-infobars',
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '--disable-setuid-sandbox',
        '--no-first-run',
        '--no-zygote',
        '--single-process',
        '--force-device-scale-factor=1'
      ]
    });
    return browser;
  }

  const withBrowser = async cb => {
    let browser = await createBrowser();
    try {
      return await cb(browser);
    } finally {
      if(browser) {
        browser.close();
      }
    }
  }

  const withPage = cb => withBrowser(async browser => {
    let page = await browser.newPage();
    return await cb(page, browser);
  });

  // await page.setViewport({ width: 1920, height: 1080 });
  // await page.screenshot({ path: './image.jpg', type: 'jpeg' });

  const pdf = ({ url, width, height, range }) => withPage(async page => {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitFor('.-stage-ready');
    return await page.pdf({
      printBackground: true,
      width: `${width}mm`,
      height: `${height}mm`,
      margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
      pageRanges: range || '1'
    });
  });

  const save = ({ filename, buffer }) => new Promise((resolve, reject) => {
    let fs = require('fs');
    fs.writeFile(filename, buffer, err => {
      if(err) {
        return reject(err);
      }
      resolve();
    });
  });

  return async fn => {
    try {
      await fn({
        pdf,
        save
      });
    } catch(err) {
      console.log(err.stack);
    }
  }
})();
