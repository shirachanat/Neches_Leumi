import React, { useEffect, useState } from 'react';
import { responsibilityDecode, regionsDecode, yechidaDecode } from '../dec';
import './ManageConanim.css'
import emergencyConanim from '../conanim.json';

const ShowConanim = () => {
    const [data, setData] = useState(emergencyConanim);
    const [editingIndex, setEditingIndex] = useState(null);
    const [newItemData, setNewItemData] = useState({ id: '', name: '', address: '', phone: '', regions: '', yechida: '', responsibility: '' });

    const fields = ['id', 'name', 'address', 'phone', 'regions', 'yechida', 'responsibility'];
    const labels = { id: 'מספר זהות', name: 'שם', address: 'כתובת', phone: 'טלפון', regions: 'מחוז', yechida: 'יחידה', responsibility: 'תחום אחריות' };

    const getDecodedValue = (field, value) => {
        const decoders = { responsibility: responsibilityDecode, regions: regionsDecode, yechida: yechidaDecode };
        return decoders[field] ? (Array.isArray(value) ? value.map(code => decoders[field][code] || code).join(', ') : decoders[field][value] || value) : value;
    };

    const handleSaveNewItem = () => {
        const { id, name, phone } = newItemData;
        if (!id || !name || !phone) return alert('מספר זהות, שם ומספר טלפון הם חובה');
        setData(editingIndex === 0 && data[0].isNew ? [newItemData, ...data.slice(1)] : data.map((item, i) => i === editingIndex ? newItemData : item));
        setNewItemData({ id: '', name: '', address: '', phone: '', regions: '', yechida: '', responsibility: '' });
        setEditingIndex(null);
    };

    const handleEdit = (index) => {
        setEditingIndex(index);
        setNewItemData({ ...data[index] });
    };

    const handleCancel = () => {
        if (data[editingIndex]?.isNew) setData(data.filter((_, i) => i !== editingIndex));
        setEditingIndex(null);
        setNewItemData({ id: '', name: '', address: '', phone: '', regions: '', yechida: '', responsibility: '' });
    };

    const renderTableCell = (item, field, index) => {
        const isEditing = editingIndex === index;
        return isEditing ? (
            ['regions', 'yechida', 'responsibility'].includes(field) ? (
                <select value={newItemData[field] || ''} onChange={(e) => setNewItemData({ ...newItemData, [field]: e.target.value })}>
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
            <div className="header">
                <img src="./emergency-icon.png" alt="לוגו חירום" />
                <div className="header-title">נכס לאומי</div>
            </div>
            <div style={{ textAlign: 'center', margin: '50px 0' }}>
                <button style={{height: '80px', width: '180px'}} onClick={() => { setNewItemData({ id: '', name: '', address: '', phone: '', regions: '', yechida: '', responsibility: '' }); setData([{ isNew: true }, ...data]); setEditingIndex(0); }} disabled={editingIndex !== null}>הוספת כונן חדש</button>
            </div>
            {data.length ? (
                <table className="main-table">
                    <thead>
                        <tr>{fields.map(field => <th key={field}>{labels[field]}</th>)}
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
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
                                            <button onClick={() => { if (window.confirm('האם אתה בטוח שברצונך למחוק?')) setData(data.filter((_, i) => i !== index)); }}>מחק</button>
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