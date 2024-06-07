import {t} from 'mobx-state-tree';

export const MetersModel = t.model('MetersModel', {
  id: t.string,
  _type: t.string,
  installation_date: t.string,
  is_automatic: t.maybeNull(t.boolean),
  initial_values: t.number,
  description: t.string,
  area: t.string,
  address: t.string,
  house: t.string,
});
