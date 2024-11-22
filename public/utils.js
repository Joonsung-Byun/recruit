

function addClass() {
  let elements = document.querySelectorAll("input");
  elements.forEach((element) => {
    if (element.name == "resources") {
      return;
    } else {
      element.classList.add(
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
        "bg-gray-700"
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

  