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
        // TODO usercard fetch
        //        token: PropTypes.string.isRequired,
        //        actions: PropTypes.shape({
        //            usercardsFetch: PropTypes.func.isRequired
        //        }).isRequired
    };

    renderGlyph(glyph, score) {
        const classes = `glyphicon glyphicon-${glyph}`;
        const glyphs = [];
        let nbGlyph = 0;
        let grayGlyph = 0;
        let lastHalf = false;
        let i;
        if (score % 2 === 0) {
            nbGlyph = score / 2;
            grayGlyph = 5 - nbGlyph;
        } else {
            nbGlyph = Math.floor(score / 2);
            lastHalf = true;
            grayGlyph = 5 - nbGlyph - 1;
        }
        for (i = 0; i < nbGlyph; i++) {
            glyphs.push(<span key={`glyph-${glyph}-${i}`}
                className={classes}></span>);
        }
        if (lastHalf) {
            glyphs.push(<span key={`glyph-${glyph}-half`}
                className={`${classes} half`}></span>);
            glyphs.push(<span key={`glyph-${glyph}-half-2`}
                className={`${classes} other-half`}></span>);
        }
        for (i = 0; i < grayGlyph; i++) {
            glyphs.push(<span key={`gray-glyph-${glyph}-${i}`}
                className={`${classes} gray`}></span>);
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
                    </div>
                    <div className="col-lg-2">
                        {this.renderGlyph('trash', card.waste_reduction_score)}
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
