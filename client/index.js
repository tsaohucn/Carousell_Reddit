import React from 'react'
import ReactDOM from 'react-dom'

class HelloMessage extends React.Component {
  render() {
    return <div>Hello {this.props.name}</div>;
  }
}

export default HelloMessage

ReactDOM.render(<HelloMessage name="Tsao" />, document.getElementById('app'))