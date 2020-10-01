import React, { Component } from 'react';
import firebase from './firebase.js';
import Header from './Header.js';
import Footer from './Footer.js';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { faMinus } from '@fortawesome/free-solid-svg-icons'

class App extends Component {

  constructor() {
    super();
    this.state = {
      notes: [],
      repList: '',
      noteInput: '',
      deleteNotes: false
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
        newState.push({
          key: key,
          note: data[key].note,
          rep: data[key].rep,
          date: data[key].date
        });
      }

      // reversing the array so the notes appear in chronological order
      const reverse = newState.reverse()

      // update our React state for notes
      this.setState({
        notes: reverse
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

    const rep = document.getElementById('repList')
    const note = document.getElementById('newNote')
    const button = document.querySelector('.submitBtn')

    if (this.state.repList === '' || this.state.noteInput === '') {
      rep.placeholder = 'Please enter repertoire details'
      note.placeholder = 'Please enter rehearsal notes'
      button.style.backgroundColor = 'red';
    } else {
      rep.placeholder = 'Enter repertoire details'
      note.placeholder = 'Enter rehearsal notes'
      button.style.backgroundColor = '#4a5859'
      // Firebase call
      const dbRef = firebase.database().ref();

      // Getting a timestamp using the moment.js library
      const date = moment().format('MMM Do LT');

      // The object that is pushed to firebase
      const submission = {
        rep: this.state.repList,
        note: this.state.noteInput,
        date: date
      }

      dbRef.push(submission);

      // Reset the state
      this.setState({
        repList: '',
        noteInput: '',
      });
    }
  }

  minimizeNote = (e) => {
    // storing the target of the click event
    const button = e.target
    const note = button.parentNode.parentNode
    const noteDetails = button.parentNode.nextSibling

    // Changing the css of the li and the note details containers
    if (e.target.matches('.min')) {
      note.classList.toggle('border')
      noteDetails.classList.toggle('noteDetails')
    }
  }

  // Method to remove the note from firebase
  removeNote = (noteKey) => {
    const dbRef = firebase.database().ref();

    dbRef.child(noteKey).remove();
  }

  render() {

    return (
      <div className="App">

        <Header />

        <div className="bannerImg">
          <div className="bannerTextContainer">
            <div className="bannerText">
              <h2>Take notes during rehearsal and track your progress ♬</h2>
            </div>
          </div>
        </div>

        <main>

          <div className="wrapper">
            <section className="newPracticeSession">
              <div className="formContainer">
                <form action="submit">
                  <label htmlFor="newNote">Repertoire</label>
                  <textarea type="textarea" name="repList" id="repList" placeholder="Enter repertoire details"
                    onChange={this.handleChange}
                    value={this.state.repList}>
                  </textarea>
                  <label htmlFor="newNote">Rehearsal Notes</label>
                  <textarea type="textarea" name="noteInput" id="newNote" placeholder="Enter rehearsal notes"
                    onChange={this.handleChange}
                    value={this.state.noteInput}>
                  </textarea>
                  <button className="submitBtn" onClick={this.handleClick}>Submit</button>
                </form>
              </div>
            </section>
          </div>

          <div className="listContainer">
            <div className="wrapper">
              <ul>
                {this.state.notes.map((note) => {
                  return (
                    <li key={note.key} className="border">
                      <div className="dateContainer" onClick={(e) => this.minimizeNote(e, note.key)}>
                        <h3><span>♫</span>{note.date}</h3>
                        <button className="min iconMinus"><FontAwesomeIcon icon={faMinus} /></button>
                        <button className="iconDelete" onClick={() => this.removeNote(note.key)}><FontAwesomeIcon icon={faTimes} /></button>
                      </div>
                      <div className="notesContainer">
                        <div className="repContainer">
                          <h4>Repertoire</h4>
                          <p>{note.rep}</p>
                        </div>
                        <div className="noteContainer">
                          <h4>Notes</h4>
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