const content = window.siteContent;
const make = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};
// Optional containers let you remove a section without breaking other sections.
const add = (id, node) => document.getElementById(id)?.append(node);
for (const node of document.querySelectorAll('[data-content]')) {
  const value = content[node.dataset.content];
  if (value !== undefined) node.textContent = value;
}
for (const paragraph of content.about || []) add('about-copy', make('p', '', paragraph));
const icons = {
  listen: '<path d="M8 18H5V5h22v13H16l-8 7v-7Z"/><path d="M10 10h12M10 14h8"/>',
  self: '<circle cx="12" cy="16" r="8"/><circle cx="21" cy="16" r="8"/>',
  grow: '<path d="M16 28V14M16 21C5 21 4 13 4 10c8 0 12 4 12 11ZM16 16c0-9 5-12 12-12 0 8-3 12-12 12Z"/>'
};
for (const item of content.principles || []) {
  const card = make('article', 'approach-card');
  const icon = make('div', 'principle-icon'); icon.setAttribute('aria-hidden', 'true');
  icon.innerHTML = `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">${icons[item.icon] || icons.listen}</svg>`;
  card.append(icon, make('h3', '', item.title), make('p', '', item.description)); add('approach-cards', card);
}
for (const topic of content.topics || []) add('topics', make('span', 'topic', topic));
for (const item of content.qualifications || []) {
  const row = make('article', 'qualification');
  const badge = make('span', 'qualification-badge', 'S'); badge.setAttribute('aria-hidden', 'true');
  const text = make('div'); text.append(make('p', 'qualification-level', item.title), make('h3', '', item.subject), make('p', 'institution', item.institution));
  row.append(badge, text); add('qualification-list', row);
}
for (const item of content.questions || []) {
  const detail = make('details'); const summary = make('summary', '', item.question);
  detail.append(summary, make('p', '', item.answer)); add('question-list', detail);
}
const email = document.getElementById('email-link');
if (email) { email.textContent = content.email; email.href = `mailto:${content.email}`; }
const phone = document.getElementById('phone-link');
if (phone) { phone.textContent = content.phoneDisplay; phone.href = `tel:${content.phoneLink}`; }
const note = document.getElementById('draft-note'); if (note) note.hidden = !content.exampleContact;
const copyright = document.getElementById('copyright'); if (copyright) copyright.textContent = `© ${new Date().getFullYear()} ${content.name} · Counselling & psychotherapy`;
document.title = `${content.name} | Counselling & Psychotherapy`;
