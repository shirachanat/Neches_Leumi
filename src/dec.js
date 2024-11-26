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
  4: "חילוץ והצלה",
  5: "אירוע סייבר",
  6: "הזנקת כח אדם",
  7: "אחר"
};

// Numeric mapping for regions
export const regionsDecode = {
  101: "צפון",
  102: "מרכז",
  103: "דרום",
  104: "הכל"
};
// Numeric mapping for units (yechidot)
export const yechidaDecode = {
  201: "כלא איילון",
  202: "כלא חרמון",
  203: "כלא מעשיהו",
  204: "כלא דקל",
  205: "כלא שאטה"
};

export const agafDecode = {
  301: "אגף 1",
  302: "אגף 2",
  303: "אגף 3",
  304: "אגף 4",
  305: "אגף 5"
};

// Numeric mapping for statuses
export const statusDecode = {
  1: "נשלחה ההודעה",
  2: "ההודעה התקבלה",
  3: "בדרך",
  4: "הגיע"
};

export const messageStatusDecode =
  [{ code: 1, status: "sent", statusHebrew: "נשלחה ההודעה" },
  { code: 2, status: "delivered", statusHebrew: "ההודעה התקבלה" },
  { code: 3, status: "read", statusHebrew: "ההודעה נקראה" }
  ]


export const nechesLeumiServiceUrl = "https://neches-leumi-server.onrender.com/"
export const nechesLeumMethodes = { sendTemplate: "sendTemplate" }
export const whatsappTemplates = {
  emergency: 'emergency',
  chazlash: 'chazlash_clali'
}
