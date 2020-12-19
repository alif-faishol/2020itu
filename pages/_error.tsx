import PropTypes from 'prop-types';
import { ReactElement } from 'react';
import i18n from '@utils/i18n';

const Error = ({ statusCode, t }): ReactElement => (
  <p>{statusCode ? t('error-with-status', { statusCode }) : t('error-without-status')}</p>
);

Error.getInitialProps = async ({ res, err }) => {
  let statusCode = null;
  if (res) {
    ({ statusCode } = res);
  } else if (err) {
    ({ statusCode } = err);
  }
  return {
    namespacesRequired: ['common'],
    statusCode,
  };
};

Error.defaultProps = {
  statusCode: null,
};

Error.propTypes = {
  statusCode: PropTypes.number,
  t: PropTypes.func.isRequired,
};

export default i18n.withTranslation('common')(Error);
