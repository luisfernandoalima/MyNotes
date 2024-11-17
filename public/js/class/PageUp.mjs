class CreatePageUpButton {
  constructor() {
    this.btnPageUP = document.querySelector(".button-pgUp");
  }

  initialize() {
    const header = document.querySelector("header");

    const checkVisibility = () => {
        const headerBottom = header.getBoundingClientRect().bottom

        if(window.scrollY > headerBottom){
            this.btnPageUP.style.right = '20px'
        } else{
            this.btnPageUP.style.right = '-150px'
        }
    };

    window.addEventListener('scroll', checkVisibility)
  }
}

export default CreatePageUpButton