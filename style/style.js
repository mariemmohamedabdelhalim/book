// الوصول إلى العناصر في الصفحة
const nameInput = document.getElementById('name');
const siteInput = document.getElementById('site');
const submitButton = document.querySelector('.btn');
const lastSection = document.querySelector('.last_section');
const errorModal = document.getElementById('errorModal');
const closeModalButton = document.getElementById('closeModal');

// تحميل المواقع المخزنة من localStorage
function loadBookmarks() {
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
  
  // إعادة بناء الجدول
  lastSection.innerHTML = `
    <table class="table table-bordered">
      <thead class="thead-light">
        <tr>
          <th scope="col">Index</th>
          <th scope="col">Website Name</th>
          <th scope="col">Visit</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody>
      </tbody>
    </table>
  `;

  const tableBody = lastSection.querySelector('tbody');

  // إضافة المواقع المخزنة في localStorage إلى الجدول
  bookmarks.forEach((bookmark, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${bookmark.name}</td>
      <td>
        <a href="${bookmark.url}" target="_blank" class="btn btn-success">
          <i class="fas fa-external-link-alt"></i> Visit
        </a>
      </td>
      <td>
        <button class="btn btn-danger" onclick="deleteBookmark(${index})">
          <i class="fas fa-trash-alt"></i> Delete
        </button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// إضافة موقع جديد
submitButton.addEventListener('click', (event) => {
  const name = nameInput.value.trim();
  const url = siteInput.value.trim();

  if (name.length < 3 || !isValidURL(url)) {
    event.preventDefault(); // إيقاف إرسال النموذج إذا كانت المدخلات غير صحيحة
    showErrorModal(); // عرض النافذة المنبثقة
  } else {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    bookmarks.push({ name, url });
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    nameInput.value = '';
    siteInput.value = '';
    loadBookmarks(); // تحديث عرض المواقع
  }
});

// عرض النافذة المنبثقة
function showErrorModal() {
  errorModal.style.display = "block";
}

// إغلاق النافذة المنبثقة
closeModalButton.addEventListener("click", () => {
  errorModal.style.display = "none";
});

// وظيفة للتحقق من صلاحية URL
function isValidURL(url) {
  const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/[^\s]*)?$/;
  return urlPattern.test(url);
}

// حذف موقع
function deleteBookmark(index) {
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
  bookmarks.splice(index, 1);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  loadBookmarks(); // تحديث عرض المواقع
}

// تحميل المواقع عند تحميل الصفحة
loadBookmarks();