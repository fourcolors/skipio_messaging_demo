import { API_TOKEN } from 'react-native-dotenv'
import { BASE_URL } from 'react-native-dotenv'
import URI from 'urijs'


/**********************************************
 * Handle creating a easily usable uri. I'm
 * setting up for pagination but not implementing
 * it.
 * *******************************************/

const uri = (resource, defaultParams = {token: API_TOKEN}) => {
  const uri = new URI(BASE_URL)
  return uri.segment(resource).addQuery(defaultParams)
}

/*********************************************
 * Handle response errors and success
 * ******************************************/

const status = async (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response.json()
  } else {
    const error = await response.json()
    throw Error(error.message)
  }
}
/*********************************************
 * Handle generation of URI specifics
 * ******************************************/

const contactsUri = () => {
  const contactsUri = uri('contacts')
  return contactsUri.toString()
}

const messagesUri = (contact) => {
  // I should find a better solution but this works for now.
  const messagesUri = uri(['api', 'v1', 'contacts', `${contact.id}`, 'messages'])
  return messagesUri.toString()
}

/********************************************
 * Handle fetches
 * *****************************************/

export const getContacts = () => {
  return fetch(contactsUri(),
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(status)
}

export const getMessages = (contact) => {
  return fetch(messagesUri(contact),
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(status)
}

export const sendMessage = (recipients, message) => {
  const params = {
    recipients: recipients,
    message: {
      body: message
    }
  }

  return fetch(uri('messages').toString(),
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })
    .then(status)
}
 
