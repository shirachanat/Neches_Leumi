import { responsibilityDecode, regionsDecode, yechidaDecode, statusDecode } from '../dec';
import emergencyConanim from '../conanim.json'; // טוען את נתוני הכוננים מקובץ JSON
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // שימוש ב-react-router עבור ניווט בין מסכים

function Haznaka() {
  const [selectedResponsibility, setSelectedResponsibility] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedYechida, setSelectedYechida] = useState('');
  const navigate = useNavigate(); // הגדרת ניווט

  const filterResponders = () => {
    return emergencyConanim.filter(responder => {
      const matchesResponsibility = selectedResponsibility ? responder.responsibility === parseInt(selectedResponsibility) : true;
      const matchesRegion = selectedRegion ? responder.regions.includes(parseInt(selectedRegion)) : true;
      const matchesYechida = selectedYechida ? responder.yechida.includes(parseInt(selectedYechida)) : true;
      return matchesResponsibility && matchesRegion && matchesYechida;
    });
  };

  const handleFilterClick = () => {
    const filteredResponders = filterResponders();
    navigate('/filtered-responders', { state: { responders: filteredResponders } }); // מעבר למסך הבא עם המידע
  };

  return (
    <div>
      <h1>סינון כונני חירום</h1>

      <div>
        <label>אחריות:</label>
        <select onChange={(e) => setSelectedResponsibility(e.target.value)} value={selectedResponsibility}>
          <option value="">בחר אחריות</option>
          {Object.entries(responsibilityDecode).map(([key, value]) => (
            <option key={key} value={key}>{value}</option>
          ))}
        </select>
      </div>

      <div>
        <label>אזור:</label>
        <select onChange={(e) => setSelectedRegion(e.target.value)} value={selectedRegion}>
          <option value="">בחר אזור</option>
          {Object.entries(regionsDecode).map(([key, value]) => (
            <option key={key} value={key}>{value}</option>
          ))}
        </select>
      </div>

      <div>
        <label>יחידה:</label>
        <select onChange={(e) => setSelectedYechida(e.target.value)} value={selectedYechida}>
          <option value="">בחר יחידה</option>
          {Object.entries(yechidaDecode).map(([key, value]) => (
            <option key={key} value={key}>{value}</option>
          ))}
        </select>
      </div>

      <button onClick={handleFilterClick}>סנן</button>
    </div>
  );
}

export default Haznaka;
