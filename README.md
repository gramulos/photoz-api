# PhotoZ API
This is API project for PhotoZ app.
If you have questions, read this file carefully and you will find answers. If not, reach out the authour.

# 0. Requirements to run locally
  - MongoDB should be installed and started. [Download here](https://www.mongodb.com/try/download/community)
  - NodeJS should be installed. [Download here](https://nodejs.org/en/download/)
  - Postman is required to test APIs. [Download here](https://www.postman.com/downloads/)

# 1. Configuring .env file
.env file is required for project to start working properly.
1. Create copy of .env.template file and rename it to .env
2. Set your own SESSION_SECRET, JWT_SECRET
3. Change HOST_PORT if it differ than default 3000

# 2. Project scripts
1. If you just cloned the project then you need to install all dependencies by running command:
```sh
$ npm install
```
2. In order to start project locally run command:
```sh
npm dev
```
# 3. API collection
There is an Postman API collection to this application. You just need to import this collection to postman.
It's located in project root folder and called [PhotoZ_API_v2.postman_collection.json](https://github.com/gramulos/photoz-api/blob/master/PhotoZ_API_v2.postman_collection.json)
