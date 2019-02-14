/**
 * Test for getting started with Selenium.
 */
"use strict";

const fs = require('fs');
const assert = require("assert");
const test = require("selenium-webdriver/testing");
const webdriver = require("selenium-webdriver");
const By = webdriver.By;

let browser;

// Does not work with WSL!! Use cygwin


// Test suite
test.describe("Frontend-Vue", function() {
    test.beforeEach(function(done) {
        this.timeout(40000);
        browser = new webdriver.Builder()
            //withCapabilities(webdriver.Capabilities.firefox()).build();
            .withCapabilities(webdriver.Capabilities.chrome()).build();

        browser.get("http://localhost:8080/#/");
        done();
    });

    test.afterEach(function(done) {
        browser.quit();
        done();
    });

    function goToNavLink(target) {
        browser.findElement(By.linkText(target)).then(function(element) {
            element.click();
        });
    }


    function matchUrl(target) {
        browser.getCurrentUrl().then(function(url) {
            assert.ok(url.endsWith("/" + target));
        });
    }


    function assertH1(target) {
        browser.findElement(By.css("h1")).then(function(element) {
            element.getText().then(function(text) {
                assert.equal(text, target);
            });
        });
    }


    function assertH2(target) {
        browser.findElement(By.css("h2")).then(function(element) {
            element.getText().then(function(text) {
                assert.equal(text, target);
            });
        });
    }


    function saveScreenshot(filename) {
        return browser.takeScreenshot().then(function(data) {
            fs.writeFile(filename, data.replace(/^data:image\/png;base64,/,''), 'base64', function(err) {
                if(err) throw err;
            });
        });
        done();
    }

        // Test case
        test.it("Test index", function(done) {
            let promise = browser.getTitle();

            promise.then(function(title) {
                assert.equal(title, "my-vue");
        });

        browser.getTitle().then(function(title) {
            assert.equal(title, "my-vue");
        });

        assertH1("Me");
        matchUrl("#/");

        done();
    });


    test.it("Test go to Me", function(done) {
        // try use nav link
        goToNavLink("Me");

        assertH1("Me");
        matchUrl("#/" );

        done();
    });


    test.it("Test go to Kmom01", function(done) {
        goToNavLink("kmom01");

        // get h2 text
        assertH2("KMOM01");
        matchUrl("#/reports/kmom01");

        done();
    });


    test.it("Test go to Kmom03", function(done) {
        goToNavLink("kmom03");

        // get h2 text
        assertH2("KMOM03");
        matchUrl("#/reports/kmom03");

        done();
    });


    test.it("Test go to login", function(done) {
        goToNavLink("Logga in");

        assertH2("Logga in här:");
        matchUrl("#/login");

        done();
    });

    test.it("Test go to edit", function(done) {
        goToNavLink("Ed");

        assertH2("Logga in här:");
        matchUrl("#/login");

        done();
    });


    test.it("Test color on kmom background-color", function(done) {
        goToNavLink("kmom02");

        // display element background color
        browser.findElement(By.id("app")).then(function(displayElement) {
            displayElement.getCssValue("background-color").then(function(bgColor) {
                assert.equal(bgColor, "rgba(0, 116, 217, 1)");
            });
        });

        // operator buttons background color
        browser.findElement(By.tagName("main")).then(function(displayElement) {
            displayElement.getCssValue("background-color").then(function(bgColor) {
                assert.equal(bgColor, "rgba(104, 114, 44, 1)");
            })
        });

        done();
    });


    test.it("Test to login", function(done) {
        goToNavLink("Logga in");

        var form = browser.findElement(By.css('form'));
        var element1 = form.findElement(By.css('input[name=email]'));
        var element2 = form.findElement(By.css('input[name=pass]'));
        var button = form.findElement(By.css('button'));
        element1.clear();
        element1.sendKeys("guni@guni.se");
        element2.clear();
        element2.sendKeys("hejsan");
        saveScreenshot('snapshot1.png');
        button.click().then(function() {
            browser.sleep(500);
            done();
        });
        saveScreenshot('snapshot2.png');
        assertH1("Me");

        done();
    });


    test.it("Test to go to protected page", function(done) {
        goToNavLink("Ed");

        assertH2("Logga in här:");
        matchUrl("#/login");

        done();
    });
});
