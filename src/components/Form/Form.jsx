import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SelectPicker } from "rsuite";
import "../../../node_modules/rsuite/dist/rsuite.css";
import { DatePicker } from "rsuite";
import isBefore from "date-fns/isBefore";
import { Tooltip, Whisper } from "rsuite";
import "./Form.css";
import {
  selectComment,
  selectDate,
  selectFloor,
  selectFloorStatus,
  selectRoomNumber,
  selectRoomStatus,
  selectRooms,
  selectTime,
  selectTower,
  setFieldStatus,
  setRooms,
  setValue,
} from "../../store/formSlice";

const Form = () => {
  const tower = useSelector(selectTower);
  const floor = useSelector(selectFloor);
  const roomNumber = useSelector(selectRoomNumber);
  const time = useSelector(selectTime);
  const comment = useSelector(selectComment);
  const roomStatus = useSelector(selectRoomStatus);
  const rooms = useSelector(selectRooms);
  const dispatch = useDispatch();

  const firstFloor = 3;
  const lastFloor = 27;
  const negotiationRoomsNum = 10;
  const negotiationRooms = {};
  for (let i = firstFloor; i <= lastFloor; i += 1) {
    negotiationRooms[i] = [];
    for (let j = 0; j < negotiationRoomsNum; j += 1) {
      negotiationRooms[i].push(String(i) + j);
    }
  }
  const floors = Object.keys(negotiationRooms);
  const towerOptions = [
    {
      label: "А",
      value: "А",
    },
    {
      label: "Б",
      value: "Б",
    },
  ];
  const floorOptions = floors.map((floor) => ({
    label: floor,
    value: floor,
  }));
  const roomOptions = rooms.map((room) => ({
    label: room,
    value: room,
  }));

  const timeOptions = [
    {
      label: "9:00 - 12:00",
      value: "9:00 - 12:00",
    },
    {
      label: "12:00 - 15:00",
      value: "12:00 - 15:00",
    },
    {
      label: "15:00 - 18:00",
      value: "15:00 - 18:00",
    },
  ];
  const isRoomFieldDisabled = () => {
    if (roomStatus === "unavailable") {
      return true;
    }
    return false;
  };
  const isTooltipTriggered = () => {
    if (roomStatus === "unavailable") {
      return "hover";
    }
    return "none";
  };

  return (
    <form>
      <div className="form-group">
        <label htmlFor="exampleFormControlSelect1">Выберите башню</label>
        <SelectPicker
          data={towerOptions}
          menuMaxHeight={100}
          value={tower}
          onChange={(val) => {
            dispatch(setValue([val, "tower"]));
            dispatch(setFieldStatus(["filled", "tower"]));
          }}
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleFormControlSelect1">Выберите этаж</label>
        <SelectPicker
          data={floorOptions}
          menuMaxHeight={100}
          value={floor}
          onChange={(val) => {
            dispatch(setValue([val, "floor"]));
            if (!floor) {
              dispatch(setFieldStatus(["filled", "floor"]));
              dispatch(setFieldStatus(["available", "roomNumber"]));
            } else {
              dispatch(setFieldStatus(["changed", "floor"]));
              dispatch(setFieldStatus(["reset", "roomNumber"]));
              dispatch(setValue([null, "roomNumber"]));
            }
            if (!val) {
              dispatch(setRooms([]));
              dispatch(setFieldStatus(["unavailable", "roomNumber"]));
            } else {
              dispatch(setRooms(negotiationRooms[val]));
            }
          }}
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleFormControlSelect1">Выберите переговорную</label>
        <Whisper
          trigger={isTooltipTriggered()}
          speaker={<Tooltip>Выберите сначала этаж!</Tooltip>}
        >
          <div>
            <SelectPicker
              data={roomOptions}
              menuMaxHeight={100}
              value={roomNumber}
              disabled={isRoomFieldDisabled()}
              onChange={(val) => {
                dispatch(setValue([val, "roomNumber"]));
                dispatch(setFieldStatus(["filled", "roomNumber"]));
              }}
            />
          </div>
        </Whisper>
      </div>
      <div className="form-group date-and-time">
        <div className="date">
          <label htmlFor="exampleFormControlSelect1">Выберите дату</label>
          <DatePicker
            oneTap
            shouldDisableDate={(date) => isBefore(date, new Date())}
            onClean={() => {
              dispatch(setValue([null, "date"]));
            }}
            onChangeCalendarDate={(val) => {
              dispatch(setFieldStatus(["filled", "date"]));
              dispatch(setValue([val.toString(), "date"]));
            }}
          />
        </div>
        <div className="time">
          <label htmlFor="exampleFormControlSelect1">Выберите время</label>
          <SelectPicker
            data={timeOptions}
            searchable={false}
            value={time}
            onChange={(val) => {
              dispatch(setFieldStatus(["filled", "time"]));
              dispatch(setValue([val, "time"]));
            }}
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="exampleFormControlTextarea1">Комментарии:</label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          value={comment}
          onChange={(e) => {
            dispatch(setFieldStatus(["filled", "comment"]));
            dispatch(setValue([e.target.value, "comment"]));
          }}
        ></textarea>
      </div>
      <div className="buttons">
        <button type="submit" className="btn btn-primary">
          Отправить
        </button>
        <button type="button" className="btn btn-danger clear">
          Очистить
        </button>
      </div>
    </form>
  );
};

export default Form;
