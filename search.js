document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("hotelSearchForm");
  const resultsDiv = document.getElementById("hotelResults");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const destination = document.getElementById("destination").value;
    const checkin = document.getElementById("checkin").value;
    const checkout = document.getElementById("checkout").value;

    resultsDiv.innerHTML = "Searching hotels...";

    try {
      const response = await fetch("https://YOUR-VERCEL-URL/api-proxy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destination,
          checkin,
          checkout
        })
      });

      const data = await response.json();

      if (data.hotels && data.hotels.length > 0) {
        resultsDiv.innerHTML = data.hotels.map(hotel => `
          <div style="margin-bottom: 1rem; padding: 1rem; border: 1px solid #ccc;">
            <strong>${hotel.name}</strong><br/>
            ${hotel.address}<br/>
            Price: ${hotel.price} EUR
          </div>
        `).join("");
      } else {
        resultsDiv.innerHTML = "No hotels found.";
      }

    } catch (err) {
      resultsDiv.innerHTML = "An error occurred while searching.";
    }
  });
});
