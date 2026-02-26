import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData } from '../services/api';
import { setRides, removeRide } from '../features/rides/ridesSlice';
import CreateRideForm from '../components/CreateRideForm';
import './home.css';
import EditRideForm from '../components/EditRideForm';

const Home = () => {
    const theme = useSelector(state => state.ui.theme);
    const dispatch = useDispatch();
    
    const rides = useSelector(state => state.rides.items);
    
    const [loading, setLoading] = useState(true);
    const [selectedRide, setSelectedRide] = useState(null);
    const [detailLoading, setDetailLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editingRide, setEditingRide] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            const result = await fetchData();
            dispatch(setRides(result.rides));
            setLoading(false);
        };
        loadData();
    }, [dispatch]);

    const handleRideClick = (rideId) => {
        setDetailLoading(true);
        
        // Ищем поездку в Redux
        const ride = rides.find(r => r.id === rideId);
        
        // Имитация задержки
        setTimeout(() => {
            setSelectedRide(ride);
            setDetailLoading(false);
        }, 1000);
    };

    const handleDeleteRide = (rideId) => {
        if (window.confirm('Точно удалить эту поездку?')) {
            dispatch(removeRide(rideId));
            setSelectedRide(null); // закрываем детали
        }
    };

    // Детальный просмотр
if (selectedRide) {
    // Если редактируем - показываем форму редактирования
    if (editingRide) {
        return (
            <EditRideForm 
                ride={editingRide} 
                onClose={() => {
                    setEditingRide(null);
                    // После редактирования остаемся в деталях
                    setSelectedRide(editingRide);
                }} 
            />
        );
    }
    
    // Иначе показываем детали
    return (
        <div className="container">
            <button 
                onClick={() => setSelectedRide(null)}
                className="back-btn"
            >
                Назад к списку
            </button>
            
            <div className="detail-card">
                <h2>{selectedRide.from} → {selectedRide.to}</h2>
                
                <div className="ride-info">
                    <div><strong>Дата:</strong> {selectedRide.date}</div>
                    <div><strong>Время:</strong> {selectedRide.time}</div>
                    <div><strong>Цена:</strong> {selectedRide.price} сом</div>
                    <div><strong>Места:</strong> {selectedRide.seats}</div>
                    <div><strong>Водитель:</strong> {selectedRide.driver}</div>
                </div>
                
                <div className="description">
                    <h3>Описание:</h3>
                    <p>{selectedRide.description || 'Нет описания'}</p>
                </div>
                
                <div className="detail-actions">
                    <button 
                        onClick={() => setEditingRide(selectedRide)}
                        className="edit-btn"
                    >
                        Изменить
                    </button>
                    
                    <button 
                        onClick={() => {
                            if (window.confirm('Точно удалить эту поездку?')) {
                                dispatch(removeRide(selectedRide.id));
                                setSelectedRide(null);
                            }
                        }}
                        className="delete-btn"
                    >
                        Удалить
                    </button>
                </div>
            </div>
        </div>
    );
}

    // Список поездок
    return (
        <div className="container">
            <h2>Доступные поездки</h2>
            
            <div className="form-toggle">
                <button 
                    onClick={() => setShowForm(!showForm)}
                    className="toggle-form-btn"
                >
                    {showForm ? 'Скрыть форму' : ' Создать новую поездку'}
                </button>
            </div>
            
            {showForm && <CreateRideForm onClose={() => setShowForm(false)} />}
            
            {loading ? (
                <div className="loading">Загрузка списка поездок...</div>
            ) : (
                <>
                    {detailLoading && (
                        <div className="detail-loading">
                            <div className="spinner"></div>
                            Загрузка данных... 
                        </div>
                    )}
                    
                    <div className="rides-grid">
                        {rides.map(ride => (
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
                                    {ride.description?.substring(0, 80) || 'Нет описания'}...
                                </p>
                                
                                <div className="click-hint">
                                    Нажмите для деталей
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Home;