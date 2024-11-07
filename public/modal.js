class 클래스 extends HTMLElement {

    connectedCallback() {
       this.innerHTML = '<label>이름을 입력하쇼</label><input>'
    }
 }
 
 customElements.define("custom-input", 클래스);


  