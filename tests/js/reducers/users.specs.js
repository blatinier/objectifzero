/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

import { expect } from 'chai';
import usersReducer from '../../../src/static/reducers/users';
import * as TYPES from '../../../src/static/constants';

describe('Users Reducers Tests', () => {
    it('should handle USERS_RECEIVE', () => {
        const reducerResponse = usersReducer([], {
            type: TYPES.USERS_RECEIVE,
            payload: {
                results: [
                    {
                        pseudo: 'pipo 1',
                        email: 'pipo@pipocorp.com',
                        gender: 'M',
                        has_garder: true,
                        do_smoke: false,
                        home_owner: false
                    },
                    {
                        pseudo: 'pipo 2',
                        email: 'pipo@pipocorp.com',
                        gender: 'M',
                        has_garder: true,
                        do_smoke: false,
                        home_owner: false
                    }
                ]
            }
        });
        expect(reducerResponse).to.eql({
            users: [
                {
                    pseudo: 'pipo 1',
                    email: 'pipo@pipocorp.com',
                    gender: 'M',
                    has_garder: true,
                    do_smoke: false,
                    home_owner: false
                },
                {
                    pseudo: 'pipo 2',
                    email: 'pipo@pipocorp.com',
                    gender: 'M',
                    has_garder: true,
                    do_smoke: false,
                    home_owner: false
                }
            ],
            isFetchingUsers: false
        });
    });

    it('should handle USERS_FETCH_REQUEST', () => {
        const reducerResponse = usersReducer([], {
            type: TYPES.USERS_FETCH_REQUEST
        });
        expect(reducerResponse).to.eql({
            isFetchingUsers: true
        });
    });
});
