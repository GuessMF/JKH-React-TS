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
    area: string;
    address: string;
    house: string;
  };
  deleteItem: (id: string) => void;
}

export default function Meter({item, index, deleteItem}: MeterProps) {
  function formatDate(inputDate: string): string {
    const date = new Date(inputDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  }

  return (
    <tr className='meter'>
      <td>{index}</td>
      <td>
        <img
          src={
            item._type === 'HotWaterAreaMeter'
              ? hot_icon
              : item._type === 'ColdWaterAreaMeter'
              ? cold_icon
              : ''
          }
          alt='img'
          className='type-img'
        />
        <span>
          {item._type === 'HotWaterAreaMeter'
            ? 'ГВС'
            : item._type === 'ColdWaterAreaMeter'
            ? 'ХВС'
            : 'no'}
        </span>
      </td>
      <td>{formatDate(item.installation_date)}</td>
      <td>
        {item.is_automatic === null
          ? 'данных нет'
          : item.is_automatic
          ? 'Автоматический'
          : 'Не автоматический'}
      </td>
      <td>{item.initial_values}</td>
      <td>
        {item.address !== 'Адрес не найден'
          ? `${item.address}, ${item.house}`
          : 'Адрес не найден'}
      </td>
      <td>{item.description}</td>

      <td>
        <DeleteBtn deleteItem={deleteItem} id={item.id} />
      </td>
    </tr>
  );
}
