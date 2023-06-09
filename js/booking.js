function getData() {
  const dataList = document.getElementById("dataList");
  while (dataList.firstChild) {
    dataList.removeChild(dataList.lastChild);
  }

  fetch("/view")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      data.forEach(function (item) {
        let listItem = document.createElement("p");
        listItem.textContent = item.name + " - " + item.email;
        dataList.appendChild(listItem);
      });
    })
    .catch(function (error) {
      console.error("Error:", error);
      alert("An error occurred!");
    });
}
getData();
