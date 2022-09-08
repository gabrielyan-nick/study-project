const postData = async (url, data) => {
  // Функция для отправки данных.
  let res = await fetch(url, {
    method: "POST",
    body: data,
    headers: { "Content-type": "application/json" },
  });

  return await res.json();
};

async function getResource(url) {
  let res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, status: ${res.status}`);
  }

  return await res.json();
}

export {getResource};
export {postData};
