import './app.scss';
import Table from '../components/Table/Table';

// import { Provider } from 'mobx-react-lite';
// import store from '../stores/index';
import Pagination from '../components/Pagination/Pagination';

function App() {
  // const [page, setPage] = useState<number>(0);

  return (
    <div className='app'>
      <h1>Список счётчиков</h1>

      <Table />
      <Pagination />
    </div>
  );
}

export default App;
