import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import personReducer from '../features/person/personSlice'
import entidadReducer from '../features/entidad/entidadSlice'
import pucCoopReducer from '../features/pucCoop/pucCoopSlice'
import pucSupReducer from '../features/pucSup/pucSupSlice'
import userReducer from '../features/user/userSlice'
import activeReducer from '../features/activos/activosSlice'

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false
})

export default configureStore({
  reducer: {
    person: personReducer,
    entidad: entidadReducer,
    pucCoop: pucCoopReducer,
    pucSup: pucSupReducer,
    user: userReducer,
    active: activeReducer
  },
  middleware: customizedMiddleware, 
})