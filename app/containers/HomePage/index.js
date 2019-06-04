/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { request } from 'graphql-request'
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Helmet } from 'react-helmet';

import { changeLocale } from 'containers/LanguageProvider/actions'

import messages from './messages';

function HomePage(props) {
  const [books, setBooks] = useState([])

  useEffect(() => {
    const query = `{
      books {
        title,
        author
      }
    }`

    // graphql api request example using axios and graphql-request
    axios.post('/graphql', { query })
      .then(res => {
        setBooks(res.data.data.books)
      })
    // const test = async () => {
    //   const response = await request('https://masjeed.herokuapp.com/graphql', query)
    //   setBooks(response.books)
    // }

    // test()
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
    {
      books.map(book => (
        <>
        <p>{book.title}</p>
        <p>{book.author}</p>
        </>
      ))
    }
    </div>
  );
}

const stateToProps = state => ({
  locale: state.language.locale
})

const dispatchToProps = {
  onLocaleChange: event => {
    console.log('I am changed')
    return changeLocale(event.target.value)
  }
}

export default connect(stateToProps, dispatchToProps)(HomePage)