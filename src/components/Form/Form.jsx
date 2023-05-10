import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  SelectPicker, Tooltip, Whisper, DatePicker,
} from 'rsuite';
import isBefore from 'date-fns/isBefore';
import 'rsuite/dist/rsuite.css';
import './Form.css';
import dayjs from 'dayjs';
import { object, date } from 'yup';
import Swal from 'sweetalert2';
import {
  reset,
  selectComment,
  selectCommentStatus,
  selectDate,
  selectDateStatus,
  selectFloor,
  selectFloorStatus,
  selectFormStatus,
  selectRoomNumber,
  selectRoomStatus,
  selectRooms,
  selectTime,
  selectTimeStatus,
  selectTower,
  selectTowerStatus,
  setFieldStatus,
  setFormStatus,
  setRooms,
  setValue,
} from '../../store/formSlice';

function Form() {
  const tower = useSelector(selectTower);
  const floor = useSelector(selectFloor);
  const roomNumber = useSelector(selectRoomNumber);
  const selectedDate = useSelector(selectDate);
  const time = useSelector(selectTime);
  const comment = useSelector(selectComment);
  const towerStatus = useSelector(selectTowerStatus);
  const floorStatus = useSelector(selectFloorStatus);
  const roomStatus = useSelector(selectRoomStatus);
  const dateStatus = useSelector(selectDateStatus);
  const timeStatus = useSelector(selectTimeStatus);
  const commentStatus = useSelector(selectCommentStatus);
  const rooms = useSelector(selectRooms);
  const formStatus = useSelector(selectFormStatus);
  const dispatch = useDispatch();

  const minPublishDate = dayjs().add(0, 'day').format('YYYY-MM-DD');

  const schema = object({
    // 2.1 use the date().min() function to specify the minimum date
    minPublishDate: date().min(minPublishDate),
  });

  useEffect(() => {
    if (selectedDate) {
      const dateToCheck = {
        minPublishDate: selectedDate,
      };
      schema
        .validate(dateToCheck)
        .then((result) => {
          if (result) {
            dispatch(setFieldStatus(['filled', 'date']));
          }
        })
        .catch((e) => console.log(e));
    }
    const fieldsStatus = {
      towerStatus,
      floorStatus,
      roomStatus,
      dateStatus,
      timeStatus,
      commentStatus,
    };
    const fieldsStatusValues = Object.values(fieldsStatus);
    const unfilledFields = fieldsStatusValues.filter(
      (status) => status !== 'filled',
    );
    if (unfilledFields.length === 0) {
      dispatch(setFormStatus('filled'));
    } else {
      dispatch(setFormStatus('unfilled'));
    }
  }, [
    selectedDate,
    towerStatus,
    floorStatus,
    roomStatus,
    dateStatus,
    timeStatus,
    commentStatus,
    dispatch,
    schema,
  ]);

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
      label: 'А',
      value: 'А',
    },
    {
      label: 'Б',
      value: 'Б',
    },
  ];

  const floorOptions = floors.map((flr) => ({
    label: flr,
    value: flr,
  }));

  const roomOptions = rooms.map((room) => ({
    label: room,
    value: room,
  }));

  const timeOptions = [
    {
      label: '9:00 - 12:00',
      value: '9:00 - 12:00',
    },
    {
      label: '12:00 - 15:00',
      value: '12:00 - 15:00',
    },
    {
      label: '15:00 - 18:00',
      value: '15:00 - 18:00',
    },
  ];

  const isRoomFieldDisabled = () => {
    if (roomStatus === 'unavailable') {
      return true;
    }
    return false;
  };

  const isTooltipTriggered = () => {
    if (roomStatus === 'unavailable') {
      return 'hover';
    }
    return 'none';
  };

  const isSubmitDisabled = () => formStatus === 'unfilled';

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      JSON.stringify({
        tower,
        floor,
        roomNumber,
        selectedDate,
        time,
        comment,
      }),
    );
    Swal.fire({
      heightAuto: false,
      title: `<strong><u>Вы забронировали переговорную номер ${roomNumber} в башне ${tower} на ${floor} этаже на ${selectedDate.toLocaleDateString()} ${time}</u></strong>`,
      icon: 'info',
      showCloseButton: true,
      showCancelButton: false,
      focusConfirm: false,
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> Отлично!',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
      cancelButtonAriaLabel: 'Thumbs down',
    });
    dispatch(reset());
  };

  const clearFormHandler = () => {
    dispatch(reset());
  };

  const changeTowerHandler = (val) => {
    dispatch(setValue([val, 'tower']));
    dispatch(setFieldStatus(['filled', 'tower']));
  };

  const changeFloorHandler = (val) => {
    dispatch(setValue([val, 'floor']));
    dispatch(setFieldStatus(['filled', 'floor']));
    if (!floor) {
      dispatch(setFieldStatus(['available', 'roomNumber']));
    } else {
      dispatch(setFieldStatus(['reset', 'roomNumber']));
      dispatch(setValue([null, 'roomNumber']));
    }
    if (!val) {
      dispatch(setRooms([]));
      dispatch(setFieldStatus(['unavailable', 'roomNumber']));
    } else {
      dispatch(setRooms(negotiationRooms[val]));
    }
  };

  const changeRoomHandler = (val) => {
    dispatch(setValue([val, 'roomNumber']));
    dispatch(setFieldStatus(['filled', 'roomNumber']));
  };

  const changeTimeHandler = (val) => {
    dispatch(setFieldStatus(['filled', 'time']));
    dispatch(setValue([val, 'time']));
  };

  const commentChangeHandler = (e) => {
    if (e.target.value !== '') {
      dispatch(setFieldStatus(['filled', 'comment']));
    } else {
      dispatch(setFieldStatus(['unfilled', 'comment']));
    }
    dispatch(setValue([e.target.value, 'comment']));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Выберите башню</label>
        <SelectPicker
          data={towerOptions}
          menuMaxHeight={100}
          value={tower}
          onChange={(val) => changeTowerHandler(val)}
          onClean={() => dispatch(setFieldStatus(['unfilled', 'tower']))}
        />
      </div>
      <div className="form-group">
        <label>Выберите этаж</label>
        <SelectPicker
          data={floorOptions}
          menuMaxHeight={100}
          value={floor}
          onChange={(val) => changeFloorHandler(val)}
          onClean={() => dispatch(setFieldStatus(['unfilled', 'floor']))}
        />
      </div>
      <div className="form-group">
        <label>Выберите переговорную</label>
        <Whisper
          placement="topEnd"
          trigger={isTooltipTriggered()}
          speaker={<Tooltip>Выберите сначала этаж!</Tooltip>}
        >
          <div>
            <SelectPicker
              data={roomOptions}
              menuMaxHeight={100}
              value={roomNumber}
              disabled={isRoomFieldDisabled()}
              onChange={(val) => changeRoomHandler(val)}
              onClean={() => dispatch(setFieldStatus(['unfilled', 'roomNumber']))}
            />
          </div>
        </Whisper>
      </div>
      <div className="form-group date-and-time">
        <div className="date">
          <label>Выберите дату</label>
          <DatePicker
            value={selectedDate}
            oneTap
            shouldDisableDate={(d) => isBefore(d, new Date(new Date().getTime() - 86400000))
              || d.getDay() === 0
              || d.getDay() === 6}
            onClean={() => {
              dispatch(setValue([null, 'date']));
              dispatch(setFieldStatus(['unfilled', 'date']));
            }}
            onKeyDown={(e) => {
              if (e.code !== 'Tab') {
                dispatch(setFieldStatus(['unfilled', 'date']));
                dispatch(setValue([null, 'date']));
              }
            }}
            onChangeCalendarDate={(val) => dispatch(setValue([val, 'date']))}
            placeholder="гггг.мм.дд."
          />
        </div>
        <div className="time">
          <label>Выберите время</label>
          <SelectPicker
            data={timeOptions}
            searchable={false}
            value={time}
            onChange={(val) => changeTimeHandler(val)}
            onClean={() => dispatch(setFieldStatus(['unfilled', 'time']))}
          />
        </div>
      </div>
      <div className="form-group">
        <label>Комментарии:</label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          value={comment}
          onChange={commentChangeHandler}
        />
      </div>
      <div className="buttons">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitDisabled()}
        >
          Отправить
        </button>
        <button
          type="button"
          className="btn btn-danger clear"
          onClick={clearFormHandler}
        >
          Очистить
        </button>
      </div>
    </form>
  );
}

export default Form;
