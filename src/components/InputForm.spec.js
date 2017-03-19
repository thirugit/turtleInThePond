import { mount } from 'enzyme';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../reducers/reducer';

const proxyquire = require('proxyquire').noCallThru();

const InputForm = proxyquire('./InputForm', {}).InputForm;

describe('InputForm', () => {
  const spy = sinon.spy();
  const onChangeSpy = sinon.spy();
  const store = createStore(reducer);
  const props = { turtlePosition: 'NORTH',
    xGridCoordinate: 0,
    yGridCoordinate: 0,
    turtleClass: '',
    start: true,
    turtleCommand: ''
  };
  const wrapperForm = mount(
    <Provider store={store}>
      <InputForm {...props} dispatchInputChange={onChangeSpy} dispatchGo={spy} />
    </Provider>);
  it('should render form', () => {
    expect(wrapperForm.find('.input-box').length).to.equal(1);
  });
  it('should execute the user input on button click', () => {
    wrapperForm.find('.go-butn').simulate('click');
    expect(spy.called).to.be.true;
  });
  it('should dispatch input change on user input', () => {
    wrapperForm.find('.input-box').simulate('change');
    expect(spy.called).to.be.true;
  });
});
