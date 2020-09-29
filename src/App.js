import React, { Component } from 'react';
import firebase from './firebase.js';
import Header from './Header.js';
import Footer from './Footer.js';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'


class App extends Component {

  constructor() {
    super();
    this.state = {
      notes: [],
      repList: '',
      noteInput: '',
    }
  }

  componentDidMount() {

    const date = moment().format('MMM Do LT');

    // create a Firebase reference
    const dbRef = firebase.database().ref();
    // listen to the value change and use `response` as the db value
    dbRef.on('value', (response) => {

      const newState = [];
      const data = response.val();


      for (const key in data) {

        newState.push({
          key: key,
          note: data[key],
          time: date
        });
      }

      // update our React state for notes
      this.setState({
        notes: newState
      });
    });
  }

  handleChange = (e) => {

    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleClick = (e) => {
    e.preventDefault();

    const dbRef = firebase.database().ref();

    const submission = {
      rep: this.state.repList,
      note: this.state.noteInput
    }

    console.log(submission)

    dbRef.push(this.state.noteInput);

    this.setState({
      repList: '',
      noteInput: '',
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
                  <label htmlFor="newNote">Repertoire</label>
                  <textarea type="textarea" name="repList" id="repList"
                    onChange={this.handleChange}
                    value={this.state.repList}>
                  </textarea>
                  <label htmlFor="newNote">Practice Notes</label>
                  <textarea type="textarea" id="newNote" name="noteInput"
                    onChange={this.handleChange}
                    value={this.state.noteInput}>
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
                      <button onClick={() => this.removeNote(note.key)}><FontAwesomeIcon className="icon" icon={faTimes} /></button>
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
