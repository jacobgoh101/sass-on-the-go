const CssOutput = ({
  css
}) => {
  let compiling = "";
  if( store.getState().compiling ) {
    compiling = (
      <span>
        Compiling&nbsp;&nbsp;&nbsp;
        <i className="fa fa-spinner fa-spin"></i>
      </span>
    );
  }
  return(
    <div className="css-output-wrapper">
      <div className="form-group">
        <label htmlFor="comment">CSS : {compiling}</label>
        <textarea className="form-control css-output" id="css-output" value={css} />
      </div>
    </div>
  );
};

class ScssInput extends React.Component {
  constructor(){
    super();
    this._onChange = this._onChange.bind(this);
  }
  _onChange(e){
    let scss = e.target.value;
    this.props._compileSCSS(scss);
  }
  componentDidMount(){
    let defaultScss = "div { \n width: 100%; \n }";
    this.refs.scssInput.value = defaultScss;
    this.props._compileSCSS(defaultScss);
  }
  render() {
    return(
      <div className="scss-input-wrapper">
        <div className="form-group">
          <label htmlFor="comment">SCSS :</label>
          <textarea className="form-control scss-input" id="scss-input" ref="scssInput" defaultValue={""} onChange={this._onChange} />
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(){
    super();
    this._compileSCSS = this._compileSCSS.bind(this);
  }
  _compileSCSS(scss) {
    store.dispatch({
      type: 'COMPILE',
      scss
    });
  }
  render() {
    return (
      <div className="row textarea">
        <ScssInput _compileSCSS={this._compileSCSS} />
        <CssOutput css={this.props.css} />
      </div>
    );
  }
}

const render = () => {
  let state = store.getState();
  ReactDOM.render(<App
    scss={state.scss}
    css={state.css}
  />, document.getElementById('root'));
};

const codesReducer = (state = {
  scss: "",
  css: "",
  compiling: false
}, action) => {
  switch (action.type) {
    case 'COMPILE':
    let compiling;
    let css;
    switch (action.status) {
      case 'SUCCESS':
      compiling = false;
      //handle css
      css = action.css;
      return {...state, css, compiling};
      break;

      case 'FAILURE':
      compiling = false;
      //handle failureMessage
      css = action.failureMessage;
      return {...state, css, compiling};
      break;

      default:
      compiling = true;
      let scss = action.scss;
      let options = {
        style: Sass.style.expanded
      };
      Sass.compile(scss, options,function(result) {
        if( !result.text ){
          let failureMessage = "ERROR WHILE COMPILING\n";
          failureMessage += "line: " + result.line + "\n";
          failureMessage += "message: " + result.message + "\n";
            store.dispatch({
              type: 'COMPILE',
              status: 'FAILURE',
              failureMessage
            });
        }else{
          store.dispatch({
            type: 'COMPILE',
            status: 'SUCCESS',
            css: result.text
          });
        }
      });
      return {...state, scss, compiling};
    }
    break;

    default:
    return state;
  }
}

const { createStore } = Redux;
const store = createStore(codesReducer);

store.subscribe(function () {
  render();
});
render();
