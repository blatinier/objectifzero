import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

class Switch extends React.Component {
    static propTypes = {
        isOn: PropTypes.bool.isRequired,
        action: PropTypes.func.isRequired
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
            <div>
                <span className={yes_classes}
                      onClick={this.switch_to_yes}>Oui</span>
                <span className={no_classes}
                      onClick={this.switch_to_no}>Non</span>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isOn: false,
    };
};

export default connect(mapStateToProps)(Switch);
export { Switch as SwitchNotConnected };
