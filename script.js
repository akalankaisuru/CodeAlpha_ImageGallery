// ---------- Get elements from the page ----------
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.getElementById('close');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let currentIndex = 0;

// Returns only the images that are currently visible (not filtered out)
function getVisibleItems() {
  return Array.from(galleryItems).filter(
    item => !item.classList.contains('hide')
  );
}

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Move the "active" style to the clicked button
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const filter = button.dataset.filter;

    galleryItems.forEach(item => {
      if (filter === 'all' || item.dataset.category === filter) {
        item.classList.remove('hide');
      } else {
        item.classList.add('hide');
      }
    });
  });
});

function showImage(index) {
  const visibleItems = getVisibleItems();
  const img = visibleItems[index].querySelector('img');
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  currentIndex = index;
}

function openLightbox(index) {
  showImage(index);
  lightbox.classList.add('show');
}

function closeLightbox() {
  lightbox.classList.remove('show');
}

function showNext() {
  const total = getVisibleItems().length;
  showImage((currentIndex + 1) % total);
}

function showPrev() {
  const total = getVisibleItems().length;
  showImage((currentIndex - 1 + total) % total);
}

// Click on a gallery image to open the lightbox
galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    const index = getVisibleItems().indexOf(item);
    openLightbox(index);
  });
});

closeBtn.addEventListener('click', closeLightbox);
nextBtn.addEventListener('click', showNext);
prevBtn.addEventListener('click', showPrev);

// Click on the dark background to close
lightbox.addEventListener('click', event => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener('keydown', event => {
  if (!lightbox.classList.contains('show')) return;

  if (event.key === 'Escape') closeLightbox();
  if (event.key === 'ArrowRight') showNext();
  if (event.key === 'ArrowLeft') showPrev();
});