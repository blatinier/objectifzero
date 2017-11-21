import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import './style.scss';

import * as actionCreators from '../../actions/cards';

class ShortCardView extends React.Component {
    static propTypes = {
        card: PropTypes.shape({
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            waste_reduction: PropTypes.number.isRequired,
            waste_reduction_score: PropTypes.number.isRequired,
            difficulty_score: PropTypes.number.isRequired,
            cost_score: PropTypes.number.isRequired,
        }).isRequired,
//TODO usercard fetch
//        token: PropTypes.string.isRequired,
//        actions: PropTypes.shape({
//            usercardsFetch: PropTypes.func.isRequired
//        }).isRequired
    };

    renderGlyph(glyph, score) {
        const classes = "glyphicon glyphicon-" + glyph;
        var nb_glyph = 0;
        var last_half = false;
        var glyphs = array();
        if (score % 2 == 0) {
            nb_glyph = score / 2;
        } else {
            nb_glyph = score / 2;
            last_half = true;
        }
        for (var i = 0; i < nb_glyph; i++) {
            glyphs.push(<span key={"glyph-" + glyph + "-" + i}
                className={classes}></span>);
        }
        if (last_half) {
            glyphs.push(<span key={"glyph-" + glyph + "-last"}
                className={classes + " half"}></span>);
        }
        return (
            <div className="scoreGlyph">
                {glyphs}
            </div>
        );
    }

    render() {
        const { card } = this.props;
        return (
            <div className="panel panel-default card">
                <div className="panel-body">
                    <div className="col-lg-10">
                        <h2>{card.title}</h2>
                        <p>{card.description}</p>
                        <em>Sources: {card.sources}</em>
                    </div>
                    <div className="col-lg-2">
                        {this.renderGlyph("trash", card.waste_reduction_score)}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShortCardView);
export { ShortCardView as ShortCardViewNotConnected };