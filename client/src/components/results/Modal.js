import Modali, { useModali } from 'modali';
import React from 'react'
import {connect} from 'react-redux'
import {retrieveCards} from '../../actions/card'



const Modal = ({cards}, props) => {
  const [exampleModal, toggleExampleModal] = useModali();
  {props.cards && (props.cards.map(card => {
    console.log(card)
    return (
      <div className="app">
        <button onClick={retrieveCards}>
          Click
        </button>
        <Modali.Modal {...exampleModal}>
          {card.containerTitle}
        </Modali.Modal>
      </div>
    );
  }))}
};

const mapStateToProps = (state) => ({
	cards: state.card.cards,
});

export default connect(mapStateToProps, {retrieveCards})(Modal);