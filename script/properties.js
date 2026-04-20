// Get all property cards and filter buttons
const cards = document.querySelectorAll('.card');
const filterAll = document.getElementById('filter-all');
const filterBuy = document.getElementById('filter-buy');
const filterRent = document.getElementById('filter-rent');
const propertyCount = document.getElementById('property-count');

// Filter function
function filterProperties(filterType) {
  let visibleCount = 0;
  
  cards.forEach(card => {
    const tag = card.querySelector('.tag');
    const tagText = tag.textContent.trim().toLowerCase();
    
    if (filterType === 'all') {
      card.style.display = 'block';
      visibleCount++;
    } else if (tagText === filterType) {
      card.style.display = 'block';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });
  
  // Update property count
  propertyCount.textContent = visibleCount;
}

// Function to update active button styling
function setActiveButton(activeBtn) {
  // Remove active styling from all buttons
  [filterAll, filterBuy, filterRent].forEach(btn => {
    btn.classList.remove('bg-[#0b2545]', 'text-white');
    btn.classList.add('border', 'border-gray-300', 'text-slate-700');
  });
  
  // Add active styling to clicked button
  activeBtn.classList.remove('border', 'border-gray-300', 'text-slate-700');
  activeBtn.classList.add('bg-[#0b2545]', 'text-white');
}

// Event listeners for filter buttons
filterAll.addEventListener('click', () => {
  setActiveButton(filterAll);
  filterProperties('all');
});

filterBuy.addEventListener('click', () => {
  setActiveButton(filterBuy);
  filterProperties('buy');
});

filterRent.addEventListener('click', () => {
  setActiveButton(filterRent);
  filterProperties('rent');
});

// Initialize - show all properties on page load
filterProperties('all');