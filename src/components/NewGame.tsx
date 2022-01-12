import React, {createRef, useEffect, useRef, useState} from 'react';
import {Keyboard, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {useRecoilState, useSetRecoilState} from 'recoil';
import Button from '../components/Button';
import Input from '../components/Input';
import {randomEmoji} from '../lib/emoji';
import {currentGameState, Game} from '../state/game';
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
  const [title, setTitle] = useState(game.title);
  const [location, setLocation] = useState(game.location);
  const [players, setPlayers] = useState<Game['players']>(game.players);
  const setOverlayHeight = useSetRecoilState(overlayHeightState);
  const titleRef = useRef<TextInput>(null);
  const locationRef = useRef<TextInput>(null);
  const playerRefs = useRef(game.players.map(() => createRef<TextInput>()));
  const isValid =
    title &&
    location &&
    (players.length > 1
      ? players.every((p, i, a) => (i === a.length - 1 ? !p.name : p.name)) ||
        (players.length === 4 && players.every(p => p.name))
      : players[0]);
  useEffect(() => {
    if (shown) {
      titleRef.current?.focus();
    }
    if (!shown) {
      Keyboard.dismiss();
    }
  }, [shown]);
  useEffect(() => {
    setOverlayHeight(55 * players.length - 1);
  }, [players, setOverlayHeight]);
  return (
    <View>
      <Input
        value={title}
        onChange={t => setTitle(t)}
        placeholder="TITLE"
        ref={titleRef}
        returnKeyType="next"
        onSubmit={() => locationRef.current?.focus()}
      />
      <Spacer height={25} />
      <Input
        value={location}
        onChange={t => setLocation(t)}
        placeholder="LOCATION"
        ref={locationRef}
        returnKeyType="next"
        onSubmit={() => playerRefs.current[0].current?.focus()}
      />
      <Spacer height={25} />
      <DashedLine />
      {players.map((p, i) => (
        <React.Fragment key={`player-${i}`}>
          <Spacer height={25} />
          <EmojiWrapper
            onPress={() =>
              setPlayers(x => {
                const ps = [...x];
                ps[i] = {
                  ...ps[i],
                  emoji: randomEmoji(players.map(y => y.emoji)),
                };
                return ps;
              })
            }
            emoji={p.emoji}>
            <Input
              value={p.name}
              onChange={t =>
                setPlayers(x => {
                  const ps = [...x];
                  ps[i] = {...ps[i], name: t};
                  if (i + 1 === ps.length && t && ps.length < 4) {
                    ps.push({
                      name: '',
                      emoji: randomEmoji(ps.map(y => y.emoji)),
                    });
                    playerRefs.current.push(createRef<TextInput>());
                  }
                  if (i + 2 === ps.length && !t) {
                    ps.pop();
                    playerRefs.current.pop();
                  }
                  return ps;
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
            setGame(g => ({
              ...g,
              title,
              location,
              players: players.filter(p => p.name),
              started: true,
            }));
            onNext();
          }}
          disabled={!isValid}
        />
      </Center>
    </View>
  );
}

export default NewGame;
