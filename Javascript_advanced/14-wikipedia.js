function createElement(data) {
    const paragraph = document.createElement("p");
    paragraph.textContent = data;
    document.body.appendChild(paragraph);
}

function queryWikipedia(callback) {
    console.log("hello")
    const url = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Stack%20Overflow&origin=*";
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';

    xhr.onreadystatechange = function () {
        console.log("request sent")
        console.log(xhr)
      if(this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        
        callback(xhr.response.query.pages["21721040"].extract);
      }
    };
  
    xhr.send();
}

queryWikipedia(createElement);