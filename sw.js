// Define o nome e a versão do cache
const CACHE_NAME = 'site-survey-cache-v1';
// Lista de arquivos essenciais para o funcionamento offline
const FILES_TO_CACHE = [
  'tecsurvey.html',
  'manifest.json',
  'TEC_ARSA.png', // Sua logo
  'icon-192.png',   // Seu ícone
  'icon-512.png'    // Seu ícone
];

// Evento de Instalação: Salva os arquivos no cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache aberto. Adicionando arquivos essenciais.');
        return cache.addAll(FILES_TO_CACHE);
      })
  );
});

// Evento de Fetch: Intercepta as solicitações
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Se a resposta estiver no cache, retorna ela.
        // Se não, busca na rede.
        return response || fetch(event.request);
      })
  );
});