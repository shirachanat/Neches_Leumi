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

// export const yechidaDecode = {
//   201: { name: "כלא איילון", coordinates: { lat: 32.0554, lng: 34.7995 } },
//   202: { name: "כלא חרמון", coordinates: { lat: 32.9256, lng: 35.2982 } },
//   203: { name: "כלא מעשיהו", coordinates: { lat: 31.8668, lng: 34.8500 } },
//   204: { name: "כלא דקל", coordinates: { lat: 31.2086, lng: 34.9315 } },
//   205: { name: "כלא שאטה", coordinates: { lat: 32.5557, lng: 35.4106 } }
// };
// Numeric mapping for units (yechidot)
export const yechidaDecode = {
  201: "כלא איילון",
  202: "כלא חרמון",
  203: "כלא מעשיהו",
  204: "כלא דקל",
  205: "כלא שאטה"
};
export const yechidaDecodeArray = [
  { id: 201, name: "כלא איילון", coordinates: { lat: 32.0554, lng: 34.7995 } },
  { id: 202, name: "כלא חרמון", coordinates: { lat: 32.9256, lng: 35.2982 } },
  { id: 203, name: "כלא מעשיהו", coordinates: { lat: 31.8668, lng: 34.8500 } },
  { id: 204, name: "כלא דקל", coordinates: { lat: 31.2086, lng: 34.9315 } },
  { id: 205, name: "כלא שאטה", coordinates: { lat: 32.5557, lng: 35.4106 } }
];

export const yechidaDecodeObject = Object.fromEntries(
  yechidaDecodeArray.map((item) => [item.id, item])
);


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

export const statusesDesc = { sent: 1, delivered: 2, read: 3, onWay: 4, arrived: 5 }
export const statuses =
  [{ label: 'נשלחה הודעה', color: '#ff9aa2', codeStatus: statusesDesc.sent },
  { label: 'התקבלה', color: '#b39eb5', codeStatus: statusesDesc.delivered },
  { label: 'נקראה', color: '#87bdd8', codeStatus: statusesDesc.read },
  { label: 'בדרך', color: '#ffeb84', codeStatus: statusesDesc.onWay },
  { label: 'הגיע', color: '#5cb85c', codeStatus: statusesDesc.arrived }
  ];


export const nechesLeumiServiceUrl = "https://neches-leumi-server.onrender.com/"
export const nechesLeumMethodes = { sendTemplate: "sendTemplate" }
export const whatsappTemplates = {
  emergency: 'emergency',
  chazlash: 'chazlash_clali'
}
