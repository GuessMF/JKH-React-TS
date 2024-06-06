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

  // const getConfigs = async () => {
  //   try {
  //     console.log('test');

  //     console.log(await axios.get('/api/v4/test/meters/?limit=20&offset=0'));
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  // getConfigs();

  const fetchData = async (page: number) => {
    const limit = 20;
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

      setData(combinedData);
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
  }, [page]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // const deleteItem = (id: string) => {
  //   setData((prevData) => prevData.filter((item) => item.id !== id));
  // };

  // const deleteItem = (id: string) => {
  //   setData((prevData) => {
  //     const updatedData = prevData.filter((item) => item.id !== id);
  //     // Если элементов меньше 20 после удаления, загрузить еще
  //     if (updatedData.length < 20) {
  //       fetchData(page);
  //       setPage((prevPage) => prevPage + 1);
  //     }
  //     return updatedData;
  //   });
  // };
  const deleteItem = async (id: string) => {
    console.log(data.length);
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
          {/* {data.map((item, i) => (
            <Meter
              key={item.id}
              item={item}
              index={offset + i + 1}
              deleteItem={deleteItem}
            ></Meter>
          ))} */}

          {data.slice(0, 20).map((item, i) => (
            <Meter
              key={item.id}
              item={item}
              index={i + 1}
              deleteItem={deleteItem}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
