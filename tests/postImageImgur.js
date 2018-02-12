module.exports = {
    disabled: false,
    'Post Valid Image to Imgur': function (client) {
        client
            .url(client.launch_url)
            .waitForElementVisible('body', 1000)
            .pause(100)
            /**
                click on the upload button
             */
            .click('.upload-btn-text')
            .pause(100)
            .waitForElementVisible('.browse-btn', 1000)
            /**
                Upload a Valid Image and make sure its a success
                Calls a custom command
             */
            .uploadImage()
            .end();
    },

    'Post Invalid file to Imgur' : function (client) {
        client
            .url(client.launch_url)
            .waitForElementVisible('body', 1000)
            .pause(100)
            /**
             click on the upload button
             */
            .click('.upload-btn-text')
            .pause(1000)
            .waitForElementVisible('.browse-btn', 1000)
            .getAttribute('#global-files-button', 'class', function (result) {
                /**
                 Make sure the input file element is visible to upload
                 */
                if(result.value == 'nodisplay'){
                    /**
                     Lets make it visible
                     */
                    this.execute("document.getElementById('global-files-button').style.display = 'block';")
                }

            })
            .pause(100)
            /**
             Making sure that worked!
             */
            .assert.visible("#global-files-button")
            .pause(100)
            /**
             upload the file.
             */
            .setValue('input[type="file"]', require('path').resolve(__dirname + '/../data/Invalid.txt'))
            .pause(1000)
            .waitForElementNotPresent('.post-title.post-contenteditable', 5000)
            /**
                We should not have moved away and the url should be the same
             */
            .url(function (result) {
                this.assert.equal(client.launch_url, result.value)
            })
            .end()
    },
    'Post Image after a successful Upload':function (client) {
        client
            .url(client.launch_url)
            .waitForElementVisible('body', 1000)
            .pause(100)
            /**
             click on the upload button
             */
            .click('.upload-btn-text')
            .pause(100)
            .waitForElementVisible('.browse-btn', 1000)
            /**
                Upload a valid Image and make sure its a success
             */
            .uploadImage()
            .click('.post-add-image.end>span')
            .waitForElementVisible('.browse-btn', 1000)
            /**
                Upload the same image again and make sure its a success too!
             */
            .uploadImage()
            .pause(2000)
            .click('.logo-icon')
            .end()
    }
};

