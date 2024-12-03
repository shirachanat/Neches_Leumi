import React, { useEffect, useState, useContext } from 'react';
import { responsibilityDecode, regionsDecode, yechidaDecode } from '../dec';
import editIcon from'../assetst/edit.svg'
import addIcon from'../assetst/add.svg'
import cancelIcon from'../assetst/cancel.svg'
import confirmIcon from'../assetst/confirm.svg'
import trashIcon from'../assetst/trash.svg'
import './ManageConanim.css'

import { useConanimContext } from '../contexts/context.jsx';

const ShowConanim = () => {
    const { conanim, setConanim } = useConanimContext();
    const [editingIndex, setEditingIndex] = useState(null);
    const [newItemData, setNewItemData] = useState({ id: '', name: '', address: '', phone: '', regions: '', yechida: '', responsibility: '' });
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const fields = ['id', 'name', 'address', 'phone', 'regions', 'yechida', 'responsibility'];
    const labels = { id: 'מספר זהות', name: 'שם', address: 'כתובת', phone: 'טלפון', regions: 'מחוז', yechida: 'יחידה', responsibility: 'תחום אחריות' };

    const getDecodedValue = (field, value) => {
        const decoders = { responsibility: responsibilityDecode, regions: regionsDecode, yechida: yechidaDecode };
        return decoders[field] ? (Array.isArray(value) ? value.map(code => decoders[field][code] || code).join(', ') : decoders[field][value] || value) : value;
    };

    const handleSaveNewItem = () => {
        const { id, name, phone } = newItemData;
        if (!id || !name || !phone) return alert('מספר זהות, שם ומספר טלפון הם חובה');
        setConanim(editingIndex === 0 && conanim[0].isNew ? [newItemData, ...conanim.slice(1)] : conanim.map((item, i) => i === editingIndex ? newItemData : item));
        setNewItemData({ id: '', name: '', address: '', phone: '', regions: '', yechida: '', responsibility: '' });
        setEditingIndex(null);
        setShowSuccessModal(true);
        setTimeout(() => setShowSuccessModal(false), 1500);
    };

    const handleEdit = (index) => {
        setEditingIndex(index);
        setNewItemData({ ...conanim[index] });
    };

    const handleCancel = () => {
        if (conanim[editingIndex]?.isNew) setConanim(conanim.filter((_, i) => i !== editingIndex));
        setEditingIndex(null);
        setNewItemData({ id: '', name: '', address: '', phone: '', regions: '', yechida: '', responsibility: '' });
    };

    const renderTableCell = (item, field, index) => {
        const isEditing = editingIndex === index;
        return isEditing ? (
            ['regions', 'yechida', 'responsibility'].includes(field) ? (
                <select value={newItemData[field] || ''} onChange={(e) => setNewItemData({ ...newItemData, [field]: e.target.value.split(',') })}>
                    <option value="">בחר</option>
                    {Object.entries(field === 'regions' ? regionsDecode : field === 'yechida' ? yechidaDecode : responsibilityDecode).map(([key, value]) => (
                        <option key={key} value={key}>{value}</option>
                    ))}
                </select>
            ) : (
                <input type="text" value={newItemData[field] || ''} onChange={(e) => setNewItemData({ ...newItemData, [field]: e.target.value })} />
            )
        ) : getDecodedValue(field, item[field]);
    };

    return (
        <div style={{ fontWeight: 'bold', padding: '50px 100px 100px', height: 'calc(100vh - 20rem)', overflow: 'hidden'}}>
            {showSuccessModal && (
                <div className="success-modal">
                    <div className="success-modal-content">
                        <p>השמירה בוצעה בהצלחה!</p>
                    </div>
                </div>
            )}
            {conanim.length ? (
                <table className="main-table">
                    <thead>
                        <tr>
                            <th></th>
                            {fields.map((field) => (
                                <th key={field}>{labels[field]}</th>
                            ))}
                            <th>
                                <img
                                    title="הוסף"
                                    className={`Icons ${editingIndex !== null ? 'disabled' : ''}`}
                                    src={addIcon}
                                    alt="add conan"
                                    onClick={() => {
                                        if (editingIndex === null) {
                                            setNewItemData({
                                                id: '', name: '', address: '',
                                                phone: '', regions: '', yechida: '',
                                                responsibility: ''
                                            });
                                            setConanim([{ isNew: true }, ...conanim]);
                                            setEditingIndex(0);
                                        }
                                    }}
                                    style={{
                                        cursor: editingIndex !== null ? 'not-allowed' : 'pointer',
                                        opacity: editingIndex !== null ? 0.5 : 1
                                    }}
                                />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {conanim.map((item, index) => (
                            <tr key={index} className={editingIndex === index ? 'editing-row' : ''}>
                                <td>
                                    {item.img ? (
                                        <img
                                            src={item.img}
                                            alt={item.name}
                                            style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '50%' }}
                                        />
                                    ) : (
                                        <span>-</span>
                                    )}
                                </td>
                                {fields.map(field => <td key={field}>{renderTableCell(item, field, index)}</td>)}
                                <td>
                                    {editingIndex === index ? (
                                        <>
                                            <img style={{ paddingLeft: '20px' }} title='שמור' className='Icons' src={confirmIcon} alt='save conan' onClick={() => handleSaveNewItem()} />
                                            <img title='ביטול' className='Icons' src={cancelIcon} alt='cancel conan' onClick={() => handleCancel()} />
                                        </>
                                    ) : (
                                        <>
                                            <img style={{ paddingLeft: '20px' }} title='ערוך' className='Icons' src={editIcon} alt='Edit conan' onClick={() => handleEdit(index)} />
                                            <img title='מחק' className='Icons' src={trashIcon} alt='delete conan' onClick={() => { if (window.confirm('האם אתה בטוח שברצונך למחוק?')) setConanim(conanim.filter((_, i) => i !== index)); }} />
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : <p>לא נמצאו נתונים להצגה</p>}
        </div>
    );
};

export default ShowConanim;