# development-challenge-two 

## Stack
Built with [ExpressJs](https://expressjs.com/) and [Serveless Framework](https://github.com/serverless/)

Using [AWS Lambda](https://aws.amazon.com/lambda/), [AWS DynamoDB](https://aws.amazon.com/dynamodb/) and [AWS API Gateway](https://aws.amazon.com/api-gateway/)
<img width="1499" alt="Untitled (2)" src="https://user-images.githubusercontent.com/26260636/209044895-3e7deca6-187a-47b4-a125-b84fdae5a2f4.png">

## Usage

### Config
Create a .env file with the following variablables.
``` shell
export AWS_ACCESS_KEY_ID=...
export AWS_SECRET_ACCESS_KEY=...
```
_[How to get my AWS ACCESS KEY](https://docs.aws.amazon.com/powershell/latest/userguide/pstools-appendix-sign-up.html)_
### Install
You will need to have node.Js(v. 14.x) and npm (or another package manager) configured on your machine.
Install the Serverless Framwork with the command 
```shell
$ npm install -g serverless
```
Install the dependencies with the command 
```shell
$ npm i
```
To run it locally 
```shell
$ serverless offline
```
+ If you want to use DynamoDB local you can follow this [tutorial](https://www.serverless.com/plugins/serverless-dynamodb-local) 

### Deployment

```
$ serverless deploy
```
Read the docs [here](https://www.serverless.com/framework/docs)
