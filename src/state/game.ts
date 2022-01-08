import {atom, AtomEffect} from 'recoil';
import MMKVStorage from 'react-native-mmkv-storage';
import {randomEmoji} from '../lib/emoji';

const storage = new MMKVStorage.Loader().initialize();

export interface Game {
  title: string;
  location: string;
  date: string;
  complete: boolean;
  players: {name: string; emoji: string}[];
  holes: {[key: string]: number}[];
  hole: number;
  started: boolean;
}

export const defaultGame = (): Game => ({
  title: '',
  location: '',
  date: new Date().toDateString(),
  complete: false,
  hole: 0,
  players: [{name: '', emoji: randomEmoji()}],
  holes: [],
  started: false,
});

const storageEffect =
  <T>(key: string, fallback: () => T): AtomEffect<T> =>
  ({setSelf, onSet}) => {
    setSelf(
      storage
        .getStringAsync(key)
        .then(savedValue =>
          savedValue != null ? JSON.parse(savedValue) : fallback(),
        ),
    );

    onSet((newValue, _, isReset) => {
      isReset
        ? storage.removeItem(key)
        : storage.setStringAsync(key, JSON.stringify(newValue));
    });
  };

export const currentGameState = atom<Game>({
  key: 'currentGameState',
  default: defaultGame(),
  effects_UNSTABLE: [storageEffect<Game>('current_game', defaultGame)],
});

export const gameListState = atom<Game[]>({
  key: 'gameListState',
  default: [],
  effects_UNSTABLE: [storageEffect<Game[]>('games', () => [])],
});
