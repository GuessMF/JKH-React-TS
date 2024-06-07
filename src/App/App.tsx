import {useState} from 'react';
import './app.scss';
import {Table} from '../components/Table/Table';
import Pagination from '../components/Pagination/Pagination';

function App() {
  const [page, setPage] = useState<number>(0);

  const changePage = (page: number) => {
    setPage(page);
  };

  return (
    <div className='app'>
      <h1>Список счётчиков</h1>
      <Table currentPage={page} />
      <Pagination page={page} setPage={changePage} />
    </div>
  );
}

export default App;
