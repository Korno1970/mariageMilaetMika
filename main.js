// Scroll reveal
const io = new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target);}}),{threshold:.08});
document.querySelectorAll('.rev').forEach(el=>io.observe(el));

// RSVP state
const state={mairie:{sel:null,n:1},houppa:{sel:null,n:1},beach:{sel:null,n:1}};
const lbls={mairie:'Mairie Vincennes (8 juil.)',houppa:'Houppa Netanya (19 oct.)',beach:'Beach Party (21 oct.)'};

function pick(btn,ev,val){
  btn.closest('.eb').querySelectorAll('.tb').forEach(b=>b.classList.remove('on'));
  btn.classList.add('on');
  state[ev].sel=val;
  document.getElementById(ev+'-g').style.display=val==='oui'?'flex':'none';
  refreshSum();
}
function delta(ev,d){
  state[ev].n=Math.max(1,state[ev].n+d);
  document.getElementById(ev+'-n').textContent=state[ev].n;
  refreshSum();
}
function refreshSum(){
  const lines=Object.entries(state).filter(([,v])=>v.sel!==null);
  const sb=document.getElementById('sb');
  if(!sb)return;
  if(!lines.length){sb.style.display='none';return;}
  sb.style.display='block';
  document.getElementById('sl').innerHTML=lines.map(([k,v])=>`<div class="sl">${lbls[k]}<span>${v.sel==='oui'?'✓ '+v.n+' pers.':'✗ Absent(e)'}</span></div>`).join('');
}
function send(e){
  e.preventDefault();
  const fields=document.querySelectorAll('input,select,textarea');
  const nom=fields[0]?.value||'';const prenom=fields[1]?.value||'';
  const email=fields[2]?.value||'';
  const evts=Object.entries(state).filter(([,v])=>v.sel).map(([k,v])=>`${lbls[k]}: ${v.sel==='oui'?'Oui ('+v.n+' pers.)':'Non'}`).join('\n');
  const regime=fields[4]?.value||'';const heb=fields[5]?.value||'';const msg=fields[6]?.value||'';
  const body=encodeURIComponent(`Nom : ${nom} ${prenom}\nEmail : ${email}\n\nPrésence :\n${evts}\n\nRégime / allergies : ${regime}\nHébergement : ${heb}\n\nMessage : ${msg}`);
  const sub=encodeURIComponent('RSVP — Mariage Mila & Michaël');
  window.location.href=`mailto:Kornowski.mila@gmail.com?subject=${sub}&body=${body}`;
}
