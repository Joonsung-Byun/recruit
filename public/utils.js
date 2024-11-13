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
  }
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
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "x";
    removeBtn.classList.add("absolute","flex","justify-center","items-center","-right-6","-top-6","text-red-500","bg-red-400","w-6","h-6","rounded-full","hover:bg-red-500","hover:text-white","duration-300","ease-in-out","z-50","text-white", "transition");

    if(role === "resources") {
      removeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.target.parentElement.remove();
        array.splice(array.indexOf(e.target.parentElement.textContent),1);
      });
    } else if (role === "members") {
      removeBtn.addEventListener("click", (e) => {
        e.target.parentElement.remove();
        array.splice(array.indexOf(e.target.parentElement.textContent), 1);
      });

    }

    return removeBtn;
  }

  function addSeconds(time) {
    return time + ":00";
  }