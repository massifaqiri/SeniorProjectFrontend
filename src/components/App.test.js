/* var webdriver = require('selenium-webdriver');
function searchTextOnGoogle() {
        var driver = new webdriver.Builder().forBrowser('chrome').build();
        driver.get('https://www.campus-share.com/categories').then(function()
        {
            driver.findElement(webdriver.By.linkTest('Textbooks')).click().then(function()
            {
                driver.getTitle().then(function(title)
                {
                    setTimeout(function()
                    {
                        console.log(title);
                        driver.quit();
                    }, 5000);
                });
            });
        });
}

searchTextOnGoogle(); */