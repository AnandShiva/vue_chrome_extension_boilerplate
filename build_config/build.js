const fs = require("fs");
const ChromeExtension = require("crx");

const crx = new ChromeExtension({
  // to be replaced
  privateKey: fs.readFileSync("./temp/dist.pem")
});
crx
  .load("./dist/un_packed_extension_build").catch((err) => {
    console.error("error loading extension bundle", err);
  })
  .then((crx) => {
    return crx.pack();
  }).catch((err) => {
    console.error("error loading extension bundle", err);
  })
  .then(crxBuffer => {
    fs.writeFile("./dist/crx/VueChromeExtension.crx", crxBuffer, (response) => {
      if (response) {
        throw response;
      }else{
        console.info("extension build success")
      }
    });
  }).catch((err) => {
    console.error("Error saving packed extension", err);
  });
