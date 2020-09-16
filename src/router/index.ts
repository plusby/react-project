import Home from './modules/home/index.js'
import Sum from './modules/sum/index.js' 
import ReactLogin from './modules/react-login-client/index.js' 

let routes = [
  ...Home,
  ...Sum,
  ...ReactLogin
];

export default routes;