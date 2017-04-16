import { API_TOKEN } from 'react-native-dotenv'
import { BASE_URL } from 'react-native-dotenv'
import URI from 'urijs'


/**********************************************
 * Handle creating a easily usable uri. Not
 * implementing pagination but if I was, I would 
 * allow for a "default" param attached to the uri
 * that would represent the page/per_page options.
 * *******************************************/

const uri = (resource, defaultParams = {token: API_TOKEN, page: 1, per: 100}) => {
  const uri = new URI(BASE_URL)
  return uri.segment(resource).addQuery(defaultParams)
}

export const getContats () => {
  const contactsUri = uri('contacts')
  return contactsUri.toString()
}
