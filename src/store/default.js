import { createSlice } from '@reduxjs/toolkit'
export const slice = createSlice({
  name: 'default',
  initialState: {
    playerList: [],
    loadingStatus: false,
  },
  reducers: {
    AddList: (state,  {payload} ) => {
      state.playerList=[...state.playerList,payload]
    },
    setloadingStatus: (state,  {payload} ) => {
      state.loadingStatus = payload
    }
  },
})

export const { AddList,setloadingStatus} = slice.actions
export default slice.reducer
