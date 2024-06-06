import React from 'react';
import './deleteBtn.scss';
import deleteIcon from '../../assets/Icons/delete_icon.svg';

interface DeleteBtnProps {
  deleteItem: (id: string) => void;
  id: string;
}

export default function DeleteBtn({deleteItem, id}: DeleteBtnProps) {
  return (
    <button className='deleteBtn' onClick={() => deleteItem(id)}>
      <img src={deleteIcon} alt='' />
    </button>
  );
}
