import {Instance, t} from 'mobx-state-tree';
import {MetersModel} from './MetersModel';
export const RootStore = t
  .model('RootStore', {
    meters: t.array(MetersModel),
  })
  .actions((store) => ({
    updateMeters(
      meterArray: Array<{
        id: string;
        _type: string;
        installation_date: string;
        is_automatic: boolean | null;
        initial_values: number;
        description: string;
        area: {id: string};
        address: string;
        house: string;
      }>
    ) {
      store.meters.replace(
        meterArray.map((meter) => ({
          id: meter.id,
          _type: meter._type[0],
          installation_date: meter.installation_date,
          is_automatic: meter.is_automatic,
          initial_values: Array.isArray(meter.initial_values)
            ? meter.initial_values[0]
            : meter.initial_values,
          description: meter.description,
          area: meter.area.id,
          address: meter.address || 'Адрес не найден',
          house: meter.house || '',
        }))
      );
    },
  }));

export type RootStoreType = Instance<typeof RootStore>;
let rootStore: RootStoreType;
export function useStore() {
  if (!rootStore) {
    rootStore = RootStore.create({
      meters: [],
    });
  }
  return rootStore;
}
