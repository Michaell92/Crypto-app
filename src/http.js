class EasyHTTP {
  async get(link) {
    const response = await fetch(link);
    const data = await response.json();
    return data;
  }

  async post(link, data) {
    const response = await fetch(link, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resData = await response.json();
    return resData;
  }

  async update(link, data) {
    const response = await fetch(link, {
      method: "PUT",
      body: {
        "Content-type": "application;/json",
      },
      headers: JSON.stringify(data),
    });

    const resData = await response.json();
    return resData;
  }

  async delete(link) {
    const response = await fetch(link, {
      method: "Delete",
    });

    const resData = "Resource Deleted...";
    return resData;
  }
}

export const http = new EasyHTTP();
