// --- Настройки Supabase ---
const SUPABASE_URL = 'https://juqcvbibaaibwapziqpq.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_MIweEpVyfpOIXaZ4CF1YkA_cYlcshqs';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: true, autoRefreshToken: true }
});

// --- Проверка сессии при загрузке страницы ---
async function checkSession() {
  const { data: { session } } = await supabase.auth.getSession();
  if (session) {
    console.log('Уже залогинен:', session.user.email);
    document.getElementById('loginBox')?.classList.add('hidden');
  } else {
    document.getElementById('loginBox')?.classList.remove('hidden');
  }
}
checkSession();

// --- Вход ---
async function login(email, password) {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    alert('Ошибка входа: ' + error.message);
  } else {
    location.reload();
  }
}

// --- Регистрация (если нужна) ---
async function signup(email, password) {
  const { error } = await supabase.auth.signUp({ email, password });
  if (error) {
    alert('Ошибка регистрации: ' + error.message);
  } else {
    alert('Проверьте почту для подтверждения регистрации');
  }
}

// --- Выход ---
async function logout() {
  await supabase.auth.signOut();
  location.reload();
}
