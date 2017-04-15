import { createRouter } from '@expo/ex-navigation'
import AddressBook from '../screens/address_book'
import Messages from '../screens/messages'

export const Router = createRouter (() => ({
  addressBook: () => AddressBook,
  messages: () => Messages,
}))
