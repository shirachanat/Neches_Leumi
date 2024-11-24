import React, { useEffect, useState, useContext } from 'react';
import { responsibilityDecode, regionsDecode, yechidaDecode } from '../dec';
import './ManageConanim.css'
import emergencyConanim from '../conanim.json';
import { useConanimContext } from '../contexts/context.jsx';

const ShowConanim = () => {
    const { conanim, setConanim } = useConanimContext();
    // const [data, setData] = useState(emergencyConanim);
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
        setShowSuccessModal(true); // הצגת המודאל
        setTimeout(() => setShowSuccessModal(false), 1500); // המודאל ייעלם לאחר 3 שניות
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
        <div>
            {showSuccessModal && (
                <div className="success-modal">
                    <div className="success-modal-content">
                        <p>השמירה בוצעה בהצלחה!</p>
                    </div>
                </div>
            )}
            <div style={{ textAlign: 'center', margin: '50px 0' }}>
                <button style={{ height: '80px', width: '180px' }} onClick={() => { setNewItemData({ id: '', name: '', address: '', phone: '', regions: '', yechida: '', responsibility: '' }); setConanim([{ isNew: true }, ...conanim]); setEditingIndex(0); }} disabled={editingIndex !== null}>הוספת כונן חדש</button>
            </div>
            {conanim.length ? (
                <table className="main-table">
                    <thead>
                        <tr>{fields.map(field => <th key={field}>{labels[field]}</th>)}
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {conanim.map((item, index) => (
                            <tr key={index} className={editingIndex === index ? 'editing-row' : ''}>
                                {fields.map(field => <td key={field}>{renderTableCell(item, field, index)}</td>)}
                                <td>
                                    {editingIndex === index ? (
                                        <>
                                            <button onClick={handleSaveNewItem}>שמור</button>
                                            <button onClick={handleCancel}>ביטול</button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => handleEdit(index)}>ערוך</button>
                                            <button onClick={() => { if (window.confirm('האם אתה בטוח שברצונך למחוק?')) setConanim(conanim.filter((_, i) => i !== index)); }}>מחק</button>
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