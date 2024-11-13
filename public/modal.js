

class Modal extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <div id="editModal" tabindex="-1" class="hidden overflow-y-auto bg-gray-200 bg-opacity-50 overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
           <div class=" p-4 ">
               <div class=" bg-white rounded-lg mx-auto max-w-2xl shadow dark:bg-gray-700">
                   <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                       <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                           Edit your posting
                       </h3>
                       <button type="button" id="closeModalBtn" class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                           <svg class="w-3 h-3"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                               <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                           </svg>
                           <span class="sr-only">Close modal</span>
                       </button>
                   </div>
            <div class="p-4 md:p-5">
              <form id="editForm" class="space-y-4">
                <div>
                  <label for="groupName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Group Name</label>
                  <input type="text" name="groupName" id="edit_groupName" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                </div>
                <div>
                  <label for="location" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location</label>
                  <input type="text" name="location" id="edit_location" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                </div>
                <div>
                  <label for="members" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Members</label>
                  <input type="text" name="members" id="edit_members" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                  <ul id="edit_membersUl" class="flex gap-2">

                  </ul>
                </div>
                <div>
                  <label for="date" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
                  <input type="date" name="date" id="edit_date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                </div>
                <div>
                  <label for="startTime" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start Time</label>
                  <input type="time" name="startTime" id="edit_startTime" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                </div>
                <div>
                  <label for="endTime" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End Time</label>
                  <input type="time" name="endTime" id="edit_endTime" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                </div>
                <div>
                  <label for="resources" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Resources</label>
                  <input type="file" name="resources" id="edit_resources" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 " required />
                  <ul id="edit_resourcesUl" class="flex flex-wrap gap-2">

                  </ul>
                </div>
                <div>
                  <label for="topic" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Topic</label>
                  <input type="text" name="topic" id="edit_topic" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                </div>
                <button id="saveChange" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save changes</button>
              </form>
            </div>
               </div>
           </div>
       </div>`;
  }
}
customElements.define("custom-modal", Modal);
