/** @type {import('next').NextConfig} */

// CSP prudente: sem hosts remotos de script/imagem/estilo (o site usa só
// assets locais em /public), sem `frame-ancestors`/clickjacking, sem
// permitir objetos plugin.
//
// `script-src` inclui 'unsafe-inline' com justificativa: este site depende
// da renderização estática do App Router (SSG/ISR) para atingir as metas de
// LCP/TBT do projeto. O App Router injeta o payload de hidratação (RSC) em
// `<script>` inline, e essas páginas ficam em cache — um nonce por
// requisição (a alternativa "correta" de livro-texto) fica sempre
// dessincronizado do nonce já embutido no HTML em cache, o que quebra a
// hidratação silenciosamente. Hash-based CSP também não é viável aqui: o
// hash desses scripts muda a cada build. Mitigação: a aplicação não usa
// `dangerouslySetInnerHTML` em nenhum lugar exceto o componente `JsonLd`
// (dados JSON escapados, tipo `application/ld+json`, não executável), e
// todo o conteúdo dinâmico passa pelo escape automático do JSX.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self' data:",
  "connect-src 'self' https://viacep.com.br",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join('; ');

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Content-Security-Policy', value: csp },
];

const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
