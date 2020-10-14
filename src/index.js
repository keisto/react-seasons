import React from 'react'
import ReactDOM from 'react-dom'
import SeasonDisplay from './SeasonDisplay'
import Spinner from './Spinner'

class App extends React.Component {
    state = {
        latitude: null,
        longitude: null,
        error: ''
    }

    componentDidMount () {
        navigator.geolocation.getCurrentPosition(
            position => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })
            },
            error => this.setState({ error: error.message })
        )
    }

    renderContent () {
        if (this.state.error && !this.state.latitude) {
            return <p>Error: { this.state.error }</p>
        }

        if (!this.state.error && this.state.latitude) {
            return (
                <SeasonDisplay latitude={ this.state.latitude } />
            )
        }

        return <Spinner message="Please accept location request." />
    }

    render () {
        return (
            <div className="dummyClass">
                {this.renderContent()}
            </div>
        )
    }
}

ReactDOM.render(<App />, document.querySelector('#root'))
