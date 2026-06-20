
function fetch(params) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("Server Error"));
    }, 1000);
  });
}

const catchError = async () => {
    try {
      const params = {
        model: "v1",
        brand: '42dot',
      }
      throw fetch(params);
    } catch (error) {
        console.error(error);
    }
}

catchError();
