const selenium = require('selenium-webdriver');
// to keep it running
jasmine.DEFAULT_TIMEOUT_INTERVAL=50000;
// Selenium Testing using Selenium Webdriver with Jasmine
describe('Campus Share Tests',function(){
    beforeEach(function(done){
        this.driver = new selenium.Builder()
            .withCapabilities(selenium.Capabilities.chrome())
            .build();
        this.driver.get('https://www.campus-share.com/categories')
            .then(done);
    });
// cut the page out after checking
    afterEach(function(done){
        this.driver.quit().then(done);
    });
// It testing whether it appears on the actual page
    it('Should be on the categories page',function(done){
        let element = this.driver.findElement(selenium.By.className('row'));
        element.getAttribute('textContent').then(function(v){
            expect(v).toBe('HomeAboutHow does it workCategoriesSign In');
            done();
        })
    });

})
describe('Campus Share Tests',function(){
    beforeEach(function(done){
        this.driver = new selenium.Builder()
            .withCapabilities(selenium.Capabilities.chrome())
            .build();
        this.driver.get('https://www.campus-share.com')
            .then(done);
    });
// cut the page out after checking
    afterEach(function(done){
        this.driver.quit().then(done);
    });
// It testing whether it appears on the actual page
    it('Should be on the home page',function(done){
        let element = this.driver.findElement(selenium.By.className('carouselImg'));
        element.getAttribute('textContent').then(function(v){
            expect(v).toBe('');
            done();
        })
    });

})
describe('Campus Share Tests',function(){
    beforeEach(function(done){
        this.driver = new selenium.Builder()
            .withCapabilities(selenium.Capabilities.chrome())
            .build();
        this.driver.get('https://www.campus-share.com/textbooks')
            .then(done);
    });
// cut the page out after checking
    afterEach(function(done){
        this.driver.quit().then(done);
    });
// It testing whether it appears on the actual page
    it('Should be on the textbooks category page',function(done){
        let element = this.driver.findElement(selenium.By.className('categoryName'));
        element.getAttribute('textContent').then(function(v){
            expect(v).toBe('Textbooks');
            done();
        })
    });

})

describe('Campus Share Tests',function(){
    beforeEach(function(done){
        this.driver = new selenium.Builder()
            .withCapabilities(selenium.Capabilities.chrome())
            .build();
        this.driver.get('https://www.campus-share.com/misc')
            .then(done);
    });
// cut the page out after checking
    afterEach(function(done){
        this.driver.quit().then(done);
    });
// It testing whether it appears on the actual page
    it('Should be on the misc. category page',function(done){
        let element = this.driver.findElement(selenium.By.className('categoryName'));
        element.getAttribute('textContent').then(function(v){
            expect(v).toBe('Misc');
            done();
        })
    });
})

describe('Campus Share Tests',function(){
    beforeEach(function(done){
        this.driver = new selenium.Builder()
            .withCapabilities(selenium.Capabilities.chrome())
            .build();
        this.driver.get('https://www.campus-share.com/transport')
            .then(done);
    });
// cut the page out after checking
    afterEach(function(done){
        this.driver.quit().then(done);
    });
// It testing whether it appears on the actual page
    it('Should be on the transport category page',function(done){
        let element = this.driver.findElement(selenium.By.className('categoryName'));
        element.getAttribute('textContent').then(function(v){
            expect(v).toBe('Transportation');
            done();
        })
    });
})

describe('Campus Share Tests',function(){
    beforeEach(function(done){
        this.driver = new selenium.Builder()
            .withCapabilities(selenium.Capabilities.chrome())
            .build();
        this.driver.get('https://www.campus-share.com/skill')
            .then(done);
    });
// cut the page out after checking
    afterEach(function(done){
        this.driver.quit().then(done);
    });
// It testing whether it appears on the actual page
    it('Should be on the skills category page',function(done){
        let element = this.driver.findElement(selenium.By.className('categoryName'));
        element.getAttribute('textContent').then(function(v){
            expect(v).toBe('Skill');
            done();
        })
    });
})

describe('Campus Share Tests',function(){
    beforeEach(function(done){
        this.driver = new selenium.Builder()
            .withCapabilities(selenium.Capabilities.chrome())
            .build();
        this.driver.get('https://www.campus-share.com/lostandfound')
            .then(done);
    });
// cut the page out after checking
    afterEach(function(done){
        this.driver.quit().then(done);
    });
// It testing whether it appears on the actual page
    it('Should be on the lost and found category page',function(done){
        let element = this.driver.findElement(selenium.By.className('categoryName'));
        element.getAttribute('textContent').then(function(v){
            expect(v).toBe('Lost & Found');
            done();
        })
    });
})

describe('Campus Share Tests',function(){
    beforeEach(function(done){
        this.driver = new selenium.Builder()
            .withCapabilities(selenium.Capabilities.chrome())
            .build();
        this.driver.get('https://www.campus-share.com/about')
            .then(done);
    });
// cut the page out after checking
    afterEach(function(done){
        this.driver.quit().then(done);
    });
// It testing whether it appears on the actual page
    it('Should be on the about page',function(done){
        let element = this.driver.findElement(selenium.By.className('aboutUs'));
        element.getAttribute('textContent').then(function(v){
            expect(v).toBe('');
            done();
        })
    });
})

describe('Campus Share Tests',function(){
    beforeEach(function(done){
        this.driver = new selenium.Builder()
            .withCapabilities(selenium.Capabilities.chrome())
            .build();
        this.driver.get('https://www.campus-share.com')
            .then(done);
    });
// cut the page out after checking
    afterEach(function(done){
        this.driver.quit().then(done);
    });
// It testing whether it appears on the actual page
    it('Should be on the navbar',function(done){
        let element = this.driver.findElement(selenium.By.className('App-navBar'));
        element.getAttribute('textContent').then(function(v){
            expect(v).toBe('HomeAboutHow does it workCategoriesSign In');
            done();
        })
    });
})

describe('Campus Share Tests',function(){
    beforeEach(function(done){
        this.driver = new selenium.Builder()
            .withCapabilities(selenium.Capabilities.chrome())
            .build();
        this.driver.get('https://www.campus-share.com/signin')
            .then(done);
    });
// cut the page out after checking
    afterEach(function(done){
        this.driver.quit().then(done);
    });
// It testing whether it appears on the actual page
    it('Should be on the sign-in page',function(done){
        let element = this.driver.findElement(selenium.By.className('row justify-content-center'));
        element.getAttribute('textContent').then(function(v){
            expect(v).toBe('Email@luther.eduPlease use your valid luther.edu email.PasswordReset PasswordSign in for 2 weeksSign In');
            done();
        })
    });
})