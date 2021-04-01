class News {
  constructor() {
    this.info = document.getElementById('news-info');
    this.main = document.getElementById('main');
  }

  // Get posts
  getData(data) {
    document.getElementById('load').style.visibility = 'visible';
    let html = '';
    for (let i = 0; i < data.length; i++) {
      const timeStamp = new Date(data[i].created_at).toDateString();
      let user = 'anon';
      let symbol = '';
      const projectType = data[i].project.type.toLowerCase();
      const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
      // Input tags around links
      const description = data[i].description.replace(
        urlRegex,
        (url) => `<a href="${url}" class="link" target ="_blank">${url}</a>`
      );

      // Check if there is valid input
      if (data[i].project.symbol) {
        symbol = data[i].project.symbol;
      }
      if (data[i].user) {
        user = data[i].user;
      }

      // Add html
      html += `
      <div class='card'>
      <div class='topInfo'>
      <span class='timeStamp'>${timeStamp}</span>
      <div class='category'><span class='${data[i].category}'>${data[
        i
      ].category.replace(
        '_',
        ' '
      )}</span><span class='${projectType}'>${projectType}</span></div>
      </div>
      <span class="description">${description}</span>
      <div class='projectInfo'>
      <div class='project'>
      <img src='${data[i].project.image.thumb}' alt='${
        data[i].project.name
      }'><span>${data[i].project.name}</span><span>${symbol}</span>
      </div>
      <span><b>Author</b>: ${user}, ${data[i].user_title}</span>
      </div>
      </div>
      `;
    }
    this.main.innerHTML += html;
  }
}

export const news = new News();
