import { createStore } from 'vuex'
import PassengerStore from './test'

export default createStore({
  modules: {
    user: PassengerStore
  }
})
