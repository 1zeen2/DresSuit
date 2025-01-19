const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', // 프론트엔드에서 API 요청 시 사용할 경로 접두사 (백엔드와 맞춰야 함)
    createProxyMiddleware({
      target: 'http://localhost', // 백엔드 서버 주소 (80번 포트이므로 포트 번호 생략 가능)
      changeOrigin: true, // CORS 문제 해결을 위한 필수 설정
      pathRewrite: { // 필요한 경우 경로 재작성
        '^/api': '', // /api를 제거하고 백엔드로 전달 (백엔드 경로에 /api가 없는 경우)
      },
    })
  );
};