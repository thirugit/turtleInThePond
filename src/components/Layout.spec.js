import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../reducers/reducer';
import Grid from './Grid';
import InputForm from './InputForm';

const proxyquire = require('proxyquire').noCallThru();

const Layout = proxyquire('./Layout', {
  './Grid': Grid,
  './InputForm': InputForm
}).default;

describe('Layout', () => {
  const spy = sinon.spy();
  const store = createStore(reducer);
  const props = { turtlePosition: 'NORTH',
    xGridCoordinate: 0,
    yGridCoordinate: 0,
    turtleClass: '',
    start: false,
    turtleCommand: '',
    dispatchMoveLeft: sinon.stub
  };
  const wrapperForm = mount(<Provider store={store}><Layout {...props} onKeyDown={spy} /></Provider>);
  it('should render layout', () => {
    expect(wrapperForm.find('.pond-grid').length).to.equal(1);
  });
  // it('should call dispatch action on keydown', () => {
  //   wrapperForm.find('.pond-grid').simulate('keyDown', { key: 'ArrowLeft', keyCode: 37, which: 37 });
  //   console.log(wrapperForm.html())
  //   expect(spy.called).to.be.true;
  // });
});
