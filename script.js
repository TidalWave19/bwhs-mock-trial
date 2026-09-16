function officerCard(person){
  return `<article class="person"><span class="role">${person.role.toUpperCase()}</span><div class="avatar">${person.initials}</div><h3>${person.name}</h3><div class="title">${person.role} · ${person.grade}</div><p>BWHS Mock Trial Club student leadership.</p><footer>${person.grade.toUpperCase()}　　▣ ${person.role.toUpperCase()}</footer></article>`;
}
function rosterCard(person){
  return `<article class="person" data-role="${person.role}"><span class="role">${person.role.toUpperCase()}</span><div class="avatar">${person.initials}</div><h3>${person.name}</h3><div class="title">${person.role} · ${person.grade}</div><p>Current 2026–2027 club roster member.</p></article>`;
}

if (typeof CLUB !== 'undefined') {
  document.querySelectorAll('.logo small').forEach(x => x.textContent = `${CLUB.season} · EST. ${CLUB.established}`);
  const officerGrid=document.querySelector('#officerGrid');
  if(officerGrid) officerGrid.innerHTML=CLUB.officers.map(officerCard).join('');
  const rosterGrid=document.querySelector('#rosterGrid');
  if(rosterGrid) rosterGrid.innerHTML=CLUB.roster.map(rosterCard).join('');
  const statSeason=document.querySelector('#statSeason'); if(statSeason) statSeason.textContent=CLUB.stats.season;
  const statMeetings=document.querySelector('#statMeetings'); if(statMeetings) statMeetings.textContent=CLUB.stats.meetings;
  const statOfficers=document.querySelector('#statOfficers'); if(statOfficers) statOfficers.textContent=CLUB.stats.officers;
  const statMembers=document.querySelector('#statMembers'); if(statMembers) statMembers.textContent=CLUB.stats.members;
}

// Search and role filters on the roster page.
const q=document.querySelector('#rosterSearch');
const rosterGrid=document.querySelector('#rosterGrid');
let activeFilter='All';
function filterRoster(){
  if(!rosterGrid) return;
  const v=(q?.value||'').toLowerCase();
  rosterGrid.querySelectorAll('.person').forEach(card=>{
    const role=card.dataset.role||'';
    const matchesText=card.innerText.toLowerCase().includes(v);
    const matchesRole=activeFilter==='All'||role===activeFilter;
    card.style.display=(matchesText&&matchesRole)?'block':'none';
  });
}
if(q) q.addEventListener('input',filterRoster);
document.querySelectorAll('[data-filter]').forEach(btn=>btn.addEventListener('click',()=>{
  document.querySelectorAll('[data-filter]').forEach(x=>x.classList.remove('active'));
  btn.classList.add('active');
  activeFilter=btn.dataset.filter||'All';
  filterRoster();
}));
