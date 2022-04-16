import React, {Suspense, useState} from 'react';
import {useSetRecoilState} from 'recoil';
import Button from '../components/Button';
import ButtonContainer from '../components/ButtonContainer';
import FlexContainer from '../components/FlexContainer';
import GameList from '../components/GameList';
import Loader from '../components/Loader';
import NewGame from '../components/NewGame';
import Overlay from '../components/Overlay';
import ScreenContainer from '../components/ScreenContainer';
import {currentGameState, defaultGame} from '../state/game';
import {Navigation} from '../state/navigation';

interface Props {
  navigation: Navigation;
}

function GameScreen({navigation}: Props) {
  const setGame = useSetRecoilState(currentGameState);
  const [overlayOpen, setOverlayOpen] = useState(false);
  return (
    <ScreenContainer>
      <FlexContainer>
        <Suspense fallback={<Loader />}>
          <GameList
            onSelect={g => {
              setGame(g);
              if (g.complete) {
                navigation.navigate('Summary');
              } else if (g.started) {
                navigation.navigate('Hole');
              } else {
                setOverlayOpen(true);
              }
            }}
          />
        </Suspense>
      </FlexContainer>
      <ButtonContainer>
        <Button
          text="New Game"
          type="secondary"
          onPress={() => {
            setGame(defaultGame());
            setOverlayOpen(true);
          }}
        />
      </ButtonContainer>
      <Overlay open={overlayOpen} onClose={() => setOverlayOpen(false)}>
        <Suspense fallback={<Loader />}>
          <NewGame
            onNext={() => {
              setOverlayOpen(false);
              setTimeout(() => navigation.navigate('Hole'), 100);
            }}
            shown={overlayOpen}
          />
        </Suspense>
      </Overlay>
    </ScreenContainer>
  );
}

export default GameScreen;
