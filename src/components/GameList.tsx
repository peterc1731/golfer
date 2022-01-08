import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useRecoilValue} from 'recoil';
import {currentGameState, Game, gameListState} from '../state/game';
import GameItem from './GameItem';
import Spacer from './Spacer';
import SubtitleText from './SubtitleText';

interface Props {
  onSelect: (game: Game) => void;
}

function GameList({onSelect}: Props) {
  const gameList = useRecoilValue(gameListState);
  const currentGame = useRecoilValue(currentGameState);
  const hasPrev = !!gameList.length;
  const hasCurrent = !currentGame.complete && !!currentGame.title;
  return (
    <>
      {hasCurrent && (
        <>
          <GameItem item={currentGame} onPress={() => onSelect(currentGame)} />
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
            renderItem={({item}) => (
              <GameItem item={item} onPress={() => onSelect(item)} />
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
