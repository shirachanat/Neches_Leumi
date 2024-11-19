
/////////////////////////////////////

import React from 'react';
import { useLocation } from 'react-router-dom';  // שימוש ב-react-router כדי לקבל את הנתונים ממסך קודם
import MapWithRealTimeUpdates from './MapWithRealTimeUpdates';  // ייבוא הקומפוננטה של המפה
import { responsibilityDecode, regionsDecode, yechidaDecode, statusDecode } from '../dec';

function FilteredResponders() {
  const { state } = useLocation();  // מקבל את המידע על הכוננים מתוך ה-state
  const responders = state?.responders || [];  // אם יש מידע, נשתמש בו

  return (
    <div>
      <h1>כוננים מתאימים למצב חירום</h1>

      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {/* רשימת הכוננים */}
        <div style={{ flex: 1, padding: '10px' }}>
          <ul>
            {responders.length > 0 ? (
              responders.map(responder => (
                <li key={responder.id}>
                  <p><strong>{responder.name}</strong></p>
                  <p>תפקיד: {responsibilityDecode[responder.responsibility]}</p>
                  <p>אזור: {responder.regions.map(region => regionsDecode[region]).join(', ')}</p>
                  <p>יחידה: {responder.yechida.map(yechida => yechidaDecode[yechida]).join(', ')}</p>
                  <p>סטטוס: {statusDecode[responder.status]}</p>
                </li>
              ))
            ) : (
              <p>לא נמצאו כוננים מתאימים למצב חירום שנבחר</p>
            )}
          </ul>
        </div>

        {/* המפה */}
        <MapWithRealTimeUpdates responders={responders} />
      </div>
    </div>
  );
}

export default FilteredResponders;



/////////////////////////////////////////////////////////////
// import React from 'react';
// import { useLocation } from 'react-router-dom';  // שימוש ב-react-router כדי לקבל את הנתונים ממסך קודם
// import { responsibilityDecode, regionsDecode, yechidaDecode, statusDecode } from '../dec';

// function FilteredResponders() {
//   const { state } = useLocation();  // מקבל את המידע על הכוננים מתוך ה-state
//   const responders = state?.responders || [];  // אם יש מידע, נשתמש בו

//   return (
//     <div>
//       <h1>כוננים מתאימים למצב חירום</h1>
//       <ul>
//         {responders.length > 0 ? (
//           responders.map(responder => (
//             <li key={responder.id}>
//               <p><strong>{responder.name}</strong></p>
//               <p>תפקיד: {responsibilityDecode[responder.responsibility]}</p>
//               <p>אזור: {responder.regions.map(region => regionsDecode[region]).join(', ')}</p>
//               <p>יחידה: {responder.yechida.map(yechida => yechidaDecode[yechida]).join(', ')}</p>
//               <p>סטטוס: {statusDecode[responder.status]}</p>
//             </li>
//           ))
//         ) : (
//           <p>לא נמצאו כוננים מתאימים למצב חירום שנבחר</p>
//         )}
//       </ul>
//     </div>
//   );
// }

// export default FilteredResponders;
