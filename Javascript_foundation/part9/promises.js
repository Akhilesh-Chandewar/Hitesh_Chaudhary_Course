function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url) {
        resolve(`Data from ${url}`);
      } else {
        reject('No URL provided');
      }
    }, 2000);
  });
}

fetchData()
  .then((data) => console.log(data))
  .catch((error) => console.error(error));

fetchData('https://api.example.com/data')
    .then(
        (data) => {
            console.log(data);
            return fetchData('https://api.example.com/other-data');
        }
    )
    .then((otherData) => console.log(otherData))
    .then(() => console.log('All done!'))
    .catch((error) => console.error(error));