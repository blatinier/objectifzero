import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { push } from 'react-router-redux';
import t from 'tcomb-form';
import PropTypes from 'prop-types';

import * as actionCreators from '../../actions/auth';

const Form = t.form.Form;

const Register = t.struct({
    email: t.String,
    password: t.String,
    password_confirmation: t.String
});

const RegisterFormOptions = {
    auto: 'placeholders',
    fields: {
        password: {
            type: 'password'
        },
        password_confirmation: {
            type: 'password'
        }
    }
};

class RegisterView extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool.isRequired,
        isAuthenticating: PropTypes.bool.isRequired,
        statusText: PropTypes.string,
        actions: PropTypes.shape({
            authRegisterUser: PropTypes.func.isRequired,
            authRegisterError: PropTypes.func.isRequired
        }).isRequired
    };

    static defaultProps = {
        statusText: ''
    };

    constructor(props) {
        super(props);

        this.state = {
            formValues: {
                email: '',
                password: '',
                password_confirmation: ''
            }
        };
    }

    componentWillMount() {
        if (this.props.isAuthenticated) {
            this.props.dispatch(push('/'));
        }
    }

    onFormChange = (value) => {
        this.setState({ formValues: value });
    };

    register = (e) => {
        e.preventDefault();

        const value = this.registerForm.getValue();
        if (value) {
            if (value.password === value.password_confirmation) {
                this.props.actions.authRegisterUser(value.email, value.password);
            } else {
                this.props.actions.authRegisterError('Erreur de saisie',
                    'Les deux mots de passe saisis ne correspondent pas.');
            }
        }
    };

    render() {
        let statusText = null;
        if (this.props.statusText) {
            const statusTextClassNames = classNames({
                'alert': true,
                'alert-danger': this.props.statusText.indexOf('Authentication Error') === 0,
                'alert-success': this.props.statusText.indexOf('Authentication Error') !== 0
            });

            statusText = (
                <div className="row">
                    <div className="col-sm-12">
                        <div className={statusTextClassNames}>
                            {this.props.statusText}
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="container login">
                <h1 className="text-center">S&#39;inscrire</h1>
                <div className="login-container margin-top-medium">
                    {statusText}
                    <form id="register_form" onSubmit={this.register}>
                        <Form ref={(ref) => { this.registerForm = ref; }}
                            type={Register}
                            options={RegisterFormOptions}
                            value={this.state.formValues}
                            onChange={this.onFormChange}
                        />
                        <button disabled={this.props.isAuthenticating}
                            type="submit"
                            className="btn btn-default btn-block"
                        >
                            S&#39;inscrire !
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isAuthenticating: state.auth.isAuthenticating,
        statusText: state.auth.statusText
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterView);
export { RegisterView as RegisterViewNotConnected };
