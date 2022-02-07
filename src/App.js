import React from 'react';
import './style.css';
import Header from './Components/Header';
import Body from './Components/Body';

export default function App() {
  return (
    <div className="mainContainer">
      <Header />
      <Body />
    </div>
  );
}
