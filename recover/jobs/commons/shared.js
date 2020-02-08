// TODO: set up this functions where page is initialized first time 
module.exports.getImageByPath = async(xpath, index, page) => {
const imagePath = (await page.$x(xpath))[index];
    let image = await page.evaluate(el => {
    return el.src;
    }, imagePath);
    return image;  
};
