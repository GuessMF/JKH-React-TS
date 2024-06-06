import {useState} from 'react';
import './app.scss';
import Table from '../components/Table/Table';
// import './App.css';

// import Table from '../components/Table/Table';
import Meter from '../components/Meter/Meter';
import Pagination from '../components/Pagination/Pagination';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='app'>
      <h1>Список счётчиков</h1>

      <Table />
      <Pagination />
    </div>
  );
}

export default App;
