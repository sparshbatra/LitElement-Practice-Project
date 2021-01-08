import { LitElement, html, css } from 'lit-element';
import './my-element2.js';


/**
 * Use this pattern instead.
 */
function headerTemplate(title) {
  return html`<header>${title}</header>`;
}
function articleTemplate(text) {
  return html`<article>${text}</article>`;
}
class MyElement extends LitElement {
  static get styles() {
    // Write styles in standard CSS
    return css`
      * { color: blue; }
      p { font-family: calibri;
        font-style : italic;
      }
    `;
  }
  static get properties(){
    return {
      message: {type: String},
      message2: {type: String},
      

    };
  }
  constructor() {
    super();
    this.message = 'Hi, I am message from properties! I will get updated after 5 seconds!!';
    this.message2 = 'Hi, I will get updated using an event listener and custom event!';
    this.article = {
      title: 'My title',
      text: 'Some text.',
    };
    
    this.changeMessage();

    this.addEventListener('stuff-loaded', (e) => { this.message2 = e.detail } );
    this.loadStuff();
  }
  render() {
    return html`
    <div>
      <p>${this.message}</p>
      <p>${this.message2}</p>
      ${headerTemplate(this.article.title)}
      ${articleTemplate(this.article.text)} 
      <div>
        <my-element2>
          <p slot="otherName">I am from my-element2 component.</p>
        </my-element2>
      </div>
      
  </div>
    `;
  }
  loadStuff() {
    setInterval(() => {
      let loaded = new CustomEvent('stuff-loaded', {
        detail: 'I am updated!'
      });
      this.dispatchEvent(loaded);
    }, 3000);
  }
  changeMessage(){
    setInterval(() => {
      this.message = "changed message";
    }, 3000);

  }
}

customElements.define('my-element', MyElement);
