import { useState, useCallback } from 'react';
// useState 컴포넌트는 두 개의 item으로 구성된 array를 리턴한다. [value, setValue]
import { TETROMINOS, randomTetromino } from '../tetrominos';
import { STAGE_WIDTH, checkCollision } from '../gameHelpers';

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOS[0].shape,
    collided: false //
  }); // 비구조화 할당. 그리고 initialize 해줬다.
  /**
   * const playerState = useState();
   * const player = playerState[0];
   * const setPlayer = playerState[1];
   * useState 훅을 사용한 7번 라인은 위의 세 라인과 같다
   */

  const rotate = (matrix, dir) => {
    // Make rows to become cols (transpose)
    const rotatedTetro = matrix.map((_, index) =>
      matrix.map(col => col[index])
    );

    // Reverse each row to get a rotated matrix
    if (dir > 0) {
      return rotatedTetro.map(row => row.reverse());
    }
    return rotatedTetro.reverse();
  };

  const playerRotate = (stage, dir) => {
    const clonedPlayer = JSON.parse(JSON.stringify(player));
    clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);

    const pos = clonedPlayer.pos.x;
    let offset = 1;
    while (checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
      clonedPlayer.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));

      if (offset > clonedPlayer.tetromino[0].length) {
        rotate(clonedPlayer.tetromino, -dir);
        clonedPlayer.pos.x = pos;
        return;
      }
    }

    setPlayer(clonedPlayer);
  };

  const updatePlayerPos = ({ x, y, collided }) => {
    setPlayer(prev => ({
      ...prev, // copy previous states
      pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
      collided
    }));
  };

  // useCallBack 훅을 사용한 이유는 infinite loop에 빠지는 것을 방지하기 위해
  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetromino: randomTetromino().shape,
      collided: false
    });
  }, []); // 두 번째 패러미터가 dependency list인데 이전의 값과 비교해서 다르면 첫 번째 함수를 호출한다.

  return [player, updatePlayerPos, resetPlayer, playerRotate];
};
