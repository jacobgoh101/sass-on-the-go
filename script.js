class Test extends React.Component {
  render(){
    return (
      <div className="row textarea">
      <div className="scss-input-wrapper">
      <div className="form-group">
      <label htmlFor="comment">SCSS:</label>
      <textarea className="form-control scss-input" id="scss-input" defaultValue={""} />
      </div>
      </div>
      <div className="css-output-wrapper">
      <div className="form-group">
      <label htmlFor="comment">CSS:</label>
      <textarea className="form-control css-output" id="css-output" defaultValue={""} />
      </div>
      </div>
      </div>
    );
  }
}


ReactDOM.render(<Test />, document.getElementById('root'));
