const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function testEggsAPI() {
  const baseUrl = 'http://localhost:3000/api/eggs';
  
  try {
    // Test GET request
    console.log('Testing GET /api/eggs...');
    const getResponse = await fetch(baseUrl);
    const getData = await getResponse.json();
    console.log('GET Response:', getData);
    
    // Test POST request
    console.log('\nTesting POST /api/eggs...');
    const postResponse = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        crack_eggs: 5,
        jumbo_eggs: 10,
        normal_eggs: 15
      })
    });
    
    const postData = await postResponse.json();
    console.log('POST Response Status:', postResponse.status);
    console.log('POST Response:', postData);
    
    // Test GET again to see if data was saved
    console.log('\nTesting GET /api/eggs again...');
    const getResponse2 = await fetch(baseUrl);
    const getData2 = await getResponse2.json();
    console.log('GET Response after POST:', getData2);
    
  } catch (error) {
    console.error('Error testing API:', error);
  }
}

testEggsAPI(); 