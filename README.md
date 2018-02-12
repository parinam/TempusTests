## Imgur Automation using Nightwatch:

This project has automated test cases that test the upload, search and linking functionality of Imgur.com.

## Prerequisites

* Docker: https://docs.docker.com/engine/installation/1
* Docker Compose: https://docs.docker.com/compose/install/

## SetUp:

* bin: The bin directory has the selenium jar file, the chrome driver and the gecko driver.
* custom-commands: Contains one custom command to upload a valid image and check that its uploaded.
* data: The data used in the tests. Contains a text file and a jpg file.
* reports: The reports generated after the tests have run.
* tests: The tests that drive Imgur.com
* nightwatch.json: Nightwatch configuration for the test setup. By default tests are setup to run in firefox and chrome in parallel
* README.md: Contains instructions to run and information on the setup.

## Running Tests:

Since we are using docker to run the tests, all the dependencies are handled in the Dockerfile.</br>
To run the test suite: *docker-compose run --rm -T tempus.</br>
This will pull the latest selenium hub, chrome and firefox(3.3) nodes and install dependencies, run the tests and show the results.</br>
To clean up after test run:  *docker kill $(docker ps -q);docker rm $(docker ps -a -q);docker rmi $(docker images -q)


## Tests : 

* postImageImgur.js: Test the Post image functionality.
   * Post valid Image to Imgur: Post a valid jpg image to imgur and make sure we see the 'image saved' pop up text and we see the image post input field.
   * Post Invalid File to Imgur: Try to post a text file and make sure the page does not get redirected, the url is the same(https://imgur.com).
   * Post Image after a successful upload: Post a valid image after a successful image upload and make sure the second upload is successful.
 
* searchButton.js: Test the search functionality.
    * Search Results in Imgur: Type a query and make sure the results in autocomplete tie to the search query. You can change the search query in line 4 of this test. 
  Also make sure the search query is tied to the main page.
    * Empty Search: Press enter in the search bar without any text and make sure we see no autocomplete element and we see the same url each time (https://imgur.com/search?q=),
  we also make sure we see the same text on the redirected page on an empty search query.
 
* randonButton.js: Click on the random button.
    * Random Button Test: Click on the random button and make sure we are redirected.
 
## Todo: Just a few ideas to expand on the testing.
* Boundary Value Analysis: According to the Imgur documentation(https://help.imgur.com/hc/en-us/articles/210076663-Upload-Images)
 A user can upload 50 images in one hour from 1 IP address. We can run a loop of 51 uploads and test the boundary condition for maximum image uploads per hour per IP address.
* File Types Upload: We can expand our testing to include all file types supported and the file size by Imgur.com.
