class CreateMenu{
    constructor(){
        this.menu = document.querySelector("#checkbox-menu");
        this.menuLateral = document.querySelector(".menuLateral")
        this.closeMenuIcon = document.querySelector(".closeMenu")
    }

    initializeMenu(){
        this.menu.addEventListener("change", () => {
            if(this.menu.checked){
                this.menuLateral.style.right = '0px'
            }
        })

        this.closeMenuIcon.addEventListener("click", () => {
            this.menuLateral.style.right = '-500px'
            this.menu.checked = false
        })
    }
}

export default CreateMenu