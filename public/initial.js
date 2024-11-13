const imageInput = document.querySelector("#resources");
let resourcesArr = [];

const membersInput = document.querySelector("#members");
const membersArr = [];

let toggleButton = document.querySelector("#toggleButton");
let editModal = document.querySelector("#editModal");
let closeModalBtn = document.querySelector("#closeModalBtn");



function openingModal(e, posting) {
  editModal.classList.remove("hidden");

  document.querySelector("#edit_members").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      renderEditarrays(document.querySelector("#edit_membersUl"),posting.members,document.querySelector("#edit_members"), e.target.value, "members");
    }
  });

  document.querySelector("#edit_resources").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      renderEditarrays(document.querySelector("#edit_resourcesUl"),posting.resources,document.querySelector("#edit_resources"), e.target.value, "resources");
    }
  });

  closeModalBtn.addEventListener("click", () =>
    editModal.classList.add("hidden")
  );

  document.querySelector("#edit_groupName").value = posting.groupName;
  document.querySelector("#edit_location").value = posting.location;
  document.querySelector("#edit_date").value = posting.date;
  document.querySelector("#edit_startTime").value = posting.startTime;
  document.querySelector("#edit_endTime").value = posting.endTime;
  document.querySelector("#edit_topic").value = posting.topic;

  const membersUl = document.querySelector("#edit_membersUl");
  membersUl.innerHTML = "";
  renderEditarrays(document.querySelector("#edit_membersUl"), posting.members, document.querySelector("#edit_members"), e.target.value, "members");
  const resourcesUl = document.querySelector("#edit_resourcesUl");
  resourcesUl.innerHTML = "";

  renderEditarrays(document.querySelector("#edit_resourcesUl"), posting.resources, document.querySelector("#edit_resources"), e.target.value, "resources");

  document.querySelector("#saveChange").addEventListener("click", (e) => {
    editPosting(e, posting, posting.members, posting.resources,);
  });
}

function editPosting(e, posting, editMembersArr, editResourcesArr) {
  e.preventDefault();
  const id = posting.id;

  let groupName = document.getElementById("edit_groupName").value;
  let location = document.getElementById("edit_location").value;
  let date = document.getElementById("edit_date").value;
  let startTime = document.getElementById("edit_startTime").value;
  let endTime = document.getElementById("edit_endTime").value;
  let topic = document.getElementById("edit_topic").value;

  console.log(groupName, location, date, startTime, endTime, topic, editMembersArr, editResourcesArr);

  let newPosting = {
    groupName: groupName,
    location: location,
    members: editMembersArr,
    date: date,
    startTime: addSeconds(startTime),
    endTime: addSeconds(endTime),
    resources: editResourcesArr,
    topic: topic,
  };

  axios({
    method: "put",
    url: `/postings/${id}`,
    data: newPosting,
  })
    .then((response) => {
      response.data.forEach((posting) => {
        posting.members = JSON.parse(posting.members);
        posting.resources = JSON.parse(posting.resources);
      });
      renderPostings(response.data);
      editModal.classList.add("hidden");
    })
    .catch((error) => {
      console.error(error);
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

function renderPostings(postings) {
  let postingsContainer = document.querySelector("#postings");
  postingsContainer.innerHTML = "";

  console.log(postings);
  postings.forEach((posting) => {
    let postingElement = document.createElement("div");
    postingElement.classList.add(
      "bg-white",
      "border",
      "border-gray-300",
      "rounded-lg",
      "p-4",
      "mb-4",
      "dark:bg-gray-800",
      "basis-[46%]",
      "md:basis-[30%]"
    );

    let header = document.createElement("div");
    header.classList.add(
      "flex",
      "justify-end",
      "items-center",
      "mb-2",
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
      "mb-2",
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
      "mb-2",
      "hover:bg-blue-600",
      "transition",
      "duration-300",
      "ease-in-out"
    );
    editBtn.innerHTML = "Edit";
    editBtn.addEventListener("click", (e) => {
      openingModal(e, posting);
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
      console.log(posting.members);
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
      console.log(posting.resources);
      posting.resources.forEach((resource) => {
        resourcesHTML += `
          <li><a href="${resource.url}" target="_blank" class="underline">${resource.name}</a></li>
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
});

function addResources(sentData) {
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
    console.log('debuggin1')
    fetch("/imgUpload", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        console.log('debuggin2')
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
});



function addPosting() {
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
    startTime: addSeconds(startTime),
    endTime: addSeconds(endTime),
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
