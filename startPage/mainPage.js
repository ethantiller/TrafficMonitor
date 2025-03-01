
const myVariable = document.getElementById("myVariable").textContent;
myVariable = "lololol"
console.log(myVariable); // Output: Hello, JavaScript!





// async function fetchJsonFile(file) {
//     try {
//       const response = await fetch(file); // Waits until the fetch is complete
//       const data = await response.json();
//       return data                           // Returns the parsed JSON data
//     } 
//     catch (error) {
//       console.error('Error fetching the JSON file:', error);
//     }
//   }
  
//   async function getZone(file) {
//     const data =  await fetchJsonFile(file);               
//     return data ;
//   }