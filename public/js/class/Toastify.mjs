class CreateToastify {
  showToastify(message, color) {
    Toastify({
      text: `${message}`,
      duration: 3000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: color
      },
    }).showToast();
  }

  toastError(message){
    this.color = "linear-gradient(to right, #910000, #FF4C0E)";
    this.showToastify(message,this.color)
  }

  toastSuccess(message){
    this.color = "linear-gradient(to right, #00b09b, #96c93d)"
    this.showToastify(message, this.color)
  }
}

export default CreateToastify;
