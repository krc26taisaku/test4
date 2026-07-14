
window.KenteiStorage=(()=>{
  const KEY='kentei_word_state_v2';
  function base(){return{total:0,correct:0,wrongIds:[],favorites:[],byCategory:{},perQuestion:{},notes:{},lastSession:null,daily:{}}}
  function normalize(raw){const s=Object.assign(base(),raw||{});s.wrongIds=Array.isArray(s.wrongIds)?s.wrongIds:[];s.favorites=Array.isArray(s.favorites)?s.favorites:[];s.byCategory=s.byCategory||{};s.perQuestion=s.perQuestion||{};s.notes=s.notes||{};s.daily=s.daily||{};return s}
  function load(){
    try{
      const own=localStorage.getItem(KEY);if(own)return normalize(JSON.parse(own));
      const legacyKeys=['state','quiz_state','kentei_state_v1','kentei_state_v2'];
      for(const key of legacyKeys){const value=localStorage.getItem(key);if(value){const legacy=JSON.parse(value);return normalize(legacy)}}
      return base();
    }catch{return base()}
  }
  function save(state){localStorage.setItem(KEY,JSON.stringify(normalize(state)))}
  return{load,save,base};
})();
