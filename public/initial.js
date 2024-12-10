const imageInput = document.querySelector("#resources");
let resourcesArr = [];
const membersInput = document.querySelector("#members");
let membersArr = [];

let show = false
const newScheduleBtn = document.querySelector("#newScheduleBtn");
newScheduleBtn.addEventListener("click", toggleNewSchedule);

//버튼을 누르면 newSchedule에 class중에서 hidden을 제거하고 grid를 추가한다
// 또한 버튼의 text를 Hidden으로 바꾼다
function toggleNewSchedule() {
  const newSchedule = document.querySelector("#newSchedule");
  console.log(newSchedule.childNodes[1])

  if (!show) {
    newSchedule.childNodes[1].classList.remove("hidden");
    newSchedule.childNodes[1].classList.add("grid")
    newScheduleBtn.textContent = "Hide";
    show = true
  } else {
    membersArr= [];
    resourcesArr = [];
    membersInput.value = "";
    imageInput.value = "";
    document.getElementById("name").value = "";
    document.getElementById("location").value = "";
    document.getElementById("date").value = "";
    document.getElementById("startTime").value = "";
    document.getElementById("endTime").value = "";
    document.getElementById("topic").value = "";
    document.querySelector("#membersUl").innerHTML = "";
    document.querySelector("#resourcesUl").innerHTML = "";
    newSchedule.childNodes[1].classList.add("hidden");
    newSchedule.childNodes[1].classList.remove("grid")
    newScheduleBtn.textContent = "Schedule a new schedule";

    show = false
  }
}


