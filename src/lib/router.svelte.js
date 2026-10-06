// Tiny hash router: #/map, #/lesson/overfitting/2, …
function parse() {
  const raw = (location.hash.replace(/^#/, '') || '/').split('?')[0];
  return raw.startsWith('/') ? raw : '/' + raw;
}

let path = $state(parse());

window.addEventListener('hashchange', () => {
  path = parse();
  window.scrollTo(0, 0);
});

export const route = {
  get path() { return path; },
  get parts() { return path.split('/').filter(Boolean); },
};

export function go(to) {
  location.hash = to;
}
