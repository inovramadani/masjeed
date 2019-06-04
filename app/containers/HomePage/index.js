/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useEffect } from 'react';
import axios from 'axios'
import { request } from 'graphql-request'
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Helmet } from 'react-helmet';

import { changeLocale } from 'containers/LanguageProvider/actions'

import messages from './messages';

function HomePage(props) {
  useEffect(() => {
    const query = `{
      books {
        title,
        author
      }
    }`

    // graphql api request example using axios and graphql-request
    // axios.post('/graphql', { query })
    //   .then(res => console.log('res = ', res))
    request('https://masjeed.herokuapp.com/graphql', query)
      .then(res => console.log('res = ', res))
  }, [])

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