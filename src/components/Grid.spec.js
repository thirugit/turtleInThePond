import { mount } from 'enzyme';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../reducers/reducer';

const proxyquire = require('proxyquire').noCallThru();

const Grid = proxyquire('./Grid', {}).Grid;

describe('Grid', () => {
  const spy = sinon.spy();
  const store = createStore(reducer);
  const props = { turtlePosition: 'NORTH',
    xGridCoordinate: 0,
    yGridCoordinate: 0,
    turtleClass: '',
    start: true,
    turtleCommand: ''
  };
  const wrapperForm = mount(<Provider store={store}><Grid {...props} dispatchPlace={spy} /></Provider>);
  it('should render grid', () => {
    expect(wrapperForm.find('.square').length).to.equal(25);
  });
  it('should call place the turtle on click of a square', () => {
    wrapperForm.find('.square').last().simulate('click');
    expect(spy.called).to.be.true;
  });
});
