/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint import/no-named-default: 0 */

import React from 'react';
import sinon from 'sinon';
import nock from 'nock';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
    default as ProfileViewConnected,
    ProfileViewNotConnected
} from '../../../src/static/containers/Profile';

import * as TYPES from '../../../src/static/constants';
import { SERVER_URL } from '../../../src/static/utils/config';


describe(' Profile View Tests (Container):', () => {
    describe('Implementation:', () => {
        context('Empty state:', () => {
            let wrapper;

            const spies = {
                profileFetch: sinon.spy(),
                profileUpdateField: sinon.spy()
            };
            const props = {
                isFetching: true,
                profile: {},
                token: 'token',
                actions: {
                    profileFetch: spies.profileFetch,
                    profileUpdateField: spies.profileUpdateField
                }
            };

            beforeEach(() => {
                wrapper = shallow(<ProfileViewNotConnected {...props} />);
            });

            it('should render correctly', () => expect(wrapper).to.be.ok);
            it('should have one p', () => {
                expect(wrapper.find('p')).to.have.length(1);
            });
            it('should call actions.profileFetch', () => {
                expect(spies.profileFetch.calledWith('token')).to.equal(true);
            });
        });

        context('State with data:', () => {
            let wrapper;
            const props = {
                isFetching: false,
                profile: {
                    pseudo: 'pipo',
                    email: 'pipo@pipocorp.com',
                    gender: 'M',
                    has_garder: true,
                    do_smoke: false,
                    home_owner: false
                },
                token: 'token',
                actions: {
                    profileFetch: () => null,
                    profileUpdateField: () => null
                }
            };

            beforeEach(() => {
                wrapper = shallow(<ProfileViewNotConnected {...props} />);
            });

            it('should render correctly', () => expect(wrapper).to.be.ok);

            it('should have one b with user pseudo', () => {
                const b = wrapper.find('b');

                expect(b).to.have.length(1);
                expect(b.text()).to.equal('pipo');
            });

            it('should have one div user email',
                () => {
                    const div = wrapper.find('.email');

                    expect(div).to.have.length(1);
                    expect(div.text()).to.equal('pipo@pipocorp.com');
                });
        });
    });

    describe('Store Integration:', () => {
        context('State map:', (done) => {
            nock(SERVER_URL)
                .get('/api/v1/accounts/profile/')
                .reply(200, {
                    data: {
                        pseudo: 'pipo',
                        email: 'pipo@pipocorp.com',
                        gender: 'M',
                        has_garder: true,
                        do_smoke: false,
                        home_owner: false
                    },
                });

            const state = {
                auth: {
                    token: 'token',
                    userName: 'a@a.com',
                    isAuthenticated: true,
                    isAuthenticating: false,
                    statusText: 'You have been successfully logged in.'
                },
                profile: {
                    profile: {},
                    isFetchingProfile: true
                }

            };
            const expectedActions = [
                {
                    type: TYPES.PROFILE_FETCH_REQUEST
                },
                {
                    type: TYPES.PROFILE_RECEIVE,
                    payload: {
                        data: {
                            pseudo: 'pipo',
                            email: 'pipo@pipocorp.com',
                            gender: 'M',
                            has_garder: true,
                            do_smoke: false,
                            home_owner: false
                        },
                    }
                }
            ];

            const middlewares = [thunk];
            const mockStore = configureStore(middlewares);
            const store = mockStore(state, expectedActions, done);

            // Had to pass token as a prop because it normally is passed down from the AuthenticaedComponent.js
            const wrapper = mount(<ProfileViewConnected store={store} token={state.auth.token} />);

            it('props', () => {
                expect(wrapper.node.selector.props.isFetching).to.equal(state.profile.isFetchingProfile);
                expect(wrapper.node.selector.props.profile).to.equal(state.profile.profile);
            });

            it('actions', () => {
                expect(wrapper.node.selector.props.actions.profileFetch).to.not.equal(undefined);
            });

            nock.cleanAll();
        });
    });
});