function editModal(e, posting) {
  // overall modal
  const modal = document.createElement("div");
  modal.classList.add("fixed","top-0","left-0","w-full","h-full","bg-black","bg-opacity-50","flex","justify-center","items-center");
  modal.setAttribute("id", "modal");
  
  // modal content
  const modalContent = document.createElement("div");
  modalContent.classList.add("p-4","rounded-lg","bg-gray-800", "max-w-xs", "md:max-w-xl", "lg:max-w-2xl", "w-full");


  //Group Name
  let editGroupName = document.createElement("div");
  editGroupName.classList.add("mb-3");

  let editNameGuide = document.createElement("h2");
  editNameGuide.classList.add("text-white", "mb-2");
  editNameGuide.textContent = "Group Name";

  let editGroupNameEdit = document.createElement("input");
  editGroupNameEdit.setAttribute("id", "nameEditInput");
  editGroupNameEdit.classList.add("border", "border-white" ,"px-2","py-1", "rounded", "bg-black", "border", "block", "w-full", "text-white" );
  editGroupNameEdit.value = posting.groupName;

  editGroupName.appendChild(editNameGuide);
  editGroupName.appendChild(editGroupNameEdit);


  let locationAndMembers = document.createElement("div");
  locationAndMembers.classList.add("flex", "gap-4", "flex-col", "md:flex-row");

  //Location
  let editGroupLocation = document.createElement("div");
  editGroupLocation.classList.add("mb-3", "md:basis-6/12");

  let editLocationGuide = document.createElement("h2");
  editLocationGuide.textContent = "Location";
  editLocationGuide.classList.add("text-white", "mb-2");

  let editLocationEdit = document.createElement("input");
  editLocationEdit.classList.add("border","px-2","py-1", "rounded", "bg-black", "border" , "block", "w-full", "text-white", );
  editLocationEdit.value = posting.location;

  editGroupLocation.appendChild(editLocationGuide);
  editGroupLocation.appendChild(editLocationEdit);

  //Members
  let editMemberDiv = document.createElement("div");
  editMemberDiv.classList.add("mb-3", "md:basis-6/12");

  let editMemberDivGuide = document.createElement("h2");
  editMemberDivGuide.classList.add("text-white", "mb-2");
  editMemberDivGuide.textContent = "Members";
 
  let editMemberInput = document.createElement("input");
  editMemberInput.placeholder = "Hit enter after typing a name"
  editMemberInput.setAttribute("type", "text");
  editMemberInput.classList.add("border","px-2","py-1", "rounded", "bg-black", "border", "mb-2" , "block", "w-full", "text-white" );

  let editMembers = document.createElement("ul");
  editMembers.classList.add(`editMembersUl_${posting.id}`, "flex", "gap-4", "flex-wrap");

  editMemberInput.addEventListener("keydown", (e) => { editMembersAdding(e, posting.members, editMembers, editMemberInput) });

  renderEditMembers(editMembers, posting.members);

  editMemberDiv.appendChild(editMemberDivGuide);
  editMemberDiv.appendChild(editMemberInput);
  editMemberDiv.appendChild(editMembers);

  //Resource
  let editResources = document.createElement("div");
  editResources.classList.add("mb-5");

  let editResourcesGuide = document.createElement("h2");
  editResourcesGuide.classList.add("text-white", "mb-2");
  editResourcesGuide.textContent = "Resources";

  let editResourcesLoading = loadingSpinner();

  let editResourcesUl = document.createElement("ul");
  editResourcesUl.classList.add("flex", "gap-4", "flex-wrap", "mb-8" , "w-full" );

  renderEditResources(editResourcesUl, posting.resources);

  let editResourcesInput = document.createElement("input");
  editResourcesInput.setAttribute("type", "file");
  editResourcesInput.classList.add("block","w-full","border", "border-gray-200", "shadow-sm", "rounded-lg", "text-sm", "focus:z-10", "focus:border-blue-500", "focus:ring-blue-500", "file:bg-black", "file:border-0", "file:me-4", "file:py-3", "file:px-4", "file:text-white", "mb-4", "text-white");

  editResourcesInput.addEventListener("change", async (e) => {
    uploadImage(e, "edit", editResourcesLoading, posting.resources, editResourcesUl);
    e.target.value = "";
  });

  editResources.appendChild(editResourcesGuide);
  editResources.appendChild(editResourcesLoading);
  editResources.appendChild(editResourcesInput);
  editResources.appendChild(editResourcesUl);

  const timeContainer = document.createElement("div");
  timeContainer.classList.add("flex", "gap-4", "flex-col", "md:flex-row");

  //Date time
  let editDateTime = document.createElement("div");
  editDateTime.classList.add("mb-3");

  let editDateTimeGuide = document.createElement("h2");
  editDateTimeGuide.classList.add("text-white", "mb-2");
  editDateTimeGuide.textContent = "Date";

  let editDateTimeEdit = document.createElement("input");
  editDateTimeEdit.classList.add("border", "px-2", "rounded", "bg-gray-600", "border" , "block", "w-full", "text-white", "h-10");
  editDateTimeEdit.type = "date";
  editDateTimeEdit.classList.add("border");
  editDateTimeEdit.value = posting.date;

  editDateTime.appendChild(editDateTimeGuide);
  editDateTime.appendChild(editDateTimeEdit);

  //Start time
  let editStartTime = document.createElement("div");
  editStartTime.classList.add("mb-3", "md:basis-6/12");

  let editStartTimeGuide = document.createElement("h2");
  editStartTimeGuide.classList.add("text-white", "mb-2");
  editStartTimeGuide.textContent = "Start Time";

  let editStartTimeEdit = document.createElement("input");
  editStartTimeEdit.type = "time";
  editStartTimeEdit.classList.add("border", "px-2", "rounded", "bg-gray-600",  "block", "w-full", "text-white" , "h-10");
  editStartTimeEdit.value = posting.startTime;

  editStartTime.appendChild(editStartTimeGuide);
  editStartTime.appendChild(editStartTimeEdit);

  //End Time
  let editEndTime = document.createElement("div");
  editEndTime.classList.add("mb-3", "md:basis-6/12");

  let editEndTimeGuide = document.createElement("h2");
  editEndTimeGuide.textContent = "End Time";
  editEndTimeGuide.classList.add("text-white", "mb-2");

  let editEndTimeEdit = document.createElement("input");
  editEndTimeEdit.type = "time";
  editEndTimeEdit.classList.add("border", "px-2", "rounded", "bg-gray-600", "border" , "block", "w-full", "text-white" , "h-10");
  editEndTimeEdit.value = posting.endTime;

  editEndTime.appendChild(editEndTimeGuide);
  editEndTime.appendChild(editEndTimeEdit);

  //Topic
  let editTopic = document.createElement("div");
  editTopic.setAttribute("id", "topicEdit");
  editTopic.classList.add("mb-6", );

  let editTopicGuide = document.createElement("h2");
  editTopicGuide.textContent = "Topic";
  editTopicGuide.classList.add("text-white", "mb-2");

  let editTopicEdit = document.createElement("input");
  editTopicEdit.type = "text";
  editTopicEdit.classList.add("border", "px-2", "py-1", "rounded", "bg-black", "border" , "block", "w-full", "text-white");
  editTopicEdit.value = posting.topic;

  editTopic.appendChild(editTopicGuide);
  editTopic.appendChild(editTopicEdit);

  let saveChangeBtn = document.createElement("span");
  saveChangeBtn.classList.add("cursor-pointer", "bg-blue-500", "text-white", "rounded-lg", "px-4", "py-2", "hover:bg-blue-600", "transition", "duration-300", "ease-in-out", "w-full", "text-center", "block");
  saveChangeBtn.textContent = "Save";

  saveChangeBtn.addEventListener("click", () => { 
    editPosting(posting, 
      editGroupNameEdit.value, 
      editLocationEdit.value, 
      posting.members, 
      editStartTimeEdit.value, 
      editEndTimeEdit.value, 
      editDateTimeEdit.value, 
      posting.resources, 
      editTopicEdit.value)} );

  modalContent.appendChild(editGroupName);
  locationAndMembers.appendChild(editGroupLocation);
  locationAndMembers.appendChild(editMemberDiv);
  modalContent.appendChild(locationAndMembers);
  timeContainer.appendChild(editStartTime);
  timeContainer.appendChild(editEndTime);
  modalContent.appendChild(timeContainer);
  modalContent.appendChild(editDateTime);
  modalContent.appendChild(editResources);
  modalContent.appendChild(editTopic);
  modalContent.appendChild(saveChangeBtn);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);
}

