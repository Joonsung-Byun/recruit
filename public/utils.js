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
