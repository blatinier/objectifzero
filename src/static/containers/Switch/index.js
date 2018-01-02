import React from 'react';
import PropTypes from 'prop-types';

class Switch extends React.Component {
    static propTypes = {
        isOn: PropTypes.bool.isRequired,
        action: PropTypes.func.isRequired,
        className: PropTypes.string,
    };

    static defaultProps = {
        className: '',
        isOn: false
    };

    switchToYes = () => {
        this.switchTo(true);
    }

    switchToNo = () => {
        this.switchTo(false);
    }

    switchTo = (val) => {
        if (this.props.isOn !== val) {
            this.props.action(val);
        }
    }

    render() {
        let yesClasses = 'label label-default';
        let noClasses = 'label label-success';
        if (this.props.isOn === true) {
            yesClasses = 'label label-success';
            noClasses = 'label label-default';
        }
        return (
            <div className={this.props.className}>
                <div className="col-lg-6">
                    <span className={yesClasses} onClick={this.switchToYes}>
                        Oui
                    </span>
                </div>
                <div className="col-lg-6">
                    <span className={noClasses} onClick={this.switchToNo}>
                        Non
                    </span>
                </div>
            </div>
        );
    }
}

export default Switch;
