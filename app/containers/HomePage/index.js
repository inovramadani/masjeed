/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Helmet } from 'react-helmet';

import { changeLocale } from 'containers/LanguageProvider/actions'

import messages from './messages';

function HomePage(props) {
  return (
    <div>
    <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="Home page of Masjeed"
        />
      </Helmet>
    <h1>
      <FormattedMessage {...messages.header} />
    </h1>
    <select value={props.locale} onChange={props.onLocaleChange}>
      <option value="id">id</option>
      <option value="en">en</option>
      <option value="ar">ar</option>
    </select>
    </div>
  );
}

const stateToProps = state => ({
  locale: state.language.locale
})

const dispatchToProps = {
  onLocaleChange: event => changeLocale(event.target.value)
}

export default connect(stateToProps, dispatchToProps)(HomePage)