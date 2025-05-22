function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = { name: "John", age: 30 };
            resolve(data);
        }, 2000);
    });
}

// fetchData()
//     .then((data) => {
//         console.log("Data fetched:", data);
//     })
//     .catch((error) => {
//         console.error("Error fetching data:", error);
//     });


async function fetchDataAsync() {
    try {
        const data = await fetchData();
        console.log("Data fetched:", data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

fetchDataAsync();