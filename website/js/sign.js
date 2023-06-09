document.getElementById("myform").addEventListener("submit",
function (event){
  event.preventDefault();
  
  
  let firstname = document.getElementById("firstname").value;
  let lastname = document.getElementById("lastname").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let gender = document.getElementById("gender").value;
      fetch("/api2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstname:firstname, lastname:lastname, email:email, password:password, gender:gender }),
    }).then(function (response) {if (response.status_code == 200) {
      return response.json();
    } else {
      alert("Failed to insert data!");
      throw new Error("oops backend");
    }
  })
  .catch(function (error) {
    
    alert("An error occurred!");
  });
});


   
