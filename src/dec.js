// dec.js

// const dec = {
//     eventTypes: [
//       { id: 1, name: "שריפה" },
//       { id: 2, name: "פיגוע" },
//       { id: 3, name: "אסון טבע" }
//     ],
//     regions: [
//       { id: 101, name: "מרכז" },
//       { id: 102, name: "צפון" },
//       { id: 103, name: "דרום" }
//     ],
//     units: [
//       { id: 201, name: "כיבוי אש" },
//       { id: 202, name: "הצלה" },
//       { id: 203, name: "פינוי" }
//     ],
//     responsibilityDecode: {
//       1: "כיבוי אש",
//       2: "טיפול רפואי",
//       3: "ניהול אירוע חירום",
//       4: "חילוץ והצלה"
//     },
//     regionsDecode: {
//       101: "צפון",
//       102: "מרכז",
//       103: "דרום",
//       104: "מזרח",
//       105: "מערב"
//     },
//     jailDecode: {
//       201: "כלא איילון",
//       202: "כלא חרמון",
//       203: "כלא מעשיהו",
//       204: "כלא דקל",
//       205: "כלא שאטה"
//     },
//     statusDecode: {
//       1: "קיבל את ההודעה",
//       2: "קרא את ההודעה",
//       3: "בדרך",
//       4: "הגיע"
//     }
//   };
  
//   export default dec;
  

// Numeric mapping for responsibility
export const responsibilityDecode = {
    1: "כיבוי אש",
    2: "טיפול רפואי",
    3: "ניהול אירוע חירום",
    4: "חילוץ והצלה"
  };
  
  // Numeric mapping for regions
  export const regionsDecode = {
    101: "צפון",
    102: "מרכז",
    103: "דרום",
    104: "מזרח",
    105: "מערב"
  };
  // Numeric mapping for units (yechidot)
  export const yechidaDecode = {
    201: "כלא איילון",
    202: "כלא חרמון",
    203: "כלא מעשיהו",
    204: "כלא דקל",
    205: "כלא שאטה"
  };
    
  
  // Numeric mapping for statuses
  export const statusDecode = {
    1: "קיבל את ההודעה",
    2: "קרא את ההודעה",
    3: "בדרך",
    4: "הגיע"
  };

