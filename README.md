## Geocaching service

A node.js express  api project.

#   Getting Started

#   Requirement:

Node.js and npm

#   Installing:

Install the required packages with that command at project directory:

    npm install 

#   Start:

To start and debug project run that that command at project directory:

     npm start 

Builds project to /dist folder and runs api in development mode. Open http://localhost:8080 to view it in the browser. 

#   Test:

There are several test cases for components and reducers. To run test cases, run that command at project directory:

     npm test

#   Deployment:

To prepare a deployment of project, run that command at project directory:

     npm run build

#   Code Overview

#   Dependencies:

- expressjs - The server for handling and routing HTTP requests
- express-validation - to validate post requests
- joi - to write validation rules 
- moment-  For handling time
- body-parser - to parse json requests
- babel * - to use es6 in node.js 
- mocha, chai, and sinon: packages that are used to write test cases                      

#   Features:

- Calculate a repayment plan 

#   Application Structure:

- app.js -  this file defines our express server and  requires the routes we'll be using in the application. The entry point to our - application.
- config/ -  configuration variables for our server are contained in this folder
- routes/ -  the route definitions for our API are contained in this folder
- controller/ - Controllers that handle requests with data are contained in this folder
- validation/ -  validation rules for our post requests are contained in this folder

#   API

## Insert secret message  [POST] [/api/geolocation/insertmessage]

Insert messages to specific locations with latitude and longitude

+ Request (application/json)

{
    "loanAmount": "5",
    "nominalRate": "0",
    "duration": 24,
    "startDate": "2018-01-01T00:00:01Z"
}
        
+ Response 200 (application/json)

        
{
    "status": 200,
    "statusText": "OK",
    "message": [
        {
            "borrowerPaymentAmount": "219.19",
            "date": "2018-01-01T00:00:01.000Z",
            "initialOutstandingPrincipal": "5000.00",
            "interest": "20.83",
            "principal": "198.36",
            "remainingOutstandingPrincipal": "4801.64"
        },
        {
            "borrowerPaymentAmount": "219.36",
            "date": "2018-02-01T00:00:01.000Z",
            "initialOutstandingPrincipal": "4801.64",
            "interest": "20.01",
            "principal": "199.36",
            "remainingOutstandingPrincipal": "4602.29"
        },
        ...
                {
            "borrowerPaymentAmount": "219.27",
            "date": "2019-12-01T00:00:01.000Z",
            "initialOutstandingPrincipal": "219.79",
            "interest": "0.92",
            "principal": "218.36",
            "remainingOutstandingPrincipal": "0.00"
        }
    ]
}
       
+ Response 400 (application/json)

{
        "message": "validation error . \"loanAmount\" with value \"five\" fails to match the required pattern: /^[0-9]+$/",
        "status": 400,
        "statusText": "Bad Request"
}
       
+ Response 404 (application/json)

{
        "status": 404,
        "statusText": "Internal Error",
        "message": "Nominal Rate must be greater than zero"
}

#   License

This project is licensed under the MIT License 

#   Authors

Yusuf Yılmaz



