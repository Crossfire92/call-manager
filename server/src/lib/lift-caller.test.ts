import LiftCaller from './lift-caller';
import {expect} from 'chai';
import useInTest from '../../test-helpers/test-server';


describe('initial connection', function() {
  new useInTest();

  /*
  it('responde with goodbye', async function() {
    LiftCaller.getInstance().submitCall("Test").then(result => expect(result).to.equal("goodbye\n"));
  })
  */
});