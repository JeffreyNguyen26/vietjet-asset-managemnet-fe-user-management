import React from 'react';
import ReactDOM from 'react-dom';
import whyDidYouRender from '@welldone-software/why-did-you-render';

import App from '@app/index';

import 'moment/locale/vi';
// eslint-disable-next-line
import '@assets/styles/styles.less';
import 'react-day-picker/lib/style.css';
import 'semantic-ui-less/semantic.less';

if (process.env.NODE_ENV === 'development') {
  whyDidYouRender(React, {
    // trackAllPureComponents: true,
  });
}

ReactDOM.render(<App />, document.getElementById('root'));
