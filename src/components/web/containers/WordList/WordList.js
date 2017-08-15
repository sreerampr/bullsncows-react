import React from 'react';
import { connect } from 'react-redux';
import { SingleWord } from '../../presentational/SingleWord/SingleWord';
import { Points } from '../../presentational/Points/Points';
import { resetWords } from '../../../../actions/words/wordsActions';
import { updatePoints } from '../../../../actions/points/pointsActions';
import { addNewWord } from '../../../../actions/theWord/theWordActions';
import { addLastWord } from '../../../../actions/lastword/lastwordActions';
import { getUsers } from '../../../../actions/users/usersActions';

import Styles from './WordList.less';

const WordList = ({ words, theWord, resetWords, userId, points, lastword, displayName }) => {
  return (
    <div className={Styles.WordList + ' col-xs-12'}>
      <div><h6 className={Styles.center + ' ' + Styles.bold}> Your Guesses </h6></div>
      {words.length === 0 && "Start with a random guess. Try 'abcd'."}
      {words.map((word) =>
        <div key={word.id} className={Styles.wordPoints}>
          <div className='col-xs-6'>
            <SingleWord
              word={word.word} />
          </div>
          <div className='col-xs-6'>
            <Points
              word={word.word}
              theWord={theWord}
              length={words.length}
              resetWords={resetWords}
              userId={userId}
              points={points}
              lastword={lastword}
              displayName={displayName}/>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    words: state.words.sort((a, b) => b.id - a.id),
    theWord: state.theWord,
    userId: state.user.uid,
    points: state.points,
    lastword: state.lastword,
    displayName: state.user.displayName
  };
};

const mapDispatchToProps = (dispatch) => ({
  resetWords: (num, userId, lastword, word, displayName) => {
    dispatch(resetWords());
    dispatch(updatePoints(num, userId, [...lastword, word], displayName));
    dispatch(addNewWord());
    dispatch(addLastWord(word));
    if( (lastword.length+1) % 5 === 0 ) {
      FB.ui({
        method: 'share',
        display: 'popup',
        href: 'https://bullsncows-3d0f8.firebaseapp.com/',
        quote: 'My score after solving ' + (lastword.length+1) +' words: ' + num,
        picture: 'https://bullsncows-3d0f8.firebaseapp.com/889bff3b5c52e2d4e3010b5b853c7b2f.png',
        redirect_uri: 'https://bullsncows-3d0f8.firebaseapp.com/'
      }, function(response){});
    }
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WordList);
