## Budget Tracker

[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)

- [Description ](#description)
- [Installation and Usage](#installation-and-use)
- [License](#license)

![screenshot-homepage](public/images/demo1.png)
![screenshot-dashboard](public/images/demo2.png)

# Description

Budget Tracker is a simple Progressive Web App app that allows the user to keep track of their deposits and expenses while on the move. A key feature of this app is the use of IndexedDB, which allows for the app to retain its functionality in the case of a network interruption, and seamlessly reconnect to the database when the connection is restored without any loss of data.

The app is built with Node.js, Express, MongoDB, and Mongoose; and is deployed on Heroku via the following link: https://enigmatic-headland-42570.herokuapp.com/

# Installation and Use

Clone the repo and open the folder in the code editor of your choice.

YMkae sure you have MongoDB installed on your local machine, then create a mongo database called 'budget' with a collection called 'transactions'.

Next, install the necessary dependencies by running the following command from the terminal in the root directory:

```
npm i
```

Finally, start the server on localhost3000 via:

```
npm start
```

# License

[MIT License](https://opensource.org/licenses/MIT)
