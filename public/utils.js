function renderEditarrays(ul, array, input, value, role) {
    ul.innerHTML = "";
    if (role === "members") {
      if (value) {
        array.push(value);
      }
      array.forEach((member) => {
        let tag = document.createElement("span");
        tag.textContent = member;
        tag.classList.add(
          "border",
          "border-gray-300",
          "rounded-lg",
          "px-4",
          "py-2",
          "m-2",
          "relative"
        );
        ul.appendChild(tag);
    
        //삭제 기능만들기
        let editMemberdeleteBtn = document.createElement("button");
        editMemberdeleteBtn.textContent = "x";
        editMemberdeleteBtn.classList.add(
          "absolute",
          "flex",
          "justify-center",
          "items-center",
          "-right-4",
          "-top-4",
          "text-red-500",
          "bg-red-400",
          "text-black",
          "w-6",
          "h-6",
          "rounded-full",
          "hover:bg-red-500",
          "hover:text-white",
          "transition",
          "duration-300",
          "ease-in-out"
        );
    
        //클릭시에
        editMemberdeleteBtn.addEventListener("click", (e) => {
          e.target.parentElement.remove();
          array.splice(array.indexOf(e.target.parentElement.textContent), 1);
        });
        tag.appendChild(editMemberdeleteBtn);
      });
      input.value = "";
    }
  
    if (role === "resources") {
      array.forEach((resource) => {
          let tag = document.createElement("a");
          tag.textContent = resource.name;
          tag.classList.add(
            "border",
            "mt-2",
            "border-gray-300",
            "rounded-lg",
            "px-4",
            "py-2",
            "relative",
            "z-10"
          );
          tag.addEventListener("click", (e) => {
            e.preventDefault();
          });
      
          ul.appendChild(tag);
      
          //삭제 기능만들기
          let editResourcedeleteBtn = document.createElement("button");
          editResourcedeleteBtn.textContent = "x";
          editResourcedeleteBtn.classList.add(
            "absolute",
            "flex",
            "justify-center",
            "items-center",
            "-right-6",
            "-top-6",
            "text-red-500",
            "bg-red-400",
            "text-black",
            "w-6",
            "h-6",
            "rounded-full",
            "hover:bg-red-500",
            "hover:text-white",
            "transition",
            "duration-300",
            "ease-in-out",
            "z-50"
          );
          editResourcedeleteBtn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            e.target.parentElement.remove();
      
            array.splice(array.indexOf(e.target.parentElement.textContent),1);
          });
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
  
  function createXbutton(tag, resourcesArr) {
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "x";
    removeBtn.classList.add(
      "absolute",
      "flex",
      "justify-center",
      "items-center",
      "-right-6",
      "-top-6",
      "text-red-500",
      "bg-red-400",
      "text-black",
      "w-6",
      "h-6",
      "rounded-full",
      "hover:bg-red-500",
      "hover:text-white",
      "transition",
      "duration-300",
      "ease-in-out",
      "z-50"
    );
  
    removeBtn.addEventListener("click", (e) => {
      console.log('x클릭')
      e.preventDefault();
      e.stopPropagation();
      const index = resourcesArr.indexOf(tag.textContent);
      resourcesArr.splice(index, 1);
      tag.remove();
    });
  
    return removeBtn;
  }

  function addSeconds(time) {
    return time + ":00";
  }