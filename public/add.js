// const storeForm = document.getElementById('placeForm');
// const place_name = document.getElementById('plaseName');
// const Place_adress = document.getElementById('Place_adress');

// // Send POST to API to add store
// async function addStore(e) {
//   e.preventDefault();

//   if (place_name.value === '' || Place_adress.value === '') {
//     alert('Please fill in fields');
//   }

//   const sendBody = {
//     place_name: place_name.value,
//     Place_adress: Place_adress.value
//   };
//   console.log(sendBody)

//   try {
//     const res = await fetch('api/v1/places', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(sendBody)
//     });

//     if (res.status === 400) {
//       throw Error('place already exists!');
//     }

//     alert('place added!');
//     window.location.href = '/index.html';
//   } catch (err) {
//     alert(err);
//     return;
//   }
// }

// storeForm.addEventListener('submit', addStore);
