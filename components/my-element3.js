import { LitElement, html } from 'lit-element';

class MyElement3 extends LitElement {
  static get properties() { return {
    myProp: { attribute: true },
    theProp: { attribute: false },
    prop1: { type: String, reflect: true },
    prop2: { type: Number, reflect: true },
    prop3: { type: Boolean, reflect: true },
    prop4: { type: Array, reflect: true },
    prop5: { type: Object, reflect: true }
  };}

  constructor() {
    super();
    this.myProp = 'myProp';
    this.theProp = 'theProp';
    this.prop1 = '';
    this.prop2 = 0;
    this.prop3 = false;
    this.prop4 = [];
    this.prop5 = { };
  }

  attributeChangedCallback(name, oldval, newval) {
    console.log('attribute change: ', name, newval);
    super.attributeChangedCallback(name, oldval, newval);
  }

  render() {
    return html`
      <p>myProp ${this.myProp}</p>
      <p>theProp ${this.theProp}</p>
      

      <button @click="${this.changeAttributes}">change attributes</button>
      <p>prop1 ${this.prop1}</p>
      <p>prop2 ${this.prop2}</p>
      <p>prop3 ${this.prop3}</p>

      <p>prop4: ${this.prop4.map((item, index) =>
        html`<span>[${index}]:${item}&nbsp;</span>`)}
      </p>

      <p>prop5:
        ${Object.keys(this.prop5).map(item =>
          html`<span>${item}: ${this.prop5[item]}&nbsp;</span>`)}
      </p>

      <button @click="${this.changeProperties}">change properties</button>
    `;
  }

  changeAttributes() {
    let randomString = Math.floor(Math.random()*100).toString();
    this.setAttribute('myprop', 'myprop ' + randomString);
    this.setAttribute('theprop', 'theprop ' + randomString);
    this.requestUpdate();
  }
  changeProperties() {
    let randy = Math.floor(Math.random()*10);
    let myBool = this.prop3;

    this.prop1 = randy.toString();
    this.prop2 = randy;
    this.prop3 = !myBool;
    this.prop4 = [...this.prop4, randy];
    this.prop5 = Object.assign({}, this.prop5, {[randy]: randy});
  }

  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      console.log(`${propName} changed. oldValue: ${oldValue}`);
    });
  }
}
customElements.define('my-element3', MyElement3);
