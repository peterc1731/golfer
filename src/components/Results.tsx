import React from 'react';
import {StyleSheet} from 'react-native';
import {Game} from '../state/game';
import {Table, Row, Rows} from 'react-native-table-component';

interface Props {
  game: Game;
}

function Results({game}: Props) {
  const parTotal = game.holes.map(h => h.PAR).reduce((sum, v) => sum + v, 0);
  return (
    <Table style={styles.table}>
      <Row
        data={['Hole', 'Par', ...game.players.map(p => p.name)]}
        style={styles.head}
        textStyle={styles.text}
      />
      <Rows
        data={game.holes.map((h, i) => [
          i + 1,
          h.PAR,
          ...game.players.map(p => h[p.name]),
        ])}
        textStyle={styles.text}
        style={styles.row}
      />
      <Row
        data={[
          '',
          parTotal,
          ...game.players.map(p => {
            const total = game.holes
              .map(h => h[p.name])
              .reduce((sum, v) => sum + v, 0);
            const diff = total - parTotal;
            return `${total} (${diff < 0 ? '-' : '+'}${Math.abs(diff)})`;
          }),
        ]}
        style={styles.total}
        textStyle={[styles.text, styles.highlight]}
      />
    </Table>
  );
}

const styles = StyleSheet.create({
  table: {
    marginHorizontal: 30,
  },
  head: {marginBottom: 8},
  text: {
    fontFamily: 'SFProRounded-Heavy',
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: 'rgba(60, 60, 67, 0.6)',
    textAlign: 'left',
  },
  row: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#C6C6C8',
    paddingVertical: 10,
  },
  total: {
    paddingVertical: 10,
  },
  highlight: {
    color: 'black',
  },
});

export default Results;
