const uploadInput = document.querySelector("#userImage");
const imageTag = document.querySelector("#userPicture");
const imageText = document.querySelector(".userImageText")
uploadInput.addEventListener("change", () => {
  const file = event.target.files[0];
  imageTag.src = URL.createObjectURL(file);

  imageText.textContent = uploadInput.files[0].name
});
