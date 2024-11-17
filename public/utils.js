function renderEditarrays(ul, array, input, value, role) {
    ul.innerHTML = "";
    if (role === "members") {

      if (value) array.push(value);
      array.forEach((member) => {
        let tag = document.createElement("span");
        tag.textContent = member;
        tag.classList.add("border","border-gray-300","rounded-lg","px-4","py-2","m-2","relative");
        ul.appendChild(tag);
        let editMemberdeleteBtn = createXbutton(role, array);
        tag.appendChild(editMemberdeleteBtn);
      });
      input.value = "";
      return;
    } else {
        array.forEach((resource) => {
        let tag = document.createElement("a");
        tag.textContent = resource.name;
        tag.classList.add("border","mt-2","border-gray-300","rounded-lg","px-4","py-2","relative", "z-10");
        tag.addEventListener("click", (e) => {
          e.preventDefault();
        });   
        ul.appendChild(tag);

        let editResourcedeleteBtn = createXbutton(role, array);
        tag.appendChild(editResourcedeleteBtn);
      });
      let editInput = document.querySelector("#edit_resources");
      editInput.addEventListener("change", async (e) => {
        uploadEditFile(e, array);
      });
      return
    }
}

async function uploadEditFile(e, array) {
  {
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
            addEditResources(sendingData, array);
          } else {
            const sendingData = {
              url: data.url,
              name: data.name,
            };
            addEditResources(sendingData, array);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
    }
}

function addEditResources(data, array) {
    array.push(data);
    console.log(array);
    const ul = document.querySelector("#edit_resourcesUl");
    ul.innerHTML = "";

    array.forEach((resource) => {
      let tag = document.createElement("a");
      tag.textContent = resource.name;
      tag.classList.add("border","mt-2","border-gray-300","rounded-lg","px-4","py-2","relative", "z-10");
      tag.addEventListener("click", (e) => {
        e.preventDefault();
      });
      ul.appendChild(tag);

      let editResourcedeleteBtn = createXbutton("resources", array);
      tag.appendChild(editResourcedeleteBtn);
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

function createXbutton(role, array) {
  const removeBtn = document.createElement("img");
  removeBtn.src = "/images/x.jpg";
  
  removeBtn.classList.add("absolute","flex","justify-center","items-center","-right-4","-top-4","w-6","h-6","rounded-full","z-50", "cursor-pointer");

  if(role === "resources") {
    console.log(array)
    removeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.target.parentElement.remove();
      console.log(e.target.parentElement.textContent);
      const index = array.findIndex((obj) => obj.name === e.target.parentElement.textContent);
      array.splice(index, 1);
    });
  } else if (role === "members") {
    removeBtn.addEventListener("click", (e) => {
      e.target.parentElement.remove();
      array.splice(array.indexOf(e.target.parentElement.textContent), 1);
    });

  }

  return removeBtn;
}

  async function downloadFile(resource){
    console.log(resource)
    let url = resource.href;
    const result = await fetch(url); 
    const file = await result.blob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(file);
    link.download = resource.textContent;
    link.click();
  }

  const loadingSpinner = document.createElement('div');
loadingSpinner.setAttribute('role', 'status');
loadingSpinner.innerHTML = `
  <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
  </svg>
  <span class="sr-only">Loading...</span>
`;

// 로딩 스피너를 DOM에 추가
document.body.appendChild(loadingSpinner);