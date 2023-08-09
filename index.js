const http = require('http');
const fs = require('fs');
const path = require('path');

const uploadDir = path.join(__dirname, 'uploads'); // Diretório de uploads
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir); // Cria o diretório de uploads se ele não existir
}

const server = http.createServer((req, res) => {
  if (req.method === 'PUT') {
    const extension = path.extname(req.url); // Obtém a extensão do arquivo da URL
    const fileName = generateRandomString(10) + extension;
    const filePath = path.join(uploadDir, fileName);
    const writeStream = fs.createWriteStream(filePath);

    req.pipe(writeStream);

    writeStream.on('finish', () => {
      console.log('Arquivo enviado e salvo com sucesso.');
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Arquivo enviado e salvo com sucesso.\n');
    });

    writeStream.on('error', (err) => {
      console.error('Erro ao salvar o arquivo:', err);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Erro ao salvar o arquivo.\n');
    });
  } else {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('Requisição inválida.\n');
  }
});

const PORT = 3000; // Altere a porta conforme necessário
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});


function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      result += characters.charAt(randomIndex);
    }
    
    return result;
  }