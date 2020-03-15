const browserWrapper = require("../src/utils/browserWrappers");
const chromeInstancePuppeteer = require("./testUtils/chromeInstancePuppeteer");
let mockData = {
  cookies: [{ url: "https://google.com", name: "connect.sid" }]
};

describe("Browser Api tests", () => {
  beforeEach(() => {
    global.chrome = chromeInstancePuppeteer.getChromeInstance(mockData);
  });
  test("getCookie smoke test", () => {
    let testCookie = { url: "https://google.com", name: "connect.sid" };  
    return browserWrapper.getCookie(testCookie).then((returnCookie) => {
      expect(testCookie).toStrictEqual(returnCookie);
    })
  });
})