function editPosting(posting, name, location, membersarr, startTime, endTime, date, resourcesarr, topic) {
  const sendingData = [name, location, membersarr, startTime, endTime, date, resourcesarr, topic];
  console.log(sendingData)
  axios({
    method: "put",
    url: `/postings/${posting.id}`,
    data: sendingData,
  }).then((res) => {
    document.querySelector("#modal").remove();
    res.data.forEach((posting) => {
      posting.members = JSON.parse(posting.members);
      posting.resources = JSON.parse(posting.resources);
    });
    renderPostings(res.data);
  });
}

function deleteEditMember(e, array, ul) {
  e.stopPropagation();
  console.log(e.target.parentElement.textContent );
  e.target.parentElement.remove();
  array.splice(array.indexOf(e.target.parentElement.textContent),1);
  renderEditMembers(ul, array);
}

function renderEditMembers(ul, array) {
  ul.innerHTML = "";
  array.forEach((member) => {
    let eachmember = document.createElement("li");
    eachmember.innerHTML = member;
    eachmember.classList.add("border","border-gray-300","rounded-lg","px-2", "relative", "py-1", "bg-gray-900", "text-white");

    let eachmemberDeleteBtn = document.createElement("img");
    eachmemberDeleteBtn.src = "/images/x.jpg";
    eachmemberDeleteBtn.classList.add("cursor-pointer", "absolute", "-right-3", "-top-3", "w-6", "h-6", "rounded-full", "z-50");
    eachmemberDeleteBtn.addEventListener("click", (e) => {
      deleteEditMember(e, array, ul);
    });

    eachmember.appendChild(eachmemberDeleteBtn);
    ul.appendChild(eachmember);
  });
}

function editMembersAdding(e, array, ul, input){
  if (e.key === "Enter") {
    array.push(input.value);
    input.value = "";
    renderEditMembers(ul, array);
  }
}

function loadingSpinner(){
  let editResourcesLoading = document.createElement("span");
  editResourcesLoading.setAttribute("role", "status");
  editResourcesLoading.classList.add("hidden");
  editResourcesLoading.innerHTML = `
    <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
  `;
  return editResourcesLoading;
}

