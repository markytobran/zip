// Listen for submit
document.getElementById("zipForm").addEventListener("submit", getInfo);

document.querySelector("body").addEventListener("click", deleteLocation);

function getInfo(e) {
  const input = document.querySelector("#input").value;

  fetch(`http://api.zippopotam.us/GB/${input}`)
    .then(response => {
      if (response.status !== 200) {
        showIcon("remove");
        document.querySelector("#output").innerHTML = `

             <article class="message is-danger">
             <div class="message-body">Invalid Zipcode, please try again</div></article>
            
             `;
        throw Error(response.statusText);
      } else {
        showIcon("check");
        return response.json();
      }
    })
    .then(data => {
      // Show location info
      let output = "";
      data.places.forEach(place => {
        output += `
            <article class="message is-success">
            <div class="message-header">
                <p>Location Info</p>
                <button class="delete"></button>
            </div>
            <div class="message-body">
              <ul>
                <li><strong>City:</strong>${place[`place name`]}</li>
                <li><strong>State:</strong>${place.state}</li>
                <li><strong>Latitude:</strong>${place.latitude}</li>
                <li><strong>City:</strong>${place.longitude}</li>
              </ul>
            </div>
          `;
        document.querySelector("#output").innerHTML = output;
      });
    })
    .catch(err => console.log(err));

  e.preventDefault();
}

function showIcon(icon) {
  // Clear icons
  document.querySelector(".icon-remove").style.display = "none";
  document.querySelector(".icon-check").style.display = "none";

  // Show correct icon
  document.querySelector(`.icon-${icon}`).style.display = "inline-flex";
}

// Delete location box
function deleteLocation(e) {
  if (e.target.className === "delete") {
    document.querySelector(".message").remove();
    document.querySelector("#input").value = "";
    document.querySelector(".icon-check").remove();
  }
}
