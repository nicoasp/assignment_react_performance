import {connect} from 'react-redux';

import Slider from '../components/Slider';
import {selectDate} from '../actions';

const mapStateToProps = state => {
  return {
    selectedDate: Number(state.selectedDate)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectDate: (date) => {
    	dispatch(selectDate(date));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Slider);
