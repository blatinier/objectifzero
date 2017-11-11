import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

class Switch extends React.Component {
    static propTypes = {
        isOn: PropTypes.bool.isRequired,
        action: PropTypes.func.isRequired,
        className: PropTypes.string
    };

    switch_to_yes = () => {
        this.switch_to(true);
    }

    switch_to_no = () => {
        this.switch_to(false);
    }

    switch_to = (val) => {
        if (this.props.isOn !== val) {
            this.props.action(val);
        }
    }

    render() {
        var yes_classes = "label label-default";
        var no_classes = "label label-success";
        if (this.props.isOn === true) {
            yes_classes = "label label-success";
            no_classes = "label label-default";
        }
        return (
            <div className={this.props.className}>
              <div className="col-lg-6">
                <span className={yes_classes}
                      onClick={this.switch_to_yes}>Oui</span>
              </div>
              <div className="col-lg-6">
                <span className={no_classes}
                      onClick={this.switch_to_no}>Non</span>
              </div>
            </div>
        );
    }
}

export default Switch;
export { Switch as SwitchNotConnected };
