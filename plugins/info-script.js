import fs from 'fs'
import { createHash } from 'crypto'
import fetch from 'node-fetch'
let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i

let handler = async function (m, { text, usedPrefix, command }) {

let info = `*╭────━•〔* *SILENCE* *〕•━────┐*
*│𖥂* *Script :*
*│*     bit.ly/3BP1wh2
*│𖥂* *Node_Modules:*
*│*     bit.ly/3Gu4tFz
*│𖥂* *Base :* 
*│*     bit.ly/3ja6gr8
*│𖥂* *Free Panel :* 
*│*     bit.ly/3VehFES
*╰─═┅═━───···─────๑*

📍 *N o t e :* 
• Jika menemukan bug di script, harap lapor owner
• Join grup official: bit.ly/Grup-Botz
• Bot ini free untuk digunakan, kecuali yang mau unlimited limit :)`
let kled = `https://telegra.ph/file/ff053a2dff6c14bcb0578.jpg`
let td = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'

let buttonMessage= {
'document':{'url':'https://www.google.com'},
'mimetype':global.ddocx,
'fileName':'Script.pdf',
'fileLength':9999999999999,
'pageCount':999,
'contextInfo':{
'forwardingScore':1000,
'isForwarded':true,
'externalAdReply':{
'mediaUrl':sig,
'mediaType':2,
'previewType':'pdf',
'title':'𝗦𝗶𝗹𝗲𝗻𝗰𝗲𝗕𝗼𝘁𝘇~',
'body':titlebot,
'thumbnail':await(await fetch(kled)).buffer(),
'sourceUrl':'https://www.instagram.com/eabdalmufid_'}},
'caption':info,
'footer':botdate,
'buttons':[
{'buttonId':'.menu','buttonText':{'displayText':'Menu'},'type':1}
],
'headerType':6}
    await conn.sendMessage(m.chat, buttonMessage, { quoted:m})
}

handler.customPrefix = /^(.script|.sc)$/i
handler.command = new RegExp

export default handler
