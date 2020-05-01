const selenium = require('selenium-webdriver');
jasmine.DEFAULT_TIMEOUT_INTERVAL=15000;

describe('Campus Share Tests',function(){
    beforeEach(function(done){
        this.driver = new selenium.Builder()
            .withCapabilities(selenium.Capabilities.chrome())
            .build();
        this.driver.get('https://www.campus-share.com/categories')
            .then(done);
    });

    afterEach(function(done){
        this.driver.quit().then(done);
    });

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

    afterEach(function(done){
        this.driver.quit().then(done);
    });

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

    afterEach(function(done){
        this.driver.quit().then(done);
    });

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

    afterEach(function(done){
        this.driver.quit().then(done);
    });

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

    afterEach(function(done){
        this.driver.quit().then(done);
    });

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

    afterEach(function(done){
        this.driver.quit().then(done);
    });

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

    afterEach(function(done){
        this.driver.quit().then(done);
    });

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

    afterEach(function(done){
        this.driver.quit().then(done);
    });

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

    afterEach(function(done){
        this.driver.quit().then(done);
    });

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

    afterEach(function(done){
        this.driver.quit().then(done);
    });

    it('Should be on the sign-in page',function(done){
        let element = this.driver.findElement(selenium.By.className('row justify-content-center'));
        element.getAttribute('textContent').then(function(v){
            expect(v).toBe('Email@luther.eduPlease use your valid luther.edu email.PasswordReset PasswordSign in for 2 weeksSign In');
            done();
        })
    });
})
