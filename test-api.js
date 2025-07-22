const https = require('http');

const postData = JSON.stringify({
  amount: 100,
  type: 'PURCHASE',
  description: 'Test transaction',
  category: 'DINING'
});

const options = {
  hostname: 'localhost',
  port: 3001,
  path: '/api/transactions/cmd489b520003qia0sthyxo6y/manual',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = https.request(options, (res) => {
  console.log(`statusCode: ${res.statusCode}`);
  console.log(`headers:`, res.headers);

  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log('Response:', data);
  });
});

req.on('error', (error) => {
  console.error('Error:', error);
});

req.write(postData);
req.end();
