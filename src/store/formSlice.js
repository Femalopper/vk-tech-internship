import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
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
  };

export const formSlice = createSlice({
  name: 'form',
  initialState,
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
    setFormStatus: (state, data) => {
        state.chooseNegotiationRoomForm.status = data.payload;
    },
    reset: () => initialState,
  },
});

export const {
  setValue, setFieldStatus, setRooms, setFormStatus, reset
} = formSlice.actions;
export const selectTower = (state) => state.form.chooseNegotiationRoomForm.tower.value;
export const selectFloor = (state) => state.form.chooseNegotiationRoomForm.floor.value;
export const selectRoomNumber = (state) => state.form.chooseNegotiationRoomForm.roomNumber.value;
export const selectDate = (state) => state.form.chooseNegotiationRoomForm.date.value;
export const selectTime = (state) => state.form.chooseNegotiationRoomForm.time.value;
export const selectComment = (state) => state.form.chooseNegotiationRoomForm.comment.value;
export const selectTowerStatus = (state) => state.form.chooseNegotiationRoomForm.tower.status;
export const selectFloorStatus = (state) => state.form.chooseNegotiationRoomForm.floor.status;
export const selectRoomStatus = (state) => state.form.chooseNegotiationRoomForm.roomNumber.status;
export const selectDateStatus = (state) => state.form.chooseNegotiationRoomForm.date.status;
export const selectTimeStatus = (state) => state.form.chooseNegotiationRoomForm.time.status;
export const selectCommentStatus = (state) => state.form.chooseNegotiationRoomForm.comment.status;
export const selectRooms = (state) => state.form.chooseNegotiationRoomForm.rooms;
export const selectFormStatus = (state) => state.form.chooseNegotiationRoomForm.status;

export default formSlice.reducer;