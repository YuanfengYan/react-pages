import React from 'react';

import ReactDom from 'react-dom';
import { Button } from 'antd';
import 'antd/dist/reset.css';
import type { FC } from 'react';
// import './App.css';

const App:FC = () => (
  <div className="App">
    <Button type="primary">Button</Button>
  </div>
);
ReactDom.render(<App />, document.getElementById('app'));



