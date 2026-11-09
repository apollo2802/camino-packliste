import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import app, { hasValidSession } from '../dist/server/index.js';
import { sqliteEnvironment } from './helpers/sqlite-environment.mjs';
const origin = 'https://example.test';
const request = (path, init = {}) => new Request(origin + path, init);
async function login(env) {
  const result = await app.fetch(request('/login', { method: 'POST', body: new URLSearchParams({ code: env.ACCESS_CODE }) }), env);
  assert.equal(result.status, 303);
  return result.headers.get('set-cookie').split(';')[0];
}
const item = { id: 'custom-test', name: 'Rucksack', category: 'Eigene Ergänzungen', note: 'Test', weight: 100, priority: 'must', mode: 'pack', custom: true };
function stateWith(value) { return { checked: {p1:{},p2:{},shared:{}}, weights: {p1:{},p2:{},shared:{}}, custom: {p1:[value],p2:[],shared:[]} }; }
test('API rejects priority and weight injection while legitimate custom items round-trip', async t => {
  const {env} = sqliteEnvironment(t); const cookie = await login(env);
  for (const [value, status] of [[item,200], [{...item,priority:'must"><img src=x onerror="alert(1)">'},400], [{...item,weight:'0" onfocus="alert(1)'},400], [{...item,weight:{}},400]]) {
    const result = await app.fetch(request('/api/state', {method:'PUT', headers:{cookie,origin,'content-type':'application/json'},body:JSON.stringify({state:stateWith(value)})}),env);
    assert.equal(result.status,status);
  }
  const saved = await (await app.fetch(request('/api/state',{headers:{cookie}}),env)).json();
  assert.deepEqual(saved.state.custom.p1,[item]);
});
test('legacy stored item values cannot inject markup through either attribute sink', () => {
  const source=readFileSync('public/app.js','utf8');
  const render=source.slice(source.indexOf('  function itemMarkup(item)'),source.indexOf('  function renderTabs()'));
  const escape=source.slice(source.indexOf('  function escapeHTML(value)'),source.indexOf('  async function optimizeDiaryPhoto'));
  const weight=source.slice(source.indexOf('  function weightOf(profile, item)'),source.indexOf('  function isChecked'));
  const payload='"><img src=x onerror="alert(1)">';
  const html=vm.runInNewContext(escape+weight+render+'\nitemMarkup(item)',{item:{...item,priority:payload,weight:payload},state:{weights:{p1:{}}},activeProfile:'p1',isChecked:()=>false,isDemo:false,t:s=>s});
  assert.ok(!html.includes('<img'));
  assert.match(html,/value="0" data-weight-id/);
  assert.match(html,/&quot;&gt;&lt;img/);
});
test('logout revokes only that unique session including upload preflight and code changes invalidate sessions', async t => {
  const {env}=sqliteEnvironment(t); const first=await login(env); const second=await login(env);
  assert.notEqual(first,second);
  assert.equal(await hasValidSession(request('/api/public-photo',{headers:{cookie:first}}),env),true);
  const logout=await app.fetch(request('/logout',{headers:{cookie:first}}),env);
  assert.equal(logout.status,200);
  assert.equal(logout.headers.get('clear-site-data'),'"storage"');
  assert.match(logout.headers.get('set-cookie'),/Max-Age=0/);
  assert.equal((await app.fetch(request('/api/state',{headers:{cookie:first}}),env)).status,401);
  assert.equal(await hasValidSession(request('/api/public-photo',{headers:{cookie:first}}),{...env}),false);
  assert.equal((await app.fetch(request('/api/state',{headers:{cookie:second}}),env)).status,200);
  assert.equal((await app.fetch(request('/api/state',{headers:{cookie:second}}),{...env,ACCESS_CODE:'changed-code'})).status,401);
  const text=await logout.text(); const data=new Map([['camino-packliste-2026-v1','private'],['camino-weather-position-v1','coordinates'],['language','de']]);
  let redirected='';
  vm.runInNewContext(text.match(/<script>([\s\S]*?)<\/script>/)[1],{localStorage:{removeItem:k=>data.delete(k),setItem:(k,v)=>data.set(k,v)},location:{replace:v=>redirected=v}});
  assert.equal(data.has('camino-packliste-2026-v1'),false);
  assert.equal(data.has('camino-weather-position-v1'),false);
  assert.equal(data.get('language'),'de'); assert.equal(redirected,'/');
});
test('malformed, forged, expired and legacy cookies are rejected',async t=>{
  const {env}=sqliteEnvironment(t); await login(env);
  for(const token of ['broken','9999999999999.bad','1.00000000-0000-4000-8000-000000000000.bad',Date.now()+'.00000000-0000-4000-8000-000000000000.bad']){
    assert.equal(await hasValidSession(request('/api/state',{headers:{cookie:'camino_session='+token}}),env),false);
  }
});
test('logout cleanup disables later local saves and clears private state across tabs',()=>{
  const source=readFileSync('public/app.js','utf8');
  const lifecycle=source.slice(source.indexOf('  let signedOut = false;'),source.indexOf('  function setSyncStatus'));
  const stored=new Map([['private','notes'],['position','gps']]); const listeners={}; let click; let destination;
  const context={isDemo:false,serverReady:true,syncTimer:7,STORAGE_KEY:'private',WEATHER_POSITION_KEY:'position',state:{diary:['secret']},localStorage:{removeItem:k=>stored.delete(k),setItem:(k,v)=>stored.set(k,v)},window:{clearTimeout:()=>{},addEventListener:(name,handler)=>listeners[name]=handler,location:{replace:value=>destination=value,reload:()=>{destination='reload'}}},document:{querySelector:()=>({addEventListener:(_name,handler)=>{click=handler}})}};
  vm.createContext(context);vm.runInContext(lifecycle,context);click();vm.runInContext('writeLocalState()',context);
  assert.equal(stored.size,0);assert.equal(context.serverReady,false);
  listeners.storage({key:'camino-signed-out'});assert.equal(destination,'/intern');
  listeners.pageshow({persisted:true});assert.equal(destination,'reload');
});
test('legacy unsafe custom items can be loaded, edited and synced without blocking unrelated data',async t=>{
  const source=readFileSync('public/app.js','utf8');
  const normalize=source.slice(source.indexOf('  function normalizeState(value)'),source.indexOf('  let signedOut'));
  const old=stateWith({...item,priority:'"><img onerror="alert(1)">',weight:'bad',mode:undefined,note:undefined});
  const freshState=()=>({...stateWith(item),custom:{p1:[],p2:[],shared:[]},deleted:{p1:{},p2:{},shared:{}},labels:{profiles:{},items:{p1:{},p2:{},shared:{}}},diary:[]});
  const normalized=JSON.parse(JSON.stringify(vm.runInNewContext(normalize+'\nnormalizeState(value)',{value:old,freshState,crypto})));
  assert.equal(normalized.custom.p1[0].name,item.name);
  assert.equal(normalized.custom.p1[0].priority,'recommended');
  assert.equal(normalized.custom.p1[0].weight,0);
  const {env}=sqliteEnvironment(t); const cookie=await login(env);
  const result=await app.fetch(request('/api/state',{method:'PUT',headers:{cookie,origin,'content-type':'application/json'},body:JSON.stringify({state:normalized})}),env);
  assert.equal(result.status,200);
});
