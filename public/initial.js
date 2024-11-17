const imageInput = document.querySelector("#resources");
let resourcesArr = [];

const membersInput = document.querySelector("#members");
const membersArr = [];

function editModal(e, posting){

  const modal = document.createElement("div");
  modal.classList.add("fixed","top-0","left-0","w-full","h-full","bg-black","bg-opacity-50","flex","justify-center","items-center");
  modal.setAttribute("id","modal");
  

  const modalContent = document.createElement("div");
  modalContent.classList.add("bg-white","p-4","rounded-lg","dark:bg-gray-800");

  //Group Name
  let editGroupName = document.createElement('div')
  editGroupName.classList.add("mb-3")

  let editNameGuide = document.createElement('h2')
  editNameGuide.textContent = "Group Name"

  let editGroupNameEdit = document.createElement('input')
  editGroupNameEdit.setAttribute("id", "nameEditInput")
  editGroupNameEdit.classList.add("border")
  editGroupNameEdit.value = posting.groupName

  editGroupName.appendChild(editNameGuide)
  editGroupName.appendChild(editGroupNameEdit)

  //Location
  let editGroupLocation = document.createElement('div')
  editGroupLocation.classList.add("mb-3")

  let editLocationGuide = document.createElement('h2')
  editLocationGuide.textContent = "Location"

  let editLocationEdit = document.createElement('input')
  editLocationEdit.classList.add("border")
  editLocationEdit.value = posting.location

  editGroupLocation.appendChild(editLocationGuide)
  editGroupLocation.appendChild(editLocationEdit)




  //Members
  let editMemberDiv = document.createElement('div')
  editMemberDiv.classList.add("mb-3")

  let editMemberDivGuide = document.createElement('h2')
  editMemberDivGuide.textContent = "Members"

  let editMemberInput = document.createElement("input");
  editMemberInput.setAttribute("type","text");
  editMemberInput.classList.add("border","border-gray-300","rounded-lg","p-2","mb-2");
  
  let editMembersArr = [...posting.members]
  let editMembers = document.createElement("ul")
  editMembers.classList.add(`editMembersUl_${posting.id}`);

  editMemberInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      posting.members.push(editMemberInput.value);
      editMembers.innerHTML = "";
      posting.members.forEach((member) => {
        let eachmember = document.createElement("li");
        eachmember.innerHTML = member;
        editMembers.appendChild(eachmember);
      })
      editMembersArr = [...posting.members]
      }
    })
    function renderMembers(ul, array) {
      ul.innerHTML = "";
      array.forEach((member) => {
        let eachmember = document.createElement("li");
        eachmember.innerHTML = member;
  
        let eachmemberDeleteBtn = document.createElement("span");
        eachmemberDeleteBtn.textContent = "X";
        eachmemberDeleteBtn.addEventListener("click", (e) => {
          deleteEditMember(e, array, ul);
        })
  
        eachmember.appendChild(eachmemberDeleteBtn);
        ul.appendChild(eachmember);
  
      });
    }

    function deleteEditMember(e, array, ul) {
      e.target.parentElement.remove();
      array.splice(array.indexOf(e.target.parentElement.textContent.slice(0, -1)), 1);
      console.log("deleteEditMember",array);
      editMembersArr = [...array]
      renderMembers(ul, array);
    }
    renderMembers(editMembers, posting.members,  editMembersArr)
    


  editMemberDiv.appendChild(editMemberDivGuide)
  editMemberDiv.appendChild(editMemberInput)
  editMemberDiv.appendChild(editMembers)



  //Resources
  let editResourcesArr = [...posting.resources]
  let editResources = document.createElement('div')
  editResources.classList.add("mb-3")

  let editResourcesGuide = document.createElement('h2')
  editResourcesGuide.textContent = "Resources"



  let editResourcesLoading = document.createElement("span");
  editResourcesLoading.setAttribute('role', 'status');
  editResourcesLoading.classList.add("hidden");
  editResourcesLoading.innerHTML = `
    <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
  `;

  let editResourcesUl = document.createElement("ul")
  editResourcesUl.classList.add("flex","gap-2","flex-wrap")

  posting.resources.forEach((resource) => {
    let eachResource = document.createElement("li");
    let resourceLink = document.createElement("a");
    resourceLink.href = resource.url;
    resourceLink.target = "_blank";
    resourceLink.textContent = resource.name;
    resourceLink.classList.add("border","border-gray-300","rounded-lg","p-2");
    eachResource.appendChild(resourceLink);
    editResourcesUl.appendChild(eachResource);
  })

  let editResourcesInput = document.createElement("input");
  editResourcesInput.setAttribute("type","file");
  
  editResourcesInput.addEventListener("change", async (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.error("No file selected");
      return;
    }
  
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      editResourcesLoading.classList.remove("hidden");
      fetch("/imgUpload", {
        method: "POST",
        body: formData,
      })
        .then((res) => {
          editResourcesLoading.classList.add("hidden");
          return res.json();
        })
        .then((data) => {
          if (data.url.indexOf(" ")) {
            let goodUrl = data.url.replace(/\s/g, "%20");
            const sendingData = {
              url: goodUrl,
              name: data.name,
            };
            editResourcesArr.push(sendingData);
            editResourcesUl.innerHTML = "";
            editResourcesArr.forEach((resource) => {
              let eachResource = document.createElement("li");
              let resourceLink = document.createElement("a");
              resourceLink.href = resource.url;
              resourceLink.target = "_blank";
              resourceLink.textContent = resource.name;
              resourceLink.classList.add("border","border-gray-300","rounded-lg","p-2");
              eachResource.appendChild(resourceLink);
              editResourcesUl.appendChild(eachResource);
            })
          } else {
            const sendingData = {
              url: data.url,
              name: data.name,
            };
            editResourcesArr.push(sendingData);
            editResourcesUl.innerHTML = "";
            editResourcesArr.forEach((resource) => {
              let eachResource = document.createElement("li");
              let resourceLink = document.createElement("a");
              resourceLink.href = resource.url;
              resourceLink.target = "_blank";
              resourceLink.textContent = resource.name;
              resourceLink.classList.add("border","border-gray-300","rounded-lg","p-2");
              eachResource.appendChild(resourceLink);
              editResourcesUl.appendChild(eachResource);

            })
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  });


  editResources.appendChild(editResourcesGuide)
  editResources.appendChild(editResourcesLoading)

  editResources.appendChild(editResourcesUl)

  editResources.appendChild(editResourcesInput)











  //Date time
  let editDateTime = document.createElement('div')
  editDateTime.classList.add("mb-3")

  let editDateTimeGuide = document.createElement('h2')
  editDateTimeGuide.textContent = "Date"

  let editDateTimeEdit = document.createElement('input')
  editDateTimeEdit.type = "date"
  editDateTimeEdit.classList.add("border")
  editDateTimeEdit.value = posting.date

  editDateTime.appendChild(editDateTimeGuide)
  editDateTime.appendChild(editDateTimeEdit)

  //Start time
  let editStartTime = document.createElement('div')
  editStartTime.classList.add("mb-3")

  let editStartTimeGuide = document.createElement('h2')
  editStartTimeGuide.textContent = "Start Time"

  let editStartTimeEdit = document.createElement('input')
  editStartTimeEdit.type = "time"
  editStartTimeEdit.classList.add("border")
  editStartTimeEdit.value = posting.startTime

  editStartTime.appendChild(editStartTimeGuide)
  editStartTime.appendChild(editStartTimeEdit)

  //End Time
  let editEndTime = document.createElement('div')
  editEndTime.classList.add("mb-3")

  let editEndTimeGuide = document.createElement('h2')
  editEndTimeGuide.textContent = "End Time"

  let editEndTimeEdit = document.createElement('input')
  editEndTimeEdit.type = "time"
  editEndTimeEdit.classList.add("border")
  editEndTimeEdit.value = posting.endTime

  editEndTime.appendChild(editEndTimeGuide)
  editEndTime.appendChild(editEndTimeEdit)


  //Topic
  let editTopic = document.createElement('div')
  editEndTime.classList.add("mb-3")

  let editTopicGuide = document.createElement('h2')
  editEndTimeGuide.textContent = "Topic"

  let editTopicEdit = document.createElement('input')
  editEndTimeEdit.type = "text"
  editEndTimeEdit.classList.add("border")
  editEndTimeEdit.value = posting.topic

  editTopic.appendChild(editTopicGuide)
  editTopic.appendChild(editTopicEdit)

  let saveChangeBtn = document.createElement('span')
  saveChangeBtn.textContent = "Save"


  saveChangeBtn.addEventListener('click', function(){
    editPosting(posting, editGroupNameEdit.value, editMembersArr, editResourcesArr )
  })

  modalContent.appendChild(editGroupName)
  modalContent.appendChild(editGroupLocation)
  modalContent.appendChild(editMemberDiv);
  modalContent.appendChild(editDateTime)
  modalContent.appendChild(editStartTime)

  modalContent.appendChild(editEndTime)
  modalContent.appendChild(editTopic)
  modalContent.appendChild(editResources)

  modalContent.appendChild(saveChangeBtn)
  modal.appendChild(modalContent);
  document.body.appendChild(modal);
}

function editPosting(posting, name, membersarr, editResourcesArr){
  const sendingData = [name, membersarr, editResourcesArr]
  console.log(sendingData[1])
    axios({
      method: 'put',
      url: `/postings/${posting.id}`,
      data: sendingData
    }).then((res)=>{
      document.querySelector('#modal').remove()
      res.data.forEach((posting) => {
        posting.members = JSON.parse(posting.members);
        posting.resources = JSON.parse(posting.resources);
      });
      renderPostings(res.data)
    })

}

function renderPostings(postings) {
  let postingsContainer = document.querySelector("#postings");
  postingsContainer.innerHTML = "";
  postings.forEach((posting) => {
    let postingElement = document.createElement("div");
    postingElement.classList.add("bg-white","border","border-gray-300","rounded-lg","p-4","mb-4","dark:bg-gray-800","basis-[46%]","md:basis-[30%]");

    let header = document.createElement("div");
    header.classList.add("flex","justify-end","items-center","mb-2","gap-2");

    let closeBtn = document.createElement("button");
    closeBtn.setAttribute("id", "d_" + posting.id);
    closeBtn.classList.add("px-2","py-1","bg-red-500","text-white","rounded-lg","mb-2","hover:bg-red-600","transition","duration-300","ease-in-out");
    closeBtn.innerHTML = "X";
    closeBtn.addEventListener("click", (e) => {
      deletePosting(e);
    });

    let editBtn = document.createElement("button");
    editBtn.setAttribute("id", "e_" + posting.id);
    editBtn.classList.add("px-2","py-1","bg-blue-500","text-white","rounded-lg","mb-2","hover:bg-blue-600","transition","duration-300","ease-in-out");
    editBtn.innerHTML = "Edit";
    editBtn.addEventListener("click", (e) => {
      editModal(e, posting);
    });

    header.appendChild(editBtn);
    header.appendChild(closeBtn);

    // Group name
    let postingTitle = document.createElement("div");
    postingTitle.classList.add("mb-2");
    postingTitle.innerHTML = `
      <h2 class="text-lg font-bold">Group Name</h2>
      <p>${posting.groupName}</p>
    `;

    // Location
    let postingLocation = document.createElement("div");
    postingLocation.classList.add("mb-2");
    postingLocation.innerHTML = `
      <h2 class="text-lg font-bold">Location</h2>
      <p>${posting.location}</p>
    `;

    // Members
    let postingMembers = document.createElement("div");
    postingMembers.classList.add("mb-2");
    let membersHTML = `
      <h2 class="text-lg font-bold">Members</h2>
      <ul class="flex gap-2">
    `;

    if (posting.members.length == 0) {
      membersHTML += `<li>No members</li>`;
    } else {
      posting.members.forEach((member) => {
        membersHTML += `
          <li> ${member}  </li>
         `;
      });
    }

    membersHTML += `</ul>`;
    postingMembers.innerHTML = membersHTML;

    // Date
    let postingDate = document.createElement("div");
    postingDate.classList.add("mb-2");
    postingDate.innerHTML = `
      <h2 class="text-lg font-bold">Date</h2>
      <p>${posting.date}</p>
    `;

    // Start time
    let postingStartTime = document.createElement("div");
    postingStartTime.classList.add("mb-2");
    postingStartTime.innerHTML = `
      <h2 class="text-lg font-bold">Start Time</h2>
      <p>${posting.startTime}</p>
    `;

    // End time
    let postingEndTime = document.createElement("div");
    postingEndTime.classList.add("mb-2");
    postingEndTime.innerHTML = `
      <h2 class="text-lg font-bold">End Time</h2>
      <p>${posting.endTime}</p>
    `;

    // Resources
    let postingResources = document.createElement("div");
    postingResources.classList.add("mb-2");
    let resourcesHTML = `
      <h2 class="text-lg font-bold">Resources</h2>
      <ul>
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
            class="underline resourceList">${resource.name}</a>
          </li>
        `;
      });
    }

    resourcesHTML += `</ul>`;
    postingResources.innerHTML = resourcesHTML;



    // Topic
    let postingTopic = document.createElement("div");
    postingTopic.classList.add("mb-2");
    postingTopic.innerHTML = `
      <h2 class="text-lg font-bold">Topic</h2>
      <p>${posting.topic}</p>
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
    // document.querySelectorAll(".resourceList").forEach((resource) => {
    //   resource.addEventListener("click", (e) => {
    //     e.preventDefault();
    //     downloadFile(resource);
    //   });
    // })
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
    console.log('enter')
    if (membersArr.includes(membersInput.value)) {
      alert("You already added this member");
      membersInput.value = "";
      return;
    } else {
      const tag = document.createElement("span");
      tag.textContent = membersInput.value;
      membersArr.push(membersInput.value);
      tag.classList.add(
        "border",
        "border-gray-300",
        "rounded-lg",
        "px-4",
        "py-2",
        "m-2",
        "relative"
      );

      // remove btn -> <svg class="h-8 w-8 text-red-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <line x1="18" y1="6" x2="6" y2="18" />  <line x1="6" y1="6" x2="18" y2="18" /></svg>
      const removeBtn = createXbutton( "members", membersArr);
      tag.appendChild(removeBtn);

      membersUl.appendChild(tag);
      membersInput.value = "";
    }
  }
}

membersInput.addEventListener("keydown", (e) => {
  addMembers(e);
})

function addResources(sentData) {
  if(resourcesArr.some(resource => resource.name === sentData.name)) {
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
      "z-10"
    );

    const removeBtn = createXbutton('resources', resourcesArr);
    tag.appendChild(removeBtn);
    resourcesUl.appendChild(tag);
  });
}

async function uploadImage(e) {
  const file = e.target.files[0];
  if (!file) {
    console.error("No file selected");
    return;
  }

  if (file) {
    const formData = new FormData();
    formData.append("file", file);
    fetch("/imgUpload", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.url.indexOf(" ")) {
          let goodUrl = data.url.replace(/\s/g, "%20");
          const sendingData = {
            url: goodUrl,
            name: data.name,
          };
          addResources(sendingData);
        } else {
          const sendingData = {
            url: data.url,
            name: data.name,
          };
          addResources(sendingData);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

imageInput.addEventListener("change", async (e) => {
  uploadImage(e);
  e.target.value = "";
});

function addPosting() {
  //validate -> groupName, location, date, startTime, endTime, topic are required
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
    startTime: (startTime),
    endTime: (endTime),
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
