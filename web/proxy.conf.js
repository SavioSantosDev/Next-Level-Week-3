/**
 * Arquivo de configuração para que o Angular possa se conectar com o backend sem utilizar o CORS
 * Pode ser tanto js qunto JSON
 */

const PROXY_CONFIG = [
  {
    context: ['/api'], // Convensão
    target: 'http://localhost:3000/',
    secure: false,  // https
    logLevel: 'debug',
    pathRewrite: { '^/api': '' }
    /**
     * http://localhost:3000/api/create
     * Com o pathRewrite irá alterar a linha acima para:
     * http://localhost:3000/create
     * Vai depender da situação, pode ser que estejamos utilizando uma api externa
     */
  }
]

// OBS: o package.json deverá ser modificado. E a partir daí em vez de: ng serve, rodar: npm run start.

export default PROXY_CONFIG;
