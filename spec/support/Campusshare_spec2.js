// const selenium = require('selenium-webdriver');

// describe('Campus Share Tests',function(){
//     jasmine.DEFAULT_TIMEOUT_INTERVAL=100000;
//     beforeEach(function(done){
//         this.driver = new selenium.Builder()
//             .withCapabilities(selenium.Capabilities.chrome())
//             .build();
//         this.driver.get('https://www.campus-share.com/skill')
//             .then(done);
//     });

//     afterEach(function(done){
//         this.driver.quit().then(done);
//     });

//     it('Should be on the skill category page',function(done){
//         let element = this.driver.findElement(selenium.By.className('categoryName'));
//         element.getAttribute('textContent').then(function(v){
//             expect(v).toBe('Skills');
//             done();
//         })
//     });

//     // it('renders without crashing',function(done){
//     //     const div = document.createElement('div');
//     //     ReactDOM.render(App, div);
//     //     done();
//     // });

//     // it('Should have a picture on misc. page',function(done){
//     //     let element = this.driver.findElements(selenium.By.css('figcaption'));
//     //     expect(element.size()).toBe(6);
//     //     done();
//     // });
// })
