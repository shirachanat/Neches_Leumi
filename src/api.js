import { nechesLeumiServiceUrl, nechesLeumMethodes } from "./dec"

/**
 * @typedef {Object} MyType
 * @property {string} type - The type of the value.
 * @property {string[]} value - The actual value.
 */

/**
 * Sends a WhatsApp template message to the given phone number.
 * @param {string[]} phoneNumber The phone number to send the message to.
 * @param {string} [templateName] The name of the template to use.
 * @param {MyType[]} [parameters] The variables to use in the template.
 * @returns {Promise<Object>} The response object from the API call.
 */
export const sendTemplate = (phoneNumbers, temaplateName, parameters) => {
    const url = nechesLeumiServiceUrl + nechesLeumMethodes.sendTemplate
    const body = { phoneNumbers: phoneNumbers, templateName: temaplateName, variables: parameters }
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })
}