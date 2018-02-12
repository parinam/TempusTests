module.exports = {
    disabled: false,
    'Random button test': function (client) {
        client
            .url(client.launch_url)
            .waitForElementVisible('body', 1000)
            .pause(100)
            /**
             Make sure we see the random button
             */
            .waitForElementVisible('#random-button', 1000)
            /**
                click on the random button
             */
            .click('#random-button')
            .waitForElementVisible('.sg-title',5000)
            .url(function (result) {
                /**
                    need to make sure we see the gallery in the url
                 */
                this.assert.notEqual(result.value.indexOf("gallery"), -1)
            })
            .end()
    }
};

