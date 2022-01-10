import React, {useEffect} from 'react';
import {useRecoilValue} from 'recoil';
import Button from '../components/Button';
import ButtonContainer from '../components/ButtonContainer';
import FlexContainer from '../components/FlexContainer';
import Results from '../components/Results';
import ScreenContainer from '../components/ScreenContainer';
import Spacer from '../components/Spacer';
import Winner from '../components/Winner';
import {currentGameState} from '../state/game';
import {Navigation} from '../state/navigation';
import Haptic from 'react-native-haptic-feedback';

interface Props {
  navigation: Navigation;
}

function SummaryScreen({navigation}: Props) {
  const game = useRecoilValue(currentGameState);
  const winner = game.players
    .map(p => ({
      score: game.holes.map(h => h[p.name]).reduce((sum, v) => sum + v, 0),
      name: p.name,
      emoji: p.emoji,
    }))
    .sort((a, b) => a.score - b.score)[0];
  useEffect(() => {
    setTimeout(() => {
      Haptic.trigger('impactLight');
      setTimeout(() => {
        Haptic.trigger('impactLight');
        setTimeout(() => {
          Haptic.trigger('impactMedium');
          setTimeout(() => {
            Haptic.trigger('impactHeavy');
          }, 300);
        }, 100);
      }, 300);
    }, 1000);
  }, []);
  return (
    <ScreenContainer>
      <FlexContainer scroll>
        <Spacer height={30} />
        <Winner score={winner.score} name={winner.name} emoji={winner.emoji} />
        <Spacer height={40} />
        <Results game={game} />
      </FlexContainer>
      <ButtonContainer>
        <Button text="Done" onPress={() => navigation.popToTop()} />
      </ButtonContainer>
    </ScreenContainer>
  );
}

export default SummaryScreen;
