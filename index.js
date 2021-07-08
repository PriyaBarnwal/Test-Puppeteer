const puppeteer = require("puppeteer");
const PuppeteerHar = require('puppeteer-har');

let url = "https://spredfast.com/platform/intelligence/export-visual?network=instagram&ftype=pdf&width=1060&timezone=Asia%2FCalcutta#custom/%23pandemic//01,20,100/ /"

async function run() {
  console.log(puppeteer.executablePath())
  let browser = await puppeteer.launch({ 
    args: [
    // Required for Docker version of Puppeteer
    // '--no-sandbox',
    // '--disable-setuid-sandbox',
    // This will write shared memory files into /tmp instead of /dev/shm,
    // because Docker’s default for /dev/shm is 64MB
    '--disable-dev-shm-usage'
  ],
  //devtools: true,
  //executablePath: '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome',
  headless: true
  //slowMo: 0 
});
  const context = await browser.createIncognitoBrowserContext();
  
  let page = await context.newPage();
  //let page = await browser.newPage();

  console.log(await page.cookies())
  console.log(typeof page.setCookie);
  try {
    debugger;
    await page.setCookie({
      name: 'sfjwt-login.spredfast.com',
      value: 'eyJhbGciOiJSUzUxMiJ9.eyJzdWIiOiIyMzA4MDEiLCJleHAiOjE2MTQzMzU4NDEsImF1ZCI6IndlYmFwcCIsInNlc3Npb24iOiJINHNJQUFBQUFBQUFBSzFUWFcvVU1CRDhLNWFmV2hFbGRyNXp2SEJxSzZqS0ZZa3JBZ21oYXVOc0d1dWNPTEo5cGFXNi80NXp0QWZYY2krSVBFUkpkbWQyWmpOK29HdUw1cnloc3poaEplTUJ4UjZrb2pNNkdua1B3d3JDR3N6d0hkU3JCVmo3RVJYZXdpQndydFJjQ0xUMnphclRSdHRRNko0RzFOOUhHTzRudmp4bW1XY2Jiay9SZVVaTFoxOGZQS2x1MXNKTjlTUjRlcnVFSHYzQTg4R2hVdklHUFQzZEZjK0dXMm4wME9Pd1JSVi9LN3dFNDUxRE00QTYrYTJIVG9Mb1Z0RVQ3cE9aakhiT2pYWVdSWFkwMkxSZzNlUWxHaFc0VnBzK2tuOHliNEk5RCtsekQyZDNJeG81dGRxREZzb0RGdmF4LzlGQnAvc1h5b3ZueWsvQmRyVUcweHdXenZrQjVYdllmeEhlN0FqQ1BROTA4eTJnMXFkTTZtSHB3RGljWk9ROFRYaVpNMWFsTEtDeVVYZ2xlOVJyTjIvOTZJVlBHazlUTmwwN3NOK3ROT0Q4MHlNK3JZb2s4Uncrc3RhMFhncFV2TWlSOFRiRE5JMXJWaWQxM0dZWmlrWmdLL0lwVkhLeUlpQk9pMWd3cURGTG14eHFYc1ZGVlVGY2xYVlRDK0g3b09tbG45T0NzdWo1bFp6Mk4zb3NqK09RNTBtWWxTRm52bkU2ZXZPYlh6dGM2QjlTS1lpeWtKR2pCUWdmTzIyNzEyUWJiT0kva0E5TDhvVndkczJ6Nit5WXpNZFI0V2VzTDZTTHNxUUlrNXdjWGJ5N1dyd1BpSklySkc5UnJQUXhPZW1NLy90UldZUXNUT09TaFdWSmx0Q0NrWThvdXZrSlhmYUdlUU1FQUFBPSJ9.iOO2VYVoDFgIH3-_o4NOGfLKopPOMXndf74ICbjRCqo2aBRu0wIsOUna6qSysIurA7oRkqu_nJG1E_cI-2_r5osrLLhJ2DCNVogFyE42-CZsns2I0FOhqpnIbmLjcDHm2MFximMh3f4UmpidP19I6H9G6_OKAM3lC59xJ2dnWBW5ylsObKhFvFCiF1rLaeeg8kAvr9QY2BJerONzjOXyQ36RX6Mq05FC4QAGC1zpQmHVoycAvH-n09cvtP9a-I_-phiS1hEldIBZb2fVHGsTj1eZQAe0UXLtVUiMSYW-Wc-u97LJKDvzEAebRY7pQyaWgefAn72RCOqb7Fl3iAbUiLtQtxlXFaQg_gwjFQahZlbMhIGGwvbSz-E-M7c2h0ayPbXK9E9ZBPReHPK9DUQ3Stoag59x6ppFnNHePrCrHL32XcqwHz5240vYaZd8s5dzNzfIQTNnPJGcOBikqOSzjrBlDXUgD7o6R1iSLjkilAYhOwYdIhpSeTciAsdlL7Pi',
      domain: 'spredfast.com',
      secure: true,
      path: '/',
      httpOnly: true
    });
  } catch(e){
    console.log(e)
  }
  console.log(await page.cookies('https://spredfast.com/search/search.json'))
  const har = new PuppeteerHar(page);
  await har.start({ path: './results.har' });

  await page.goto(url, { waitUntil: "networkidle2", timeout: 180000 });
  await page.waitFor('.visual-export-ready');
  console.log('yo');
  await page.pdf({ path: './test.pdf', format: 'Letter' })
  // await page.screenshot({
  //   path: "./screenshot.png",
  //   type: "png",
  //   fullPage: true
  // });
  await har.stop();
  await page.close();
  await browser.close();
}

run();
