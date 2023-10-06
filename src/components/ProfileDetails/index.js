import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  running: 'RUNNING',
}

class Profile extends Component {
  state = {userDetails: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.renderProfileApi()
  }

  renderProfileApi = async () => {
    this.setState({apiStatus: apiStatusConstants.running})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const fetchData = await fetch(url, options)
    if (fetchData.ok === true) {
      const data = await fetchData.json()
      const details = data.profile_details
      const updatedProfile = {
        name: details.name,
        imgUrl: details.profile_image_url,
        bio: details.short_bio,
      }
      console.log(updatedProfile)
      this.setState({
        userDetails: updatedProfile,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {userDetails} = this.state
    const {name, imgUrl, bio} = userDetails

    return (
      <div className="profile-container">
        <div className="profile-card">
          <img src={imgUrl} alt="pro" className="profile-image" />
          <h1 className="profile-name">{name}</h1>
          <p className="profile-bio">{bio}</p>
        </div>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="profile-container">
      <button className="retry-btn" type="button">
        Retry
      </button>
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.running:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}
export default Profile