function renderEditResources(ul, array) {
  ul.innerHTML = "";
    array.forEach((resource) => {
    let eachResource = document.createElement("li");
    eachResource.classList.add("relative");
    let resourceLink = document.createElement("a");
    resourceLink.href = resource.url;
    resourceLink.target = "_blank";
    resourceLink.textContent = resource.name;
    resourceLink.classList.add("border","border-gray-300","rounded-lg","p-2", "bg-gray-900", "text-white");

    let eachResourceDeleteBtn = document.createElement("img");
    eachResourceDeleteBtn.src = "/images/x.jpg";
    eachResourceDeleteBtn.classList.add("cursor-pointer", "absolute", "-right-4", "-top-4", "w-6", "h-6", "rounded-full", "z-50");
    eachResourceDeleteBtn.addEventListener("click", (e) => {
      deleteEditResource(e, array, ul);
      console.log('hello')
    });
    eachResource.appendChild(resourceLink);
    eachResource.appendChild(eachResourceDeleteBtn);
    ul.appendChild(eachResource);
    })
}

function deleteEditResource(e, array, ul) {
  let index = ''
    for (let i = 0; i < array.length; i++) {
      if (array[i].name === e.target.parentElement.textContent) {
        index = i;
      } 
    }
    e.target.parentElement.remove();
    array.splice(index, 1);
    renderEditResources(ul, array);
}

