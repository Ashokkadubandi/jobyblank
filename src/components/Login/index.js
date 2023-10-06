import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    error: '',
  }

  changeUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  changePasword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  renderError = data => {
    this.setState({error: data})
  }

  renderHomePage = jwt => {
    Cookies.set('jwt_token', jwt, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  getLoginDetails = async event => {
    event.preventDefault()
    const {username, password} = this.state

    const userDetails = {username, password}

    const loginApi = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const fetchingData = await fetch(loginApi, options)
    const response = await fetchingData.json()
    if (fetchingData.ok === true) {
      this.renderHomePage(response.jwt_token)
    } else {
      this.renderError(response.error_msg)
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const {error} = this.state
    return (
      <div className="login-route">
        <div className="form-div">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="web-logo"
          />
          <form className="form" onSubmit={this.getLoginDetails}>
            <label htmlFor="input1"> USERNAME </label>
            <input
              className="input"
              placeholder="Username"
              onChange={this.changeUsername}
            />
            <label htmlFor="input1"> PASSWORD </label>
            <input
              className="input"
              placeholder="Password"
              onChange={this.changePasword}
            />
            <button type="submit" className="form-btn">
              Login
            </button>
            <p className="error-msg">{error !== '' ? error : ''}</p>
          </form>
        </div>
      </div>
    )
  }
}
export default Login
