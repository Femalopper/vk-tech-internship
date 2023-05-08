import { createSlice, current } from '@reduxjs/toolkit';

export const formSlice = createSlice({
  name: 'form',
  initialState: {
    chooseNegotiationRoomForm: {
      status: "unfilled",
      tower: {
        value: null,
        status: "unfilled",
      },
      floor: {
        value: null,
        status: "unfilled",
      },
      roomNumber: {
        value: null,
        status: "unavailable",
      },
      date: {
        value: null,
        status: "unfilled",
      },
      time: {
        value: null,
        status: "unfilled",
      },
      comment: {
        value: '',
        status: "unfilled",
      },
      rooms: [],
    },
  },
  reducers: {
    setValue: (state, data) => {
      const val = data.payload[0];
      const prop = data.payload[1];
      state.chooseNegotiationRoomForm[prop].value = val;
      console.log(current(state));
    },
    setFieldStatus: (state, data) => {
      const status = data.payload[0];
      const prop = data.payload[1];
      state.chooseNegotiationRoomForm[prop].status = status;
      console.log(current(state));
    },
    setRooms: (state, data) => {
        const rooms = data.payload;
        console.log(rooms)
        state.chooseNegotiationRoomForm.rooms = rooms;
        console.log(current(state));
    },
  },
});

export const {
  setValue, setFieldStatus, setRooms
} = formSlice.actions;
export const selectTower = (state) => state.form.chooseNegotiationRoomForm.tower.value;
export const selectFloor = (state) => state.form.chooseNegotiationRoomForm.floor.value;
export const selectRoomNumber = (state) => state.form.chooseNegotiationRoomForm.roomNumber.value;
export const selectTime = (state) => state.form.chooseNegotiationRoomForm.time.value;
export const selectComment = (state) => state.form.chooseNegotiationRoomForm.comment.value;
export const selectRoomStatus = (state) => state.form.chooseNegotiationRoomForm.roomNumber.status;
export const selectRooms = (state) => state.form.chooseNegotiationRoomForm.rooms;

export default formSlice.reducer;