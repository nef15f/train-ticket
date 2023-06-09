document.getElementById("form1").addEventListener("submit", function (event) {
  event.preventDefault();

  let too = document.getElementById("tooo").value;
  let fromm = document.getElementById("fromm").value;
  let child = document.getElementById("chil").value;
  let adu = document.getElementById("adu").value;
  let depdate = document.getElementById("depdate").value;

  fetch("/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      too: too,
      fromm: fromm,
      child: child,
      adu: adu,
      depdate: depdate,
    }),
  });
  window.location.href = "login.html";
});
