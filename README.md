# Carousell Reddit

[![Build Status](https://travis-ci.org/tsaohucn/Carousell_Reddit.svg?branch=master)](https://travis-ci.org/tsaohucn/Carousell_Reddit)
[![Docker Build Statu](https://img.shields.io/docker/build/tsaohucn/carousell_reddit.svg)](https://hub.docker.com/r/tsaohucn/carousell_reddit/builds/)
[![Coverage Status](https://coveralls.io/repos/github/tsaohucn/Carousell_Reddit/badge.svg?branch=master)](https://coveralls.io/github/tsaohucn/Carousell_Reddit?branch=master)

This is a Reddit for exercise of carousell

# Beginning Instructions

## Localhost Qickly

Clone the app in your localhost and start the app quickly. 

The way dependency with what libraries you have installed in your computer, for example : nodejs, if you don't wanna make trouble in process  of installing libraries, the better way I advise is using **Docker Quickly** in the below.

`git clone https://github.com/tsaohucn/Carousell_Reddit.git`

`cd Carousell_Reddit && yarn install`

* Run Tests : `npm test`
* Start App : `npm start`

## Demo Qickly

Click on the button to see online demon quickly.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://carousellreddit.herokuapp.com/)

## Docker Quickly

Make sure you have installed docker in your computer, then you can follow the instructions below start the app quickly, the app work correctly with docker Version 17.03.1-ce-mac12 (17661), you can try with your original older docker version first, or update to the newest docker version if it didn't work with older version. 

[![Docker](https://seeklogo.com/images/D/docker-logo-6D6F987702-seeklogo.com.png)](https://hub.docker.com/r/tsaohucn/carousell_reddit/)

* `docker pull tsaohucn/carousell_reddit`

* `docker run -p {Your Localhost Port}:3000 tsaohucn/carousell_reddit /bin/bash -l -c "npm start"`