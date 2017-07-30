import { expect } from 'chai';
import {
  MODIFIER_DEACTIVATED_SUCCESS,
  LOAD_MODIFIERS_SUCCESS,
} from '../actions/actionTypes';
import reducer from './modifierReducer';

describe('Reducer - Modifier', () => {
  const getInitialState = () => {
    return [];
  };

  const modifiers = [
    {
      modifierID: 3,
      modifierName: 'test',
      modifierPrice: 30.99,
      items: [85],
      lastUpdatedDate: '2017-03-27T17:58:37.11',
      createdDate: '2016-12-12T22:16:55.28',
      lastUpdatedBy: 1,
      createdBy: 1,
      isActive: true,
      companyID: 1,
      facilityID: 0,
    },
    {
      modifierID: 12,
      modifierName: 'Foobar',
      modifierPrice: 79,
      items: [],
      lastUpdatedDate: '2017-04-01T00:43:08.577',
      createdDate: '2017-04-01T00:43:08.577',
      lastUpdatedBy: 1,
      createdBy: 1,
      isActive: true,
      companyID: 1,
      facilityID: 0,
    },
  ];

  it('should retrieve the initial state if the action type is not registered with the reducer', () => {
    const action = {
      type: 'UNKNOWN',
    };

    const expected = getInitialState();
    const actual = reducer(undefined, action); //eslint-disable-line no-undefined

    expect(actual).to.deep.equal(expected);
  });

  it('should hydrate the state with all of the modifiers in the action in addition to the additional checked and disabled properties', () => {
    const action = {
      type: LOAD_MODIFIERS_SUCCESS,
      modifiers,
    };

    const expected = modifiers;
    const actual = reducer(undefined, action); //eslint-disable-line no-undefined

    expect(actual).deep.equals(expected);
  });

  it('should remove the modifier that was passed in as part of the MODIFIER_DEACTIVATED_SUCCESS dispatched action', () => {
    const action = {
      type: MODIFIER_DEACTIVATED_SUCCESS,
      modifier: modifiers[0],
    };

    const expected = 1;
    const actual = reducer(modifiers, action).length;

    expect(actual).equals(expected);
  });
});
