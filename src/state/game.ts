import {atom, AtomEffect} from 'recoil';
import MMKVStorage from 'react-native-mmkv-storage';
import 'react-native-get-random-values';
import {v4 as uuid} from 'uuid';
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
  id: string;
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
  id: uuid(),
});

const CURRENT_VERSION = 2;

const storageEffect =
  <T>(
    key: string,
    fallback: () => T,
    migrate: (a: any, v: number) => T,
  ): AtomEffect<T> =>
  ({setSelf, onSet}) => {
    setSelf(() => {
      const value = storage.getString(key);
      if (!value) {
        return fallback();
      }
      const version = storage.getInt(`${key}__version`) || 1;
      const obj = JSON.parse(value);
      if (version === CURRENT_VERSION) {
        return obj;
      }
      storage.setInt(`${key}__version`, CURRENT_VERSION);
      return migrate(obj, version);
    });

    onSet((newValue, _, isReset) => {
      isReset
        ? storage.removeItem(key)
        : storage.setStringAsync(key, JSON.stringify(newValue));
    });
  };

const migrateGame = (prev: any, version: number): Game => {
  let game: Game = prev;
  if (version < 2) {
    game = {
      ...prev,
      id: uuid(),
      players: game.players.map(p => ({...p, name: p.name.slice(0, 5)})),
    };
  }
  return game;
};

const migrateGames = (prev: any, version: number): Game[] => {
  return (prev as Game[]).map(g => migrateGame(g, version));
};

export const currentGameState = atom<Game>({
  key: 'currentGameState',
  default: defaultGame(),
  effects_UNSTABLE: [
    storageEffect<Game>('current_game', defaultGame, migrateGame),
  ],
});

export const gameListState = atom<Game[]>({
  key: 'gameListState',
  default: [],
  effects_UNSTABLE: [storageEffect<Game[]>('games', () => [], migrateGames)],
});
