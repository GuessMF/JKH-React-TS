import {useEffect, useState} from 'react';
import './table.scss';
import axios from 'axios';
import Meter from '../Meter/Meter';

// Определяем интерфейс для данных
interface Meter {
  id: string;
  _type: string;
  installation_date: string;
  is_automatic: boolean | null;
  initial_values: number;
  description: string;
  area: {
    id: string;
  };
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

// Определяем интерфейс для ответа API
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

export default function Table() {
  const [data, setData] = useState<Meter[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const [page, setPage] = useState<number>(0);
  const [offset, setOffset] = useState<number>(0);

  const [deleted, setDeleted] = useState<string[]>([]);

  const fetchData = async (page: number) => {
    const limit = 20 + deleted.length;
    setOffset(page * limit);

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

      const filteredData = combinedData.filter(
        (item) => !deleted.includes(item.id)
      );

      setData(filteredData);
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
    fetchData(page);
  }, [page, deleted]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const deleteItem = (id: string) => {
    setDeleted([...deleted, id]);
    setPage(page + 1);
  };

  return (
    <div className='table-container'>
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
          {data.map((item, i) => (
            <Meter
              key={item.id}
              item={item}
              index={offset + i + 1}
              deleteItem={deleteItem}
            ></Meter>
          ))}
        </tbody>
      </table>
    </div>
  );
}
