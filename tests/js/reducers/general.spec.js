/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

import { expect } from 'chai';
import reducer from '../../../src/static/reducers/profile';

describe('General Reducers Tests', () => {
    it('the state should be the same when a actions doesnt exist and output a console warning', () => {
        const reducerResponse = reducer(
            {
                profile: {},
                isFetchingProfile: false
            },
            {
                type: 'nonexistent action'
            }
        );

        expect(reducerResponse).to.eql({
            profile: {},
            isFetchingProfile: false
        });
    });

    it('the state should be the initial state when no state are present', () => {
        const initialState = {
            profile: {},
            isFetchingProfile: false
        };
        const reducerResponse = reducer(undefined, { type: 'nonexistent action' });

        expect(reducerResponse).to.eql(initialState);
    });
});