function renderPostings(postings) {
  let postingsContainer = document.querySelector("#postings");
  postingsContainer.innerHTML = "";
  postings.forEach((posting) => {
    let postingElement = document.createElement("div");
    postingElement.classList.add(
      "bg-black",
      "border",
      "border-gray-300",
      "rounded-lg",
      "shadow-lg",
      "overflow-hidden",
      "mb-4",
      "basis-[46%]",
      "md:basis-[30%]"
    );

    let header = document.createElement("div");
    header.classList.add(
      "flex",
      "justify-end",
      "items-baseline",
      "bg-gray-800",
      "mb-2",
      "p-4",
      "gap-2"
    );

    let closeBtn = document.createElement("button");
    closeBtn.setAttribute("id", "d_" + posting.id);
    closeBtn.classList.add(
      "px-2",
      "py-1",
      "bg-red-500",
      "text-white",
      "rounded-lg",
      "hover:bg-red-600",
      "transition",
      "duration-300",
      "ease-in-out"
    );
    closeBtn.innerHTML = "X";
    closeBtn.addEventListener("click", (e) => {
      deletePosting(e);
    });

    let editBtn = document.createElement("button");
    editBtn.setAttribute("id", "e_" + posting.id);
    editBtn.classList.add(
      "px-2",
      "py-1",
      "bg-blue-500",
      "text-white",
      "rounded-lg",
      "hover:bg-blue-600",
      "transition",
      "duration-300",
      "ease-in-out"
    );
    editBtn.innerHTML = "Edit";
    editBtn.addEventListener("click", (e) => {
      editModal(e, posting);
    });

    header.appendChild(editBtn);
    header.appendChild(closeBtn);

    // Group name
    let postingTitle = document.createElement("div");
    postingTitle.classList.add("mb-2", "p-4");
    postingTitle.innerHTML = `
      <h2 class="text-lg font-bold text-white">Group Name</h2>
      <p class="text-gray-300 ">${posting.groupName}</p>
    `;

    // Location
    let postingLocation = document.createElement("div");
    postingLocation.classList.add("mb-2", "p-4");
    postingLocation.innerHTML = `
      <h2 class="text-lg font-bold text-white">Location</h2>
      <p class="text-gray-300">${posting.location}</p>
    `;

    // Members
    let postingMembers = document.createElement("div");
    postingMembers.classList.add("mb-2", "p-4");
    let membersHTML = `
      <h2 class="text-lg font-bold text-white">Members</h2>
      <ul class="flex gap-2 flex-wrap">
    `;

    if (posting.members.length == 0) {
      membersHTML += `<li class="text-gray-200 text-sm">No members</li>`;
    } else {
      posting.members.forEach((member, index) => {
        if(index === posting.members.length - 1){
          membersHTML += `
          <li class="text-gray-300"> ${member} </li>
         `;
        }else {
          membersHTML += `
          <li class="text-gray-300"> ${member},  </li>
         `;
        }
      });
    }

    membersHTML += `</ul>`;
    postingMembers.innerHTML = membersHTML;

    // Date
    let postingDate = document.createElement("div");
    postingDate.classList.add("mb-2", "p-4");
    postingDate.innerHTML = `
      <h2 class="text-lg font-bold text-white">Date</h2>
      <p class="text-gray-300">${posting.date}</p>
    `;

    // Start time
    let postingStartTime = document.createElement("div");
    postingStartTime.classList.add("mb-2", "p-4");
    postingStartTime.innerHTML = `
      <h2 class="text-lg font-bold text-white">Start Time</h2>
      <p class="text-gray-300">${posting.startTime}</p>
    `;

    // End time
    let postingEndTime = document.createElement("div");
    postingEndTime.classList.add("mb-2", "p-4");
    postingEndTime.innerHTML = `
      <h2 class="text-lg font-bold text-white">End Time</h2>
      <p class="text-gray-300">${posting.endTime}</p>
    `;

    // Resources
    let postingResources = document.createElement("div");
    postingResources.classList.add("mb-2", "p-4");
    let resourcesHTML = `
      <h2 class="text-lg font-bold text-white">Resources</h2>
      <ul class="flex flex-wrap gap-4">
    `;
    if (posting.resources.length == 0) {
      resourcesHTML += `<li>No resources</li>`;
    } else {
      posting.resources.forEach((resource) => {
        resourcesHTML += `
          <li>
            <a 
            href="${resource.url}" 
            target="_blank" 
            onclick="downloadFile(this)"
            class="underline resourceList text-gray-300">${resource.name}</a>
          </li>
        `;
      });
    }

    resourcesHTML += `</ul>`;
    postingResources.innerHTML = resourcesHTML;

    // Topic
    let postingTopic = document.createElement("div");
    postingTopic.classList.add("mb-2", "p-4");
    postingTopic.innerHTML = `
      <h2 class="text-lg font-bold text-white">Topic</h2>
      <p class="text-gray-300">${posting.topic}</p>
    `;

    // Append all sections to the posting element
    postingElement.appendChild(header);
    postingElement.appendChild(postingTitle);
    postingElement.appendChild(postingLocation);
    postingElement.appendChild(postingMembers);
    postingElement.appendChild(postingDate);
    postingElement.appendChild(postingStartTime);
    postingElement.appendChild(postingEndTime);
    postingElement.appendChild(postingResources);
    postingElement.appendChild(postingTopic);

    // Append the posting element to the container
    postingsContainer.appendChild(postingElement);
  });
}

