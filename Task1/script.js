document.addEventListener("DOMContentLoaded", () => {
  const navbarToggle = document.getElementById("navbarToggle");
  const navbarCollapse = document.getElementById("navbarCollapse");
  const navbarHeader = document.getElementById("navbarHeader");
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");
  const navLinks = document.querySelectorAll(".nav-link");

  // Mobile Menu Toggle
  navbarToggle.addEventListener("click", () => {
    const isExpanded = navbarToggle.getAttribute("aria-expanded") === "true";
    navbarToggle.setAttribute("aria-expanded", !isExpanded);
    navbarToggle.classList.toggle("open");
    navbarCollapse.classList.toggle("show");
  });

  // Sticky Navbar on Scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      navbarHeader.classList.add("sticky");
    } else {
      navbarHeader.classList.remove("sticky");
    }
  });
  // Search Functionality Stub
  const handleSearch = (query) => {
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      console.log(`Search triggered for query: "${trimmedQuery}"`);
      alert(
        `Search triggered for: "${trimmedQuery}"\n(This is a JS placeholder function)`,
      );
      searchInput.value = "";
      // Close mobile menu if it is open
      if (navbarCollapse.classList.contains("show")) {
        navbarToggle.click();
      }
    }
  };

  searchButton.addEventListener("click", () => {
    handleSearch(searchInput.value);
  });

  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      handleSearch(searchInput.value);
    }
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      navLinks.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");
      if (
        window.innerWidth < 768 &&
        navbarCollapse.classList.contains("show")
      ) {
        navbarToggle.click();
      }
    });
  });
});
