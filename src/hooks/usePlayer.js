import { useState } from 'react';
// useState 컴포넌트는 두 개의 item으로 구성된 array를 리턴한다. [value, setValue]
import { randomTetromino } from '../tetrominos';

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: randomTetromino().shape,
    collided: false //
  }); // 비구조화 할당. 그리고 initialize 해줬다.
  /**
   * const playerState = useState();
   * const player = playerState[0];
   * const setPlayer = playerState[1];
   * useState 훅을 사용한 7번 라인은 위의 세 라인과 같다
   */

  return [player];
};
