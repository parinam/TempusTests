module.exports = {
    disabled: false,
    'Search Results in Imgur': function (client) {
        var searchString = "Manchester united";
        client
            .url(client.launch_url)
            .waitForElementVisible('body', 1000)
            .pause(100)
            /**
             click on the search icon
             */
            .click('.icon-search')
            .waitForElementVisible('.search', 1000)
            .setValue('.search', searchString)
            /**
             wait till we see the autocomplete dropdown
             */
            .waitForElementVisible('.global-search-section', 1000)
            /**
             we want to make sure the autocomplete shows results based on our query
             */
            .elements('css selector','.global-search-section>a',function (result) {
                result.value.map(function (v,k) {
                    client.elementIdText(v.ELEMENT, function (res) {
                        console.log(res.value);
                        /**
                         in case the search query has spaces and the result returned is without spaces,
                         the test should not fail
                         */
                        actualSearchResult = res.value.toLowerCase()
                        if(actualSearchResult.indexOf(' ') !== -1){
                            this.assert.notEqual(actualSearchResult.indexOf(searchString.toLowerCase()), -1)
                        }
                        else{
                            /**
                             remove space and then match
                             */
                            this.assert.notEqual(actualSearchResult.replace(/\s+/g, '').indexOf(searchString.toLowerCase().replace(/\s+/g, '')), -1)
                        }
                    });
                })
            })
            /**
             Hit Enter to get the results
             */
            .click('.global-search-autocomplete>div:nth-child(2)>a')
            .pause(100)
            .waitForElementVisible('.search-term-text.sorting-text-align',5000)
            .getText('.search-term-text.sorting-text-align',function (result) {
                this.assert.equal(searchString,result.value)
            })
            .end();
    },

    'Empty Search':function (client) {
        client
            .url(client.launch_url)
            .waitForElementVisible('body', 1000)
            .pause(100)
            /**
             click on the search icon
             */
            .click('.icon-search')
            .waitForElementVisible('.search', 1000)
            /**
             Make sure we don't see any autocomplete results
             */
            .waitForElementNotPresent('.global-search-section', 6000)
            /**
             Hit Enter to get the results
             */
            .click('.search')
            .pause(2000)
            .setValue('.search',client.Keys.ENTER)
            .pause(2000)
            .waitForElementVisible('.selection',1000)
            .getText('#sort',function (result) {
                this.assert.equal('highest scoring', result.value)
            })
            /**
             Secondary check, make sure the url is the same each time
             */
            .url(function (result) {
                this.assert.equal(client.launch_url + "search?q=",result.value)
            })
            .end()
    }
};