# Kudi-Savings

Dashboard 

## Project Description (User Stories)

- User can login
- User can create agent
- User can create a zonal head 
- User can create a new market
- User can view all transactions(collections)
- User can view all cashout requests
- Admin user can approve/decline cashout request
- Admin user can view all markets, zonal heads and agents
- User can view all customers and more


## Hosting Details

- [Development URL](https://kudi-savings-dev.kudi.ng)
- [Stafging URL](https://kudi-savings.kudi.ng)
- [Production URL](https://kudi-savings.kudi.ai)

## Api Documentation
- [Swagger docs](https://savings-dev.kudi.ng/swagger-ui.html)


## Technologies Used

This project was bootstrapped with [Create React App](https://github.com/facebook/)create-react-app]. React is a JavaScript library for creating user interfaces. React makes it painless to build interactive UI. 

[React Query](https://github.com/tannerlinsley/react-query) to handle all asynchronous data request 


## Deployment


A push to the feature branch deploys in the PR environement

Updates merged into develop, as well as a push to the develop branch automatically deploys to the Development environment.

Creating a PR from release branch (which mirrors the develop branch) into master

## Project Implementation

This project's components are feature based, there are several features and they are as follows;


### Resuable UI Components

### Services
Http requests were also organized according to each feature, they include
- Admin
- Agents
- Auth
- Cashout
- customers
- dashboard
- markets
- plans
- seetings
- transactions
- zonal-heads


### Context
Context provides a way to pass data through the component tree without having to pass props down manually at every level. Context provides a way to pass data through the component tree without having to pass props down manually at every level.

The Authenticated User details are made available at every level using React Context.

To use this simply do the following below;

```   const [auth] = useContext(AuthContext) ``

## Get Started

- run `npm start`

### Utils
-  Axios

Here the default Axios headers are set

- Function

Conatins all Reusable functions required by different components, 
The ``ParamsReducer`` and ``Default Reducer`` are used across managing pagination and dynamic params

``FormatWalletData``- function formats all wallet history details, for admin, zonal head and agent wallet history

``formatCurrency``- function formats all amount values

``fetchImage``- function handles fetching any user image



