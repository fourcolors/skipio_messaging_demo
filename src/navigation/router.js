import { createRouter } from '@expo/ex-navigation'
import AddressBook from '../screens/address_book'

export const Router = createRouter (() => ({
  addressBook: () => AddressBook,
}))
