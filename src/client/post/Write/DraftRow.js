import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { FormattedMessage, FormattedRelative } from 'react-intl';
import { Link } from 'react-router-dom';
import DeleteDraftModal from './DeleteDraftModal';
import './DraftRow.less';

class DraftRow extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    data: PropTypes.shape().isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      showModalDelete: false,
    };

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal() {
    this.setState({ showModalDelete: true });
  }

  hideModal() {
    this.setState({ showModalDelete: false });
  }

  render() {
    const { id, data } = this.props;
    const { lastUpdated } = data;
    const hasLastUpdated = !_.isUndefined(lastUpdated);
    let { title = '', body = '' } = data;
    title = title.trim();
    body = body.replace(/\r?\n|\r|[\u200B-\u200D\uFEFF]/g, ' ').substring(0, 50);
    let draftTitle = title.length ? title : body;
    draftTitle = draftTitle.trim();

    return (
      <div
        className="DraftRow"
        onMouseEnter={this.handleDisplayDelete}
        onMouseLeave={this.handleHideDelete}
      >
        <div className="DraftRow__contents">
          <div>
            <Link to={{ pathname: '/editor', search: `?draft=${id}` }}>
              <h3>
                {draftTitle.length === 0
                  ? <FormattedMessage id="draft_untitled" defaultMessage="Untitled draft" />
                  : draftTitle}
              </h3>
            </Link>
            <span className="DraftRow__date">
              {hasLastUpdated &&
                <span>
                  <FormattedMessage id="last_updated" defaultMessage="Last updated" />
                  {' '}
                  <FormattedRelative value={new Date(lastUpdated)} />
                </span>}
            </span>
          </div>
          <a role="presentation" onClick={this.showModal} className="DraftRow__delete">
            <i className="iconfont icon-trash DraftRow__delete__icon" />
            <FormattedMessage id="delete" defaultMessage="Delete" />
          </a>
        </div>
        {this.state.showModalDelete &&
          <DeleteDraftModal draftId={this.props.id} onCancel={this.hideModal} />}
      </div>
    );
  }
}

export default DraftRow;
