import React from 'react';
import Calculator from './components/Calculator';
import './App.css'; // Здесь будут общие стили для всего приложения

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="background">
        <Calculator />
      </div>
    </div>
  );
};

export default App;
