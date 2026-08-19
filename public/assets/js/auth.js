// --- Настройки Supabase ---
const SUPABASE_URL = 'https://juqcvbibaaibwapziqpq.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_MIweEpVyfpOIXaZ4CF1YkA_cYlcshqs';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: true, autoRefreshToken: true }
});

function showLoggedIn(email) {
  document.getElementById('loginBox')?.classList.add('hidden');
  document.getElementById('logout-btn')?.classList.remove('hidden');
  document.querySelector('.search')?.classList.remove('hidden');
}

function showLoggedOut() {
  document.getElementById('loginBox')?.classList.remove('hidden');
  document.getElementById('logout-btn')?.classList.add('hidden');
  document.querySelector('#sj-form')?.classList.add('hidden');
}

async function checkSession() {
  const { data: { session } } = await supabase.auth.getSession();
  session ? showLoggedIn(session.user.email) : showLoggedOut();
}

document.addEventListener('DOMContentLoaded', () => {
  checkSession();

  document.getElementById('login-btn')?.addEventListener('click', async () => {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert('Ошибка входа: ' + error.message);
    else location.reload();
  });

  document.getElementById('signup-btn')?.addEventListener('click', async () => {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert('Ошибка регистрации: ' + error.message);
    else alert('Проверьте почту для подтверждения');
  });

  document.getElementById('logout-btn')?.addEventListener('click', async () => {
    await supabase.auth.signOut();
    location.reload();
  });
});
