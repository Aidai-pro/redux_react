import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addRide } from '../features/rides/ridesSlice';
import './CreateRideForm.css';

const CreateRideForm = ({ onClose }) => {
  const dispatch = useDispatch();
  
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [price, setPrice] = useState('');
  const [seats, setSeats] = useState('');
  const [description, setDescription] = useState('');

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
    
    // Проверка что поля заполнены
    if (!from || !to || !date || !time || !price || !seats) {
      console.log(' Заполни все поля!');
      return;
    }
    
    const newRide = {
      id: Date.now(),
      from,
      to,
      date,
      time,
      price: Number(price),
      seats: Number(seats),
      description,
      driver: 'Вы', // или имя пользователя из Redux
    };
    
    console.log('✅ Отправляем в Redux:', newRide);
    dispatch(addRide(newRide));
    
    // Очищаем форму
    setFrom('');
    setTo('');
    setDate('');
    setTime('');
    setPrice('');
    setSeats('');
    setDescription('');
    
    // Закрываем форму
    if (onClose) {
      onClose();
    }
    
    console.log('🎉 Поездка создана!');
  };

  return (
    <div className="form-container">
      <h2>Создать новую поездку</h2>
      
      <button 
        type="button" 
        onClick={onClose}
        className="close-btn"
      >
        ✕
      </button>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Откуда:</label>
          <input
            type="text"
            name="from"
            value={from}
            onChange={handleChange}
            placeholder="Бишкек"
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
            placeholder="Ош"
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
            placeholder="500"
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
            placeholder="3"
            required
          />
        </div>

        <div className="form-group">
          <label>Описание:</label>
          <textarea
            name="description"
            value={description}
            onChange={handleChange}
            placeholder="Дополнительная информация..."
            rows="3"
          />
        </div>

        <button type="submit" className="submit-btn">
          Создать поездку
        </button>
      </form>
    </div>
  );
};

export default CreateRideForm;