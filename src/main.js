import './bgetem.less';
import './bgetem.css';
if (process.env.NODE_ENV !== 'production') {
    require('file-loader!../index.html')
}