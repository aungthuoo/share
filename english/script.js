// Content to be dynamically added
const dynamicContent = `
  <div class="w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-border fixed top-0 left-0 right-0"></div>
  

  <!-- Go Back -->
  <a  id="backButton" class="fixed flex items-center p-2 space-x-2 top-5 left-4 cursor-pointer">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-normal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
    </svg>
  </a>



  <!-- Logo -->
  <a href="https://infolink.vercel.app/" class="fixed flex items-center top-4 left-16">
    <span>
      <img src="https://infolink.vercel.app/static/images/logos/softwarezay.gif" alt="infolink" class="w-30 h-30 p-0"/>
      <span class="block text-xs font-bold text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text lg:hidden">InfoLink</span>
    </span>
    <span class="hidden text-xl font-bold text-transparent lg:inline bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text">InfoLink</span>
  </a>


  <!-- Toggle Icon Button -->
  <button id="menu-toggle" class="fixed p-2 bg-white rounded-full shadow-lg top-4 right-4">
    <svg class="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
    </svg>
  </button>

  <!-- Floating Menu -->
  <div id="floating-menu" class="fixed hidden p-4 bg-white border border-gray-300 rounded-lg shadow-lg top-14 right-4">
    <ul class="space-y-2">
      <li><a href="https://infolink.vercel.app/" class="block text-gray-800 hover:text-blue-600">Home</a></li>
      <li><a href="https://linkedin.com/in/aungthuoo" class="block text-gray-800 hover:text-blue-600">Contact</a></li>
    </ul>
  </div>

  <div class="fixed bottom-0 left-0 right-0 z-50 max-w-md p-1 mx-auto rounded-t-lg lg:right-auto lg:left-4 lg:mx-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-border">
    <div class="px-4 py-2 bg-white rounded-t-lg">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <a href="https://linkedin.com/in/aungthuoo">
            <img alt="" loading="lazy" decoding="async" data-nimg="1" class="h-12 w-12  p-0 bg-gray-100 rounded-full" src="https://aungthuoo.github.io/images/profile/ato.jpeg" style="color: transparent;">
          </a>
          <div>
            <p class="text-sm font-bold text-gray-700">Available for Work</p>
            <p class="text-xs text-gray-500">I am currently open to new opportunities!</p>
            <a class="text-xs text-indigo-500 hover:underline" href="https://linkedin.com/in/aungthuoo">View more</a>
          </div>
        </div>
      </div>
    </div>
  </div>
`;

// Insert the dynamic content into the body
document.body.insertAdjacentHTML('beforeend', dynamicContent);

// Add event listener for menu toggle after inserting the dynamic content
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById('menu-toggle');
  const floatingMenu = document.getElementById('floating-menu');

  if (menuToggle && floatingMenu) {
    menuToggle.addEventListener('click', () => {
      floatingMenu.classList.toggle('hidden'); // Toggle visibility
    });
  }
});

document.getElementById('backButton').addEventListener('click', function() {
  const redirectUrl = 'https://nativespeaker.vercel.app';
  window.location.href = redirectUrl;
});
