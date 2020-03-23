import axios from 'axios'
// import CryptoJS from 'crypto-js'
const CryptoJS = require("crypto-js");

export const apiBase = new axios.create({
    baseURL: process.env.VUE_APP_API
})

export const encrypted = (data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), process.env.VUE_APP_KEY).toString();
}

export const decrypted = (data) => {
    var bytes  = CryptoJS.AES.decrypt(data, process.env.VUE_APP_KEY);
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(originalText)
}