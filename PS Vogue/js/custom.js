document.addEventListener('DOMContentLoaded', () => {
  renderHeader('custom.html');
  renderFooter();

  const MAX_FILES = 5;
  const MAX_SIZE = 5 * 1024 * 1024; // 5MB
  let selectedFiles = [];

  const previewGrid = document.getElementById('preview-grid');
  const fileInput = document.getElementById('file-input');
  const uploadZone = document.getElementById('upload-zone');
  const form = document.getElementById('custom-form');
  const reminder = document.getElementById('whatsapp-reminder');

  /* Drag & drop */
  uploadZone.addEventListener('dragover', e => { e.preventDefault(); uploadZone.classList.add('drag-over'); });
  uploadZone.addEventListener('dragleave', () => uploadZone.classList.remove('drag-over'));
  uploadZone.addEventListener('drop', e => {
    e.preventDefault();
    uploadZone.classList.remove('drag-over');
    addFiles(Array.from(e.dataTransfer.files));
  });
  uploadZone.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', () => addFiles(Array.from(fileInput.files)));

  function addFiles(files) {
    const imageFiles = files.filter(f => f.type.startsWith('image/'));
    for (const file of imageFiles) {
      if (selectedFiles.length >= MAX_FILES) { toast(`Max ${MAX_FILES} images allowed`); break; }
      if (file.size > MAX_SIZE) { toast(`${file.name} is too large (max 5MB)`); continue; }
      selectedFiles.push(file);
    }
    renderPreviews();
    fileInput.value = '';
  }

  function renderPreviews() {
    previewGrid.innerHTML = selectedFiles.map((f, i) => {
      const url = URL.createObjectURL(f);
      return `
      <div class="preview-item" data-idx="${i}">
        <img src="${url}" alt="Reference ${i+1}" loading="lazy">
        <button class="preview-remove" data-idx="${i}" aria-label="Remove image">✕</button>
      </div>`;
    }).join('');
    const countEl = document.getElementById('upload-count');
    if (countEl) countEl.textContent = `${selectedFiles.length}/${MAX_FILES} photos selected`;
  }

  previewGrid.addEventListener('click', e => {
    const btn = e.target.closest('.preview-remove');
    if (!btn) return;
    const idx = parseInt(btn.dataset.idx);
    selectedFiles.splice(idx, 1);
    renderPreviews();
  });

  /* Form submission */
  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;

    function field(id, errId, check) {
      const el = document.getElementById(id);
      if (!el) return '';
      const err = errId ? document.getElementById(errId) : null;
      const ok = check(el.value.trim());
      el.classList.toggle('error', !ok);
      if (err) err.classList.toggle('visible', !ok);
      if (!ok) valid = false;
      return ok ? el.value.trim() : '';
    }

    const name    = field('c-name',    'c-err-name',    v => v.length >= 2);
    const phone   = field('c-phone',   'c-err-phone',   v => /^[6-9]\d{9}$/.test(v));
    const shape   = document.getElementById('c-shape').value;
    const length  = document.getElementById('c-length').value;
    const size    = document.getElementById('c-size').value;
    const occasion = document.getElementById('c-occasion').value;
    const budget  = document.getElementById('c-budget').value;
    const notes   = document.getElementById('c-notes').value.trim();

    if (!valid) return;

    const photoNote = selectedFiles.length > 0
      ? `\n\n📎 I'm sending *${selectedFiles.length} reference photo${selectedFiles.length > 1 ? 's' : ''}* in this chat next.`
      : '\n\n(No reference photos — I\'ll describe my vision in chat.)';

    const msg = `💅 *Custom Nail Request — PS Vogue*\n\nName: ${name}\nPhone: +91 ${phone}\n\nShape: ${shape}\nLength: ${length}\nSize Kit: ${size}\nOccasion: ${occasion}\nBudget: ${budget}${notes ? '\nNotes: ' + notes : ''}${photoNote}\n\nSent via website 🌐`;

    window.open(whatsappURL(msg), '_blank');

    if (selectedFiles.length > 0) {
      reminder.classList.add('visible');
      reminder.innerHTML = `📸 <strong>Don't forget!</strong> Please send your ${selectedFiles.length} reference photo${selectedFiles.length > 1 ? 's' : ''} in WhatsApp right after the message.`;
    }

    toast('Custom request sent! Check WhatsApp to complete 💅');
    form.reset();
    selectedFiles = [];
    renderPreviews();
  });
});
