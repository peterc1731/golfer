import React from 'react';
import {StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useRecoilState} from 'recoil';
import {
  currentGameState,
  defaultGame,
  Game,
  gameListState,
} from '../state/game';
import GameItem from './GameItem';
import Spacer from './Spacer';
import SubtitleText from './SubtitleText';

interface Props {
  onSelect: (game: Game) => void;
}

function GameList({onSelect}: Props) {
  const [gameList, setGameList] = useRecoilState(gameListState);
  const [currentGame, setCurrentGame] = useRecoilState(currentGameState);
  const hasPrev = !!gameList.length;
  const hasCurrent = !currentGame.complete && !!currentGame.title;

  return (
    <>
      {hasCurrent && (
        <>
          <GameItem
            item={currentGame}
            onPress={() => onSelect(currentGame)}
            onDelete={() => setCurrentGame(defaultGame())}
          />
          <Spacer height={40} />
        </>
      )}
      {hasPrev && (
        <>
          <View style={styles.indent}>
            <SubtitleText>past games</SubtitleText>
          </View>
          <FlatList
            style={styles.list}
            data={gameList}
            keyExtractor={({id}) => id}
            renderItem={({item, index}) => (
              <GameItem
                item={item}
                onPress={() => onSelect(item)}
                onDelete={() =>
                  setGameList(prev => {
                    const updated = [...prev];
                    updated.splice(index, 1);
                    return updated;
                  })
                }
              />
            )}
          />
        </>
      )}
      {!hasCurrent && !hasPrev && (
        <View style={styles.empty}>
          <SubtitleText>no games played</SubtitleText>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indent: {
    marginLeft: 20,
  },
});

export default GameList;
