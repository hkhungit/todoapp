import React, { Component } from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Form from './components/Form'
import Lists from './components/Lists'

injectTapEventPlugin()
const styles = {
  container: {
    width: '80%',
    display: 'flex',
    flexDirection: 'column'
  },
  section: {
    display: 'flex',
    marginBottom: 50,
    justifyContent: 'center'
  }
}

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div style={styles.container}>
          <section style={styles.section}>
            <Form/>
          </section>
          <section style={styles.section}>
            <Lists/>
            <Lists completed/>
          </section>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
