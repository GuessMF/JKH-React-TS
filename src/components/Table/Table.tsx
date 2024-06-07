import {useEffect, useState, useRef} from 'react';
import './table.scss';
import axios from 'axios';
import Meter from '../Meter/Meter';

import {useStore} from '../../models/RootStore';
import {observer} from 'mobx-react-lite';

interface TableProps {
  currentPage: number;
}
interface Meter {
  id: string;
  _type: string;
  installation_date: string;
  is_automatic: boolean | null;
  initial_values: number;
  description: string;
  area: {id: string};
  address: string;
  house: string;
}

interface House {
  address: string;
}

interface Area {
  id: string;
  address: string;
  house: House;
  str_number_full: string;
}

interface ApiResponseMeters {
  count: number;
  next: string | null;
  previous: string | null;
  results: Meter[];
}

interface ApiResponseAreas {
  count: number;
  next: string | null;
  previous: string | null;
  results: Area[];
}

export const Table = observer(({currentPage}: TableProps) => {
  const rootStore = useStore();

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const tableRef = useRef<HTMLDivElement | null>(null);

  const [offset, setOffset] = useState<number>(0);
  const [deleted, setDeleted] = useState<string[]>([]);
  const [limit, setLimit] = useState<number>(20);

  const fetchData = async () => {
    try {
      const [metersResponse, areasResponse] = await Promise.all([
        axios.get<ApiResponseMeters>(
          `/api/v4/test/meters/?limit=${limit}&offset=${offset}`
        ),
        axios.get<ApiResponseAreas>('/api/v4/test/areas/'),
      ]);

      const meters = metersResponse.data.results;
      const areas = areasResponse.data.results;
      const combinedData = meters.map((meter) => {
        const area = areas.find((area) => area.id === meter.area.id);
        return {
          ...meter,
          address: area ? area.house.address : 'Адрес не найден',
          house: area ? area.str_number_full : '',
        };
      });

      const filteredData = combinedData
        .filter((item) => !deleted.includes(item.id))
        .slice(0, 20);
      rootStore.updateMeters(filteredData);
      setLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      } else {
        setError(new Error('Ошибка'));
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    setLimit(20 + deleted.length);
    setOffset(currentPage * limit);
  }, [currentPage, deleted, limit]);

  useEffect(() => {
    fetchData();
    tableRef.current?.scrollTo({top: 0, behavior: 'smooth'});
  }, [offset, currentPage]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const deleteItem = (id: string) => {
    setDeleted([...deleted, id]);
  };

  return (
    <div ref={tableRef} className='table-container'>
      <table>
        <thead>
          <tr>
            <th>
              <h5>№</h5>
            </th>
            <th>
              <h5>Тип</h5>
            </th>
            <th>
              <h5>Дата установки</h5>
            </th>
            <th>
              <h5>Автоматический</h5>
            </th>
            <th>
              <h5>Текущие показания</h5>
            </th>
            <th>
              <h5>Адрес</h5>
            </th>
            <th>
              <h5>Примечание</h5>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rootStore.meters
            .filter((meter) => !deleted.includes(meter.id))
            .map((meter, i) => (
              <Meter
                key={meter.id + i}
                item={meter}
                index={offset + i + 1}
                deleteItem={deleteItem}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
});
