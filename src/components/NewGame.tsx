import React, {createRef, useEffect, useRef} from 'react';
import {Keyboard, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {useRecoilState, useSetRecoilState} from 'recoil';
import Button from '../components/Button';
import Input from '../components/Input';
import {randomEmoji} from '../lib/emoji';
import {currentGameState} from '../state/game';
import {overlayHeightState} from '../state/overlay';
import Center from './Center';
import DashedLine from './DashedLine';
import EmojiWrapper from './EmojiWrapper';
import Spacer from './Spacer';

interface Props {
  onNext: () => void;
  shown: boolean;
}

function NewGame({onNext, shown}: Props) {
  const [game, setGame] = useRecoilState(currentGameState);
  const setOverlayHeight = useSetRecoilState(overlayHeightState);
  const titleRef = useRef<TextInput>(null);
  const locationRef = useRef<TextInput>(null);
  const playerRefs = useRef(game.players.map(() => createRef<TextInput>()));
  const isValid =
    game.title &&
    game.location &&
    (game.players.length > 1
      ? game.players.every((p, i, a) =>
          i === a.length - 1 ? !p.name : p.name,
        ) ||
        (game.players.length === 4 && game.players.every(p => p.name))
      : game.players[0]);
  useEffect(() => {
    if (shown) {
      titleRef.current?.focus();
    }
    if (!shown) {
      Keyboard.dismiss();
    }
  }, [shown]);
  useEffect(() => {
    setOverlayHeight(55 * game.players.length - 1);
  }, [game.players, setOverlayHeight]);
  return (
    <View>
      <Input
        value={game.title}
        onChange={t => setGame(g => ({...g, title: t}))}
        placeholder="TITLE"
        ref={titleRef}
        returnKeyType="next"
        onSubmit={() => locationRef.current?.focus()}
      />
      <Spacer height={25} />
      <Input
        value={game.location}
        onChange={t => setGame(g => ({...g, location: t}))}
        placeholder="LOCATION"
        ref={locationRef}
        returnKeyType="next"
        onSubmit={() => playerRefs.current[0].current?.focus()}
      />
      <Spacer height={25} />
      <DashedLine />
      {game.players.map((p, i) => (
        <React.Fragment key={`player-${i}`}>
          <Spacer height={25} />
          <EmojiWrapper
            onPress={() =>
              setGame(g => {
                const players = [...g.players];
                players[i] = {
                  ...players[i],
                  emoji: randomEmoji(players.map(x => x.emoji)),
                };
                return {...g, players};
              })
            }
            emoji={p.emoji}>
            <Input
              value={p.name}
              onChange={t =>
                setGame(g => {
                  const players = [...g.players];
                  players[i] = {...players[i], name: t};
                  if (i + 1 === players.length && t && players.length < 4) {
                    players.push({
                      name: '',
                      emoji: randomEmoji(players.map(x => x.emoji)),
                    });
                    playerRefs.current.push(createRef<TextInput>());
                  }
                  if (i + 2 === players.length && !t) {
                    players.pop();
                    playerRefs.current.pop();
                  }
                  return {...g, players};
                })
              }
              placeholder={`PLAYER ${i + 1}`}
              returnKeyType="next"
              ref={playerRefs.current[i]}
              onSubmit={() => playerRefs.current[i + 1].current?.focus()}
            />
          </EmojiWrapper>
        </React.Fragment>
      ))}
      <Spacer height={40} />
      <Center>
        <Button
          text="Start Game"
          type="secondary"
          onPress={() => {
            setGame(g => {
              const players = [...g.players];
              return {
                ...g,
                players: players.filter(p => p.name),
                started: true,
              };
            });
            onNext();
          }}
          disabled={!isValid}
        />
      </Center>
    </View>
  );
}

export default NewGame;
