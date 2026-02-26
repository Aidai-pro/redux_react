import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateRide } from '../features/rides/ridesSlice';
import './CreateRideForm.css'; 

const EditRideForm = ({ ride, onClose }) => {
  const dispatch = useDispatch();
  

  const [from, setFrom] = useState(ride.from);
  const [to, setTo] = useState(ride.to);
  const [date, setDate] = useState(ride.date);
  const [time, setTime] = useState(ride.time);
  const [price, setPrice] = useState(ride.price);
  const [seats, setSeats] = useState(ride.seats);
  const [description, setDescription] = useState(ride.description || '');

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'from') setFrom(value);
    if (name === 'to') setTo(value);
    if (name === 'date') setDate(value);
    if (name === 'time') setTime(value);
    if (name === 'price') setPrice(value);
    if (name === 'seats') setSeats(value);
    if (name === 'description') setDescription(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Создаем обновленную поездку
    const updatedRide = {
      ...ride, // берем старый id и водителя
      from,
      to,
      date,
      time,
      price: Number(price),
      seats: Number(seats),
      description,
    };
    
    // Отправляем в Redux
    dispatch(updateRide(updatedRide));
    
    
    onClose();
    
    console.log('Поездка обновлена:', updatedRide);
  };

  return (
    <div className="form-container">
      <h2>Редактировать поездку</h2>
      
      <button onClick={onClose} className="close-btn">✕</button>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Откуда:</label>
          <input
            type="text"
            name="from"
            value={from}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Куда:</label>
          <input
            type="text"
            name="to"
            value={to}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Дата:</label>
          <input
            type="date"
            name="date"
            value={date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Время:</label>
          <input
            type="time"
            name="time"
            value={time}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Цена (сом):</label>
          <input
            type="number"
            name="price"
            value={price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Свободных мест:</label>
          <input
            type="number"
            name="seats"
            value={seats}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Описание:</label>
          <textarea
            name="description"
            value={description}
            onChange={handleChange}
            rows="3"
            placeholder="Дополнительная информация..."
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">
             Сохранить изменения
          </button>
          <button type="button" onClick={onClose} className="cancel-btn">
             Отмена
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRideForm;