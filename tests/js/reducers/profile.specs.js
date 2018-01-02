/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

import { expect } from 'chai';
import profileReducer from '../../../src/static/reducers/profile';
import * as TYPES from '../../../src/static/constants';

describe('Profile Reducers Tests', () => {
    it('should handle PROFILE_RECEIVE', () => {
        const reducerResponse = profileReducer([], {
            type: TYPES.PROFILE_RECEIVE,
            payload: {
                data: {
                    pseudo: 'pipo',
                    email: 'pipo@pipocorp.com',
                    gender: 'M',
                    has_garder: true,
                    do_smoke: false,
                    home_owner: false
                }
            }
        });
        expect(reducerResponse).to.eql({
            profile: {
                pseudo: 'pipo',
                email: 'pipo@pipocorp.com',
                gender: 'M',
                has_garder: true,
                do_smoke: false,
                home_owner: false
            },
            isFetchingProfile: false
        });
    });

    it('should handle PROFILE_FETCH_REQUEST', () => {
        const reducerResponse = profileReducer([], {
            type: TYPES.PROFILE_FETCH_REQUEST
        });
        expect(reducerResponse).to.eql({
            isFetchingProfile: true
        });
    });
});
