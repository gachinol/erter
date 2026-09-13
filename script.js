const fileInput = document.querySelector('#fileInput');
const chooseButton = document.querySelector('#chooseButton');
const dropZone = document.querySelector('#dropZone');
const previewImage = document.querySelector('#previewImage');
const prompt = document.querySelector('#prompt');
const charCount = document.querySelector('#charCount');
const generateButton = document.querySelector('#generateButton');
const notice = document.querySelector('#notice');

document.querySelectorAll('[data-scroll]').forEach(button => button.addEventListener('click', () => document.querySelector(button.dataset.scroll).scrollIntoView({behavior:'smooth'})));
chooseButton.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', () => showImage(fileInput.files[0]));
['dragenter','dragover'].forEach(type => dropZone.addEventListener(type, event => {event.preventDefault(); dropZone.classList.add('dragging')}));
['dragleave','drop'].forEach(type => dropZone.addEventListener(type, event => {event.preventDefault(); dropZone.classList.remove('dragging')}));
dropZone.addEventListener('drop', event => showImage(event.dataTransfer.files[0]));
function showImage(file){if(!file || !file.type.startsWith('image/')) return; previewImage.src=URL.createObjectURL(file); dropZone.classList.add('has-image');}
prompt.addEventListener('input', () => charCount.textContent = prompt.value.length);
document.querySelectorAll('.chip').forEach(chip => chip.addEventListener('click', () => {document.querySelector('.chip.active').classList.remove('active'); chip.classList.add('active')}));
generateButton.addEventListener('click', () => {
  if(!dropZone.classList.contains('has-image')) { notice.textContent='먼저 움직임을 만들 사진을 선택해주세요.'; return; }
  if(!prompt.value.trim()) { notice.textContent='원하는 움직임을 한 문장으로 설명해주세요.'; prompt.focus(); return; }
  generateButton.classList.add('loading'); generateButton.firstElementChild.textContent='장면을 해석하고 있어요…'; notice.textContent='GPT가 사진과 문장을 연결하고 있습니다.';
  setTimeout(() => { generateButton.classList.remove('loading'); generateButton.firstElementChild.textContent='영상 생성하기'; notice.textContent='체험이 완료됐어요. 실제 서비스에서는 영상 결과가 여기에 표시됩니다.'; }, 2400);
});
