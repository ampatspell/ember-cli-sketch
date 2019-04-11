module.exports = (() => {

  const createBrowser = async () => {
    let puppeteer = require('puppeteer');
    let browser = await puppeteer.launch({
      // executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
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

  const withPage = (url, cb) => withBrowser(async browser => {
    let page = await browser.newPage();
    let first = true;
    page.on('console', async msg => {
      if(first) {
        first = false;
        console.log('•', url);
      }
      let values = await Promise.all(msg.args().map(handle => handle.jsonValue()));
      console.log('•', ...values);
    });
    return await cb(page, browser);
  });

  const pdf = ({ url, width, height, range }) => withPage(url, async page => {
    await page.emulateMedia('screen');
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitFor('.ui-block-sketch.ready');
    return await page.pdf({
      scale: 1,
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

  const image = ({ url, width, height }) => withPage(url, async page => {
    await page.setViewport({ width, height });
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitFor('.ui-block-sketch.ready');
    return await page.screenshot({
      type: 'png',
      fullPage: true
    });
  });

  return {
    pdf,
    image
  }
})();
