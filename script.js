const form = document.getElementById('leadForm');
const API_URL = 'https://my1001175.de1.demo.crm.cloud.sap/sap/c4c/api/v1/lead-service/leads';

form.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevents form from submitting the default way

  // Get selected model value and text
  const modelSelect = document.getElementById('model2_KUT');
  const modelValue = modelSelect.value;
  const modelText = modelSelect.options[modelSelect.selectedIndex].text;
  
  // Get customer information
  const givenName = document.getElementById('individualCustomerGivenName').value;
  const familyName = document.getElementById('individualCustomerFamilyName').value;
  const customerName = `${givenName} ${familyName}`;
  
  // Construct payload
  const payload = {
    "name": `${modelText} for ${customerName}`,
    "source": "3",
    "qualification": "1",
    "individualCustomer": {
      "displayId": "1008960"
    },
    "products": [
      {
        "displayId": "TY-RAV4",
        "quantity": {
          "content": 1,
          "unitCode": "EA",
          "unitDescription": "Each"
        }
      }
    ],
    "notes": [
      {
        "content": `Customer ${customerName} is interested in ${modelText}`
      }
    ],
    "extensions": {
      "LeadType": "B2C"
    }
  };

  // Encode username and password for Basic Authentication
  const username = 'SERVICE_API_USER';
  const password = '9p-!@JDOYE7,A87JhZcWsdXNpVOj8h';
  const encodedCredentials = btoa(`${username}:${password}`);

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${encodedCredentials}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      const responseData = await response.json();
      const leadNumber = responseData.value.displayId;
      console.log('Lead submitted successfully:', responseData);
      alert(`Lead #${leadNumber} has been created successfully!`);
      form.reset(); // Optional: reset the form after successful submission
    } else {
      const errorData = await response.text();
      console.error('API responded with an error:', errorData);
      alert('Error submitting lead. Check console for details.');
    }
  } catch (error) {
    console.error('Network or server error:', error);
    alert('Network or server error. Check console for details.');
  }
});
