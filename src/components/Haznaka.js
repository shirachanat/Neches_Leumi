import { responsibilityDecode, regionsDecode,yechidaDecodeArray , agafDecode, whatsappTemplates } from '../dec';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MultiSelect } from 'primereact/multiselect';
import './Haznaka.css';
import { useConanimContext } from '../contexts/context';
import { sendTemplate } from '../api';
import ResponderItem from "./ResponderItem/ResponderItem";

function Haznaka() {
  const { conanim } = useConanimContext();
  const [selectedResponsibility, setSelectedResponsibility] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedYechida, setSelectedYechida] = useState([]);
  const [selectedAgaf, setSelectedAgaf] = useState('');
  const { filteredResponders, setFilteredResponders } = useConanimContext(conanim);
  const navigate = useNavigate();

  // Update filtered responders dynamically
  useEffect(() => {
    const results = conanim.filter((responder) => {
      const matchesResponsibility = selectedResponsibility
        ? responder.responsibility == selectedResponsibility
        : true;
      const matchesRegion = selectedRegion
        ? responder.regions.some(region => region == selectedRegion)
        : true;
      const matchesYechida = selectedYechida.length > 0
        ? selectedYechida.some(yechida =>
          responder.yechida.some(responderYechida => responderYechida == yechida)
        )
        : true;
      return matchesResponsibility && matchesRegion && matchesYechida;
    });
    setFilteredResponders(results);
  }, [selectedResponsibility, selectedRegion, selectedYechida, conanim]);

  const handleConfirmCall = () => {
    const phoneNumbers = filteredResponders.map((responder) => responder.phone);
    console.log('Calling the following numbers:', phoneNumbers);
    const mikum = `מחוז: ${regionsDecode[parseInt(selectedRegion)]} ${selectedYechida.length > 0
      ? `, יחידות: ${selectedYechida.map(y => yechidaDecode[parseInt(y)]).join(', ')}`
      : ''
      } ${phoneNumbers.length && `, אגף: ${phoneNumbers.length}`}`;

    sendTemplate(phoneNumbers.filter((phone) => phone[0] == '9'), whatsappTemplates.emergency, [
      { type: "header", value: [mikum] },
      { type: "body", value: [mikum, "פרצה שריפה, יש אסירים וסוהרים לכודים"] }
    ])
      .then((response) => {
        if (response.ok) {
          navigate('/filtered-responders');
        } else {
          alert('שליחת הקריאה נכשלה.');
        }
      })
      .catch((error) => {
        console.error('Error sending call request:', error);
        alert('אירעה שגיאה.');
      });
    //navigate('/filtered-responders');
    navigate('/filtered-responders', {
      state: { selectedYechida, filteredResponders },
    });
  };

  const handleDelete = (id) => {
    setFilteredResponders((prevResponders) =>
      prevResponders.filter((responder) => responder.id !== id)
    );
  };

  // Transform yechidaDecode to array of objects for MultiSelect
  const yechidaOptions = Object.entries(yechidaDecode).map(([key, value]) => ({
    code: key,
    name: value
  }));

  return (
    <div className="haznaka-container">
      <h1 className="haznaka-title">סינון כונני חירום</h1>

      <div className="haznaka-content">
        <div className="haznaka-filters">
          <div className="form-group">
            <label htmlFor="responsibility" className="form-label">סוג אירוע:</label>
            <select
              id="responsibility"
              className="form-select"
              onChange={(e) => setSelectedResponsibility(e.target.value)}
              value={selectedResponsibility}
            >
              <option value="">בחר מצב חירום</option>
              {Object.entries(responsibilityDecode).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          <div>
            <svg stroke="currentColor" fill="currentColor" color='#555' strokeWidth="0" viewBox="0 0 384 512" className="icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"></path>
            </svg>
            <label htmlFor="region" className="form-label">מיקום:</label>
            <div className="form-group-mikum">
              <select
                id="region"
                className="form-select"
                onChange={(e) => setSelectedRegion(e.target.value)}
                value={selectedRegion}
              >
                <option value="">בחר מחוז</option>
                {Object.entries(regionsDecode).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>

              <MultiSelect
                value={selectedYechida}
                options={yechidaOptions}
                onChange={(e) => setSelectedYechida(e.value)}
                optionLabel="name"
                optionValue="code"
                placeholder="בחר יחידות"
                display="chip"
                className="w-full p-dropdown-custom"
                panelClassName="custom-dropdown-panel"
                filter={false}
              />
              
              <select
                id="agaf"
                className="form-select"
                onChange={(e) => setSelectedAgaf(e.target.value)}
                value={selectedAgaf}
              >
                <option value="">בחר אגף</option>
                {Object.entries(agafDecode).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <button className="filter-button" onClick={handleConfirmCall}>
          הפעל נוהל חירום
        </button>
        <div className="haznaka-responders-container">
          <div className="haznaka-responders">
            <h2>כוננים מתאימים למצב חירום</h2>
            {filteredResponders.length > 0 ? (
              <ul className="responder-list">
                {filteredResponders.map((responder) => (
                  <ResponderItem
                    key={responder.id}
                    responder={responder}
                    onDelete={handleDelete}
                  />
                ))}
              </ul>
            ) : (
              <p>לא נמצאו כוננים מתאימים למצב חירום שנבחר</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Haznaka;