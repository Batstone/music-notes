import React, { Component } from 'react';
import firebase from './firebase.js';
import Header from './Header.js';
import Footer from './Footer.js';
import moment from 'moment';


class App extends Component {

  constructor() {
    super();
    this.state = {
      notes: [],
      pieceInput: '',
      noteInput: '',
    }
  }

  componentDidMount() {

    // create a Firebase reference
    const dbRef = firebase.database().ref();
    // listen to the value change and use `response` as the db value
    dbRef.on('value', (response) => {

      const newState = [];
      const data = response.val();
      const date = moment().format('MMM Do LT');

      for (const key in data) {

        newState.push({
          key: key,
          note: data[key],
          time: date
        });
      }

      // update our React state for books
      this.setState({
        notes: newState
      });
    });

  }

  handleChange = (e) => {
    this.setState({
      userInput: e.target.value
    })
  }

  handleClick = (e) => {
    e.preventDefault();

    const dbRef = firebase.database().ref();

    dbRef.push(this.state.userInput);

    this.setState({
      userInput: '',
    });
  }

  removeNote = (noteKey) => {
    const dbRef = firebase.database().ref();

    dbRef.child(noteKey).remove();
  }

  render() {

    return (
      <div className="App">
        <Header />
        <main>
          <div class="wrapper">
            <section class="new-practice-session">
              <div class="form-container">
                <form action="submit">
                  <label htmlFor="newNote">Log a new pracitce session</label>
                  <textarea type="textarea" id="newNote"
                    onChange={this.handleChange}
                    value={this.state.userInput}>
                  </textarea>
                  <button onClick={this.handleClick}>Submit</button>
                </form>
              </div>
            </section>
            <div class="list-container">
              <ul>
                {this.state.notes.map((note) => {
                  return (
                    <li key={note.key}>
                      <h4>{note.time}</h4>
                      <p>{note.note}</p>
                      <button onClick={() => this.removeNote(note.key)}>X</button>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
