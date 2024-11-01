function getPostings() {
  axios
    .get("/postings")
    .then((response) => {
      renderPostings(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
}

function renderPostings(postings) {
  let postingsContainer = document.querySelector("#postings");
  postingsContainer.innerHTML = "";
  postings.forEach((posting) => {
    console.log(typeof posting.startTime)
    let postingElement = document.createElement("div");
    postingElement.innerHTML = `
        <div class="overflow-hidden sm:rounded-lg bg-slate-100" data-id="${posting.id}">
            <div class="px-4 py-5 sm:px-6">
                <h3 class="text-lg font-medium leading-6 text-gray-900">${posting.groupName}</h3>
                <p class="mt-1 max-w-2xl text-sm text-gray-500">${posting.location}</p>
            </div>
            <div class="border-t border-gray-200">
                <dl>
                    <div class=" px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">Date</dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:col-span-2">${posting.date}</dd>
                    </div>
                    <div class=" px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">Members</dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:col-span-2">${posting.members}</dd>
                    </div>
                    <div class=" px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">Start Time</dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:col-span-2">${posting.startTime.slice(0, -3)}</dd>
                    </div>
                    <div class=" px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">End Time</dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:col-span-2">${posting.endTime.slice(0, -3)}</dd>
                    </div>
                    <div class=" px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">Resources</dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:col-span-2">${posting.resources}</dd>  
                    </div>
                    <div class=" px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">Topic</dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:col-span-2">${posting.topic}</dd>  
                    </div>
                </dl>
            </div>
        </div>
    `;
    postingsContainer.appendChild(postingElement);
  });
}

function addClass() {
  let elements = document.querySelectorAll("input");
  elements.forEach((element) => {
    if (element.name == "resources") {
      return;
    } else {
      element.classList.add(
        "bg-gray-50",
        "border",
        "border-gray-300",
        "text-gray-900",
        "text-sm",
        "rounded-lg",
        "focus:ring-primary-600",
        "focus:border-primary-600",
        "block",
        "w-full",
        "p-2.5",
        "dark:bg-gray-700",
        "dark:border-gray-600",
        "dark:placeholder-gray-400",
        "dark:text-white",
        "dark:focus:ring-primary-500"
      );
    }
  });

  let labels = document.querySelectorAll("label");
  labels.forEach((label) => {
    //block mb-2 text-sm font-medium text-gray-900 dark:text-white
    label.classList.add(
      "block",
      "mb-2",
      "text-sm",
      "font-medium",
      "text-gray-900",
      "dark:text-white"
    );
  });
}

const membersInput = document.querySelector("#members");
const membersArr = [];
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
      console.log(membersArr);
      tag.classList.add("border", "border-gray-300", "rounded-lg", "px-4", "py-2" , "m-2", 'relative');

      // remove btn -> <svg class="h-8 w-8 text-red-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <line x1="18" y1="6" x2="6" y2="18" />  <line x1="6" y1="6" x2="18" y2="18" /></svg>
      const removeBtn = document.createElement("button");
      removeBtn.textContent = "x";
      removeBtn.classList.add("absolute", 'flex' , 'justify-center', 'items-center' , "-right-4", "-top-4", "text-red-500", 'bg-red-400', 'text-black', 'w-6', 'h-6', 'rounded-full', 'hover:bg-red-500', 'hover:text-white', 'transition', 'duration-300', 'ease-in-out');
      removeBtn.addEventListener("click", (e) => {
        const index = membersArr.indexOf(tag.textContent);
        membersArr.splice(index, 1);
        tag.remove();
      });

      tag.appendChild(removeBtn);


      membersUl.appendChild(tag);
      membersInput.value = "";
    }
  }
}
membersInput.addEventListener("keydown", (e) => {addMembers(e)});

const imageInput = document.querySelector("#resources");

let resourcesArr = [];
function addResources(url, name) {
  resourcesArr.push(url);
  const resourcesUl = document.querySelector("#resourcesUl");
  resourcesUl.innerHTML = "";
  //file name will be name, and href is url
  resourcesArr.forEach((resource) => {
    const tag = document.createElement("a");
    tag.textContent = name;
    tag.href = url;
    tag.target = "_blank";
    tag.classList.add("border", "border-gray-300", "rounded-lg", "px-4", "py-2" , "m-2", 'relative');
    // remove btn -> <svg class="h-8 w-8 text-red-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <line x1="18" y1="6" x2="6" y2="18" />  <line x1="6" y1="6" x2="18" y2="18" /></svg>
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "x";
    removeBtn.classList.add("absolute", 'flex' , 'justify-center', 'items-center' , "-right-4", "-top-4", "text-red-500", 'bg-red-400', 'text-black', 'w-6', 'h-6', 'rounded-full', 'hover:bg-red-500', 'hover:text-white', 'transition', 'duration-300', 'ease-in-out');
    removeBtn.addEventListener("click", (e) => {
      const index = resourcesArr.indexOf(tag.textContent);
      resourcesArr.splice(index, 1);
      tag.remove();
    });

    tag.appendChild(removeBtn);
    resourcesUl.appendChild(tag);

  });
}


imageInput.addEventListener("change", async (e) => {
  console.log('debugging1')
  const file = e.target.files[0];
  if (!file) {
    console.error("No file selected");
    return;
  }

  if (file) {
    const formData = new FormData();
    formData.append("file", file);
    console.log('debugging2')
    fetch("/imgUpload", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        console.log('debugging3')
        return res.json();
      })
      .then((data) => {
        console.log('debugging4')
        console.log(data.name)
        if(data.url.indexOf(' ') ) {
          let goodUrl = data.url.replace(/\s/g, '%20');
          addResources(goodUrl, data.name);
        } else {
          addResources(data.url, data.name);
        }

      }).catch((err) => {
        console.error(err);
      })
  }
});


function addSeconds (time){
  return time + ":00"
}

function addPosting() {
  let groupName = document.getElementById("name").value;
  let location = document.getElementById("location").value;
  let members = membersArr.join(", ");
  let date = document.getElementById("date").value;
  let startTime = document.getElementById("startTime").value;
  let endTime = document.getElementById("endTime").value;
  let resources = document.getElementById("resources").value;
  let topic = document.getElementById("topic").value;

  console.log(members)
  let newPosting = {
    groupName: groupName,
    location: location,
    members: members,
    date: date,
    startTime: addSeconds(startTime),
    endTime: addSeconds(endTime),
    resources: resources,
    topic: topic,
  };
  axios({
    method: "post",
    url: "/postings",
    data: newPosting,
  })
    .then((response) => {
      renderPostings(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
}




document.querySelector("#submitBtn").addEventListener("click", addPosting);
addClass();
getPostings();