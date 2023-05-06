import React, { useState } from "react";
import { SelectPicker } from "rsuite";
import "../../../node_modules/rsuite/dist/rsuite.css";
import { DatePicker } from "rsuite";
import isBefore from "date-fns/isBefore";
import { Tooltip, Whisper } from "rsuite";
import "./Form.css";

const Form = () => {
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

  return (
    <form>
      <div className="form-group">
        <label htmlFor="exampleFormControlSelect1">Выберите башню</label>
        <SelectPicker
          data={towerOptions}
          defaultValue={towerOptions[0].label}
          menuMaxHeight={100}
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleFormControlSelect1">Выберите этаж</label>
        <SelectPicker
          data={floorOptions}
          defaultValue={floors[0]}
          menuMaxHeight={100}
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleFormControlSelect1">Выберите переговорную</label>
        <Whisper speaker={<Tooltip>Выберите сначала этаж!</Tooltip>}>
          <div>
          <SelectPicker
            data={floorOptions}
            defaultValue={floors[0]}
            menuMaxHeight={100}
            disabled
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
          />
        </div>
        <div className="time">
          <label htmlFor="exampleFormControlSelect1">Выберите время</label>
          <SelectPicker
            data={timeOptions}
            defaultValue={timeOptions[0].label}
            searchable={false}
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="exampleFormControlTextarea1">Комментарии:</label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
        ></textarea>
      </div>
      <div className="buttons">
        <button type="submit" class="btn btn-primary">
          Отправить
        </button>
        <button type="button" class="btn btn-danger clear">
          Очистить
        </button>
      </div>
    </form>
  );
};

export default Form;
