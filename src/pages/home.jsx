import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchData, fetchRideDetails } from '../services/api';
import './home.css';

const Home = () => {
    const theme = useSelector(state => state.ui.theme);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedRide, setSelectedRide] = useState(null);
    const [detailLoading, setDetailLoading] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            const result = await fetchData();
            setData(result);
            setLoading(false);
        };
        loadData();
    }, []);

    // Обработчик клика на карточку
    const handleRideClick = async (rideId) => {
        setDetailLoading(true);
        
        // Задержка при клике
        const rideDetails = await fetchRideDetails(rideId);
        setSelectedRide(rideDetails);
        
        setDetailLoading(false);
    };

    // Детальный просмотр поездки 
    if (selectedRide) {
        return (
            <div className="container">
                <button 
                    onClick={() => setSelectedRide(null)}
                    className="back-btn"
                >
                    ← Назад к списку
                </button>
                
                <div className="detail-card">
                    <h2>{selectedRide.from} → {selectedRide.to}</h2>
                    
                    <div className="ride-info">
                        <div><strong>Дата:</strong> {selectedRide.date}</div>
                        <div><strong>Время:</strong> {selectedRide.time}</div>
                        <div><strong>Цена:</strong> {selectedRide.price} сом</div>
                        <div><strong>Свободных мест:</strong> {selectedRide.seats}</div>
                        <div><strong>Водитель:</strong> {selectedRide.driver}</div>
                    </div>
                    
                    <div className="description">
                        <h3>Описание:</h3>
                        <p>{selectedRide.description}</p>
                    </div>
                </div>
            </div>
        );
    }

    // Список поездок 
    return (
        <div className="container">
            <h2>Доступные поездки</h2>
            
            {loading ? (
                <div className="loading">
                    
                </div>
            ) : (
                <>
                    <div className="section">
                        
                        
                        {detailLoading && (
                            <div className="detail-loading">
                                <div className="spinner"></div>
                                Загрузка данных... 
                            </div>
                        )}
                        
                        <div className="rides-grid">
                            {data.rides.map(ride => (
                                <div 
                                    key={ride.id} 
                                    className="ride-card"
                                    onClick={() => handleRideClick(ride.id)}
                                >
                                    <div className="route">
                                        <h4>{ride.from} → {ride.to}</h4>
                                        <div className="price">{ride.price} сом</div>
                                    </div>
                                    
                                    <div className="ride-info-small">
                                        <div><strong>Дата:</strong> {ride.date}</div>
                                        <div><strong>Время:</strong> {ride.time}</div>
                                        <div><strong>Места:</strong> {ride.seats}</div>
                                        <div><strong>Водитель:</strong> {ride.driver}</div>
                                    </div>
                                    
                                    <p className="description-preview">
                                        {ride.description.substring(0, 80)}...
                                    </p>
                                    
                                    <div className="click-hint">
                                        Нажмите для деталей
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    
                </>
            )}
        </div>
    );
};

export default Home;