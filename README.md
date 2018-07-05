#FFW Sitecore Prototype Template

##Getting started

###Prerequisites:
The prototype template has a few dependencies that you will need to install to use it. Don't worry, we've got all the links you need right here:   

* [Node.js](https://nodejs.org/en/) – The backbone of the framework. Node Package Manager takes care of installing all the dev dependencies. Use version 4.0.0
* [Gulp](http://gulpjs.com/) – Task manager and automation. Gulp is responsible for running all the small tasks like compiling SCSS and Twig templates, minifying javascript, starting a web server and automatically reloading browsers.

###Starting a new project
So you got the prerequisites installed, and you're ready to get started? Great! Just follow the simple steps below: 


1. Download a copy of the framework

2. Open up the project folder in Terminal.

3. Navigate to the .npm folder:  
    
    ```
    cd .npm
    ``` 

3. Install all the required packages with Node Package Manager  
    
    ```
    npm install
    ``` 

4. Initialize the project with Gulp task:
    
    ```
    gulp - Runs node server on localhost:3000 with live reload. CSS, javacript and html builds.
    ```