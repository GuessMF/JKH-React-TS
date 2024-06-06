import './meter.scss';
import DeleteBtn from '../DeteleBtn/DeleteBtn';

import cold_icon from '../../assets/Icons/hvs_icon.svg';

import hot_icon from '../../assets/Icons/gvs_icon.svg';

interface MeterProps {
  index: number;
  item: {
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
  };
  deleteItem: (id: string) => void;
}

// interface Meter {
//   id: string;
//   _type: string;
//   installation_date: string;
//   is_automatic: boolean | null;
//   initial_values: number;
//   description: string;
//   area: {
//     id: string;
//   };
//   address: string;
//   house: string;
// }
export default function Meter({item, index, deleteItem}: MeterProps) {
  function formatDate(inputDate: string): string {
    const date = new Date(inputDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  }
  // console.log(item);

  return (
    <tr className='meter'>
      <td>{index}</td>
      {/* <td>{item.id}</td> */}
      <td>
        {/* {item._type[0]} */}

        <img
          src={
            item._type[0] === 'HotWaterAreaMeter'
              ? hot_icon
              : item._type[0] === 'ColdWaterAreaMeter'
              ? cold_icon
              : ''
          }
          alt='img'
        />
        <p>
          {item._type[0] === 'HotWaterAreaMeter'
            ? 'ГВС'
            : item._type[0] === 'ColdWaterAreaMeter'
            ? 'ХВС'
            : 'no'}
        </p>
      </td>
      <td>
        {/* {item.installation_date} */}
        {formatDate(item.installation_date)}
      </td>
      <td>
        {item.is_automatic === null
          ? 'данных нет'
          : item.is_automatic
          ? 'Автоматический'
          : 'Не автоматический'}
      </td>
      <td>{item.initial_values}</td>

      {/* <td>{item.area.id}</td> */}
      <td>
        {item.address !== 'Адрес не найден'
          ? `${item.address}, ${item.house}`
          : 'Адрес не найден'}
      </td>
      <td>{item.description}</td>
      {/* <td>8</td>
      <td>9</td>
      <td>10</td> */}
      <td>
        <DeleteBtn deleteItem={deleteItem} id={item.id} />
        {/* <button onClick={() => deleteItem(item.id)}>x</button> */}
      </td>
    </tr>
  );
}
