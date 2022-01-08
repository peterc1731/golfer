import {atom} from 'recoil';

export const overlayHeightState = atom<number>({
  key: 'overlayHeightState',
  default: 0,
});
