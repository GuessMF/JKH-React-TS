import {useEffect, useState} from 'react';
import axios from 'axios';

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
  address?: string;
  house?: string;
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [metersResponse, areasResponse] = await Promise.all([
          axios.get<ApiResponseMeters>(
            'http://showroom.eis24.me/api/v4/test/meters/?limit=100&offset=0'
          ),
          axios.get<ApiResponseAreas>(
            'http://showroom.eis24.me/api/v4/test/areas/'
          ),
        ]);

        const meters = metersResponse.data.results;
        const areas = areasResponse.data.results;

        // Объединяем данные счетчиков и областей по id

        // console.log(meters[0].area.id);
        console.log(meters);
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

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Index</th>
          <th>Meter ID</th>
          <th>Type</th>
          <th>Date</th>
          <th>Is automatic</th>
          <th>Initial Values</th>
          <th>Description</th>
          <th>Area ID</th>
          <th>Address</th>
          <th>House</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, i) => (
          <tr key={item.id}>
            <td>{i + 1}</td>
            <td>{item.id}</td>
            <td>{item._type}</td>
            <td>{item.installation_date}</td>
            <td>
              {item.is_automatic === null
                ? 'данных нет'
                : item.is_automatic
                ? 'Автоматический'
                : 'Не автоматический'}
            </td>
            <td>{item.initial_values}</td>
            <td>{item.description}</td>
            <td>{item.area.id}</td>
            <td>{item.address}</td>
            <td>{item.house}</td>
          </tr>
        ))}
      </tbody>
      <button>next</button>
      <button>prev</button>
    </table>
  );
}
