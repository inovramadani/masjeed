/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 */

import React from 'react'
import { Helmet } from 'react-helmet'
import { FormattedMessage } from 'react-intl'

import messages from './messages'

export default function NotFound() {
  return (
    <h1>
      <Helmet>
        <title>Not found bos</title>
        <meta
          name="description"
          content="Gak nemu ni"
        />
      </Helmet>
      <FormattedMessage {...messages.header} />
    </h1>
  )
}