function deletePosting(e) {
  const id = e.target.id.substr(2);
  axios
    .delete(`/postings/${id}`)
    .then((response) => {
      response.data.forEach((posting) => {
        posting.members = JSON.parse(posting.members);
        posting.resources = JSON.parse(posting.resources);
      });
      renderPostings(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
}

function addMembers(e) {
  const membersUl = document.querySelector("#membersUl");
  if (e.key === "Enter") {
    if (membersArr.includes(membersInput.value)) {
      alert("You already added this member");
      membersInput.value = "";
      return;
    } else {
      membersArr.push(membersInput.value);
      const tag = document.createElement("span");
      tag.textContent = membersInput.value;
      tag.classList.add("border","border-gray-300","rounded-lg","px-4","py-2","m-2","relative", "bg-gray-400");
      // remove btn -> <svg class="h-8 w-8 text-red-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <line x1="18" y1="6" x2="6" y2="18" />  <line x1="6" y1="6" x2="18" y2="18" /></svg>
      const removeBtn = createXbutton("members", membersArr);
      tag.appendChild(removeBtn);

      membersUl.appendChild(tag);
      membersInput.value = "";
    }
  }
}

membersInput.addEventListener("keydown", (e) => {
  addMembers(e);
});

function addResources(sentData, addResourcesLoading) {
  if (resourcesArr.some((resource) => resource.name === sentData.name)) {
    alert("You already added this resource");
    return;
  }

  resourcesArr.push(sentData);
  const resourcesUl = document.querySelector("#resourcesUl");
  resourcesUl.innerHTML = "";
  resourcesArr.forEach((resource) => {
    const tag = document.createElement("a");
    tag.textContent = resource.name;
    tag.href = resource.url;
    tag.target = "_blank";
    tag.classList.add(
      "border",
      "border-gray-300",
      "rounded-lg",
      "px-4",
      "py-2",
      "relative",
      "bg-gray-400"
    );

    addResourcesLoading.remove();

    const removeBtn = createXbutton("resources", resourcesArr);
    tag.appendChild(removeBtn);
    resourcesUl.appendChild(tag);
  });
}

async function uploadImage(e, role, loading, array, ul) {
  const file = e.target.files[0];
  if (!file) {
    console.error("No file selected");
    return;
  }

  const addResourcesLoading = loadingSpinner();
  addResourcesLoading.classList.remove("hidden");
 

  document.querySelector('#spinner').insertAdjacentElement("beforeend", addResourcesLoading)

  const formData = new FormData();
  formData.append("file", file);


  try {
    if (role === "edit") {
      loading.classList.remove("hidden");
    }
  
    const res = await fetch("/imgUpload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();

    if (role === "edit") {
      loading.classList.add("hidden");
    }

    const url = data.url.includes(" ") ? data.url.replace(/\s/g, "%20") : data.url;
    const sendingData = {
      url: url,
      name: data.name,
    };

    if (role === "edit") {
      array.push(sendingData);
      renderEditResources(ul, array);
      loading.classList.add("hidden");
    } else if (role === "new") {
      addResources(sendingData, addResourcesLoading);
    }
  } catch (err) {
    console.error(err);
    if (role === "edit") {
      loading.classList.add("hidden");
    }
  } finally{
    addResourcesLoading.remove();
    loading.classList.add("hidden");
  }
}

imageInput.addEventListener("change", async (e) => {
  uploadImage(e, "new");
  e.target.value = "";
});

function addPosting() {
  if (
    document.getElementById("name").value === "" ||
    document.getElementById("location").value === "" ||
    document.getElementById("date").value === "" ||
    document.getElementById("startTime").value === "" ||
    document.getElementById("endTime").value === "" ||
    document.getElementById("topic").value === ""
  ) {
    alert("Please fill out all required fields");
    return;
  }

  let groupName = document.getElementById("name").value;
  let location = document.getElementById("location").value;
  let date = document.getElementById("date").value;
  let startTime = document.getElementById("startTime").value;
  let endTime = document.getElementById("endTime").value;
  let topic = document.getElementById("topic").value;

  let newPosting = {
    groupName: groupName,
    location: location,
    members: membersArr,
    date: date,
    startTime: startTime,
    endTime: endTime,
    resources: resourcesArr,
    topic: topic,
  };

  
  axios({
    method: "post",
    url: "/postings",
    data: newPosting,
  })
    .then((response) => {
      response.data.forEach((posting) => {
        posting.members = JSON.parse(posting.members);
        posting.resources = JSON.parse(posting.resources);
      });
      renderPostings(response.data);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      document.getElementById("name").value = "";
      document.getElementById("location").value = "";
      document.getElementById("date").value = "";
      document.getElementById("startTime").value = "";
      document.getElementById("endTime").value = "";
      document.getElementById("topic").value = "";
      membersArr.length = 0;
      resourcesArr.length = 0;
      document.querySelector("#membersUl").innerHTML = "";
      document.querySelector("#resourcesUl").innerHTML = "";
    });
}

function getPostings() {
  axios
    .get("/postings")
    .then((response) => {
      response.data.forEach((posting) => {
        posting.members = JSON.parse(posting.members);
        posting.resources = JSON.parse(posting.resources);
      });
      renderPostings(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
}

document.querySelector("#submitBtn").addEventListener("click", addPosting);
addClass();
getPostings();
