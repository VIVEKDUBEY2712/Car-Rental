document.addEventListener("DOMContentLoaded", function () {
  // === Handle Search Form (optional feature) ===
  const searchForm = document.querySelector(".search-card form");
  if (searchForm) {
    searchForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      const location = searchForm.querySelector("select").value;
      const startDate = searchForm.querySelectorAll("input[type='date']")[0].value;
      const endDate = searchForm.querySelectorAll("input[type='date']")[1].value;

      if (!location || !startDate || !endDate) {
        alert("Please fill all search fields.");
        return;
      }

      try {
        const res = await fetch("/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ location, startDate, endDate }),
        });

        const data = await res.json();
        if (data.success) {
          alert(
            "Search Successful!\nFound Cars:\n" +
              data.cars.map((c) => ${c.name} - ${c.price}).join("\n")
          );
        } else {
          alert("No cars found.");
        }
      } catch (err) {
        console.error("Error in search:", err);
        alert("Search failed. Try again.");
      }
    });
  }

  // === Handle Sign In Form ===
  const signInForm = document.getElementById("signInForm");
  if (signInForm) {
    signInForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      const firstName = document.getElementById("firstName").value.trim();
      const lastName = document.getElementById("lastName").value.trim();
      const email = document.getElementById("email").value.trim();
      const contact = document.getElementById("contact").value.trim();

      if (!firstName || !lastName || !email || !contact) {
        alert("Please fill all sign-in fields.");
        return;
      }

      if (!/^\d{10}$/.test(contact)) {
        alert("Please enter a valid 10-digit contact number.");
        return;
      }

      try {
        const res = await fetch("/signin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ firstName, lastName, email, contact }),
        });

        const data = await res.json();
        if (data.success) {
          alert(data.message);
          const modal = bootstrap.Modal.getInstance(
            document.getElementById("signInModal")
          );
          modal.hide();
          signInForm.reset();
        } else {
          alert("Submission failed.");
        }
      } catch (err) {
        console.error("Error submitting sign-in form:", err);
        alert("Something went wrong.");
      }
    });
  }
});