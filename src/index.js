import ReactDOM from 'react-dom';
import App from '@/app.js'
import '@/mock/index'

// if (process.env.NODE_ENV !== 'production'){
//     require('@/mock/index') 
// }

ReactDOM.render(
    <App />,
    document.getElementById('root')
)