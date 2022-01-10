import React from 'react';
import {useRecoilState, useSetRecoilState} from 'recoil';
import Button from '../components/Button';
import ButtonContainer from '../components/ButtonContainer';
import FlexContainer from '../components/FlexContainer';
import HoleRow from '../components/HoleRow';
import ScreenContainer from '../components/ScreenContainer';
import Spacer from '../components/Spacer';
import TitleText from '../components/TitleText';
import {currentGameState, gameListState} from '../state/game';
import {Navigation} from '../state/navigation';

interface Props {
  navigation: Navigation;
}

function HoleScreen({navigation}: Props) {
  const [game, setGame] = useRecoilState(currentGameState);
  const setGameList = useSetRecoilState(gameListState);
  return (
    <ScreenContainer>
      <FlexContainer scroll>
        <Spacer height={40} />
        <TitleText>hole {game.hole + 1}</TitleText>
        <Spacer height={40} />
        {[{name: 'PAR', emoji: ''}, ...game.players].map(p => (
          <React.Fragment key={p.name}>
            <HoleRow
              value={game.holes[game.hole]?.[p.name]}
              onChange={v =>
                setGame(g => {
                  const holes = [...g.holes];
                  if (holes[g.hole]) {
                    holes[g.hole] = {...holes[g.hole], [p.name]: v};
                  } else {
                    holes[g.hole] = {[p.name]: v};
                  }
                  return {...g, holes};
                })
              }
              emoji={p.emoji}
            />
            <Spacer height={30} />
          </React.Fragment>
        ))}
      </FlexContainer>
      <ButtonContainer>
        <Button
          text="End Game"
          type="destructive"
          onPress={() => {
            setGameList(gl => [{...game, complete: true}, ...gl]);
            setGame(g => ({...g, complete: true}));
            navigation.replace('Summary');
          }}
        />
        <Button
          text="Next Hole"
          onPress={() => setGame(g => ({...g, hole: g.hole + 1}))}
        />
      </ButtonContainer>
    </ScreenContainer>
  );
}

export default HoleScreen;
