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

    // create a Firebase reference
    const dbRef = firebase.database().ref();
    // listen to the value change and use `response` as the db value
    dbRef.on('value', (response) => {

      const newState = [];
      const data = response.val();

      for (const key in data) {
        console.log(data[key])
        newState.push({
          key: key,
          note: data[key].note,
          rep: data[key].rep,
          date: data[key].date
        });
      }

      // update our React state for notes
      this.setState({
        notes: newState
      });
      console.log(newState)
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
    const date = moment().format('MMM Do LT');

    const submission = {
      rep: this.state.repList,
      note: this.state.noteInput,
      date: date
    }

    console.log(submission)

    dbRef.push(submission);

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
          <div className="wrapper">
            <section className="newPracticeSession">
              <div className="formContainer">
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
          </div>
          <div className="listContainer">
            <div className="wrapper">
              <ul>
                {this.state.notes.map((note) => {
                  return (
                    <li key={note.key}>
                      <div className="dateContainer">
                        <h4>{note.date}</h4>
                        <button onClick={() => this.removeNote(note.key)}><FontAwesomeIcon className="icon" icon={faTimes} /></button>
                      </div>

                      <div className="notesContainer">
                        <div className="repContainer">
                          <h3>Repertoire</h3>
                          <p>{note.rep}</p>
                        </div>
                        <div className="noteContainer">
                          <h3>Notes</h3>
                          <p>{note.note}</p>
                        </div>
                      </div>
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
