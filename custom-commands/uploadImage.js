exports.command = function () {
    this
        .getAttribute('#global-files-button', 'class', function (result) {
            /**
             Make sure the input file element is visible to upload
             */
            if (result.value == 'nodisplay') {
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
        .setValue('input[type="file"]', require('path').resolve(__dirname + '/../data/soccer.jpg'))
        .pause(100)
        /**
         Once finished, the page should be redirected
         */
        .waitForElementVisible('.post-title.post-contenteditable', 1000)
        .waitForElementVisible('.FlipInfo-message', 5000)
        /**
         Make sure we see the message of the image being saved
         */
        .getText(".FlipInfo-message", function (result) {
            this.assert.equal("1 image saved", result.value)
        })
}