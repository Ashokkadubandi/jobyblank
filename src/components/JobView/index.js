import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {IoLocationSharp} from 'react-icons/io5'
import {IoIosBriefcase} from 'react-icons/io'
import {AiFillStar} from 'react-icons/ai'
import {FiExternalLink} from 'react-icons/fi'
import Cookies from 'js-cookie'
import Header from '../Header'
import Skills from '../Skills'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobView extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobsData: {},
    skills: [],
    similarJobs: [],
  }

  componentDidMount() {
    console.log('this route is called')
    this.getJobData()
  }

  getJobData = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const jobDetails = data.job_details
      const similar = data.similar_jobs
      const updatedData = {
        companyLogoUrl: jobDetails.company_logo_url,
        companySiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        id: jobDetails.id,
        jobDesc: jobDetails.job_description,
        lifeAtCompany: jobDetails.life_at_company,
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
        title: jobDetails.title,
      }
      const similarJobs = similar.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))

      const skills = jobDetails.skills.map(each => ({
        imageUrl: each.image_url,
        name: each.name,
      }))
      this.setState({
        jobsData: updatedData,
        apiStatus: apiStatusConstants.success,
        skills,
        similarJobs,
      })
    } else if (response.status === 401) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderWithApiCall = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.loading:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  renderH1 = () => {
    const {jobsData} = this.state
    const {lifeAtCompany} = jobsData
    return (
      <div className="life-company">
        <div className="life-at-text-con">
          <h1 className="desc-heading">Life at Company</h1>
          <p className="description">{lifeAtCompany}</p>
        </div>
      </div>
    )
  }

  renderSuccessView = () => {
    const {jobsData, skills} = this.state
    const {
      companyLogoUrl,
      title,
      rating,
      location,
      employmentType,
      packagePerAnnum,
      companySiteUrl,
      jobDesc,
      lifeAtCompany,
    } = jobsData
    console.log(skills)

    return (
      <div className="job-card-container">
        <div className="company-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div className="text-container">
            <h1 className="data-title">{title}</h1>
            <div className="data-rating-con">
              <AiFillStar className="i-font" />
              <p className="rating-font">{rating}</p>
            </div>
          </div>
        </div>
        <div className="package-locate-container">
          <div className="location-container">
            <IoLocationSharp className="i-font-lp" />
            <p className="l-place">{location}</p>

            <IoIosBriefcase className="i-font-lp" />
            <p className="l-place">{employmentType}</p>
          </div>
          <p className="package-per-annum">{packagePerAnnum}</p>
        </div>
        <hr className="hr-white" />
        <div className="desc-target">
          <h1 className="desc-heading">Description</h1>
          <div className="visit-link-con">
            <a href={companySiteUrl} className="t-target">
              Visit
            </a>
            <FiExternalLink className="visit-style" />
          </div>
        </div>
        <p className="description">{jobDesc}</p>
        <h1 className="desc-heading">Skills</h1>
        <ul className="skills-container">
          {skills.map(each => (
            <Skills eachItem={each} key={each.name} />
          ))}
        </ul>
        {/* {this.renderH1()} */}
        <div className="life-company">
          <div className="life-at-text-con">
            <h1 className="desc-heading">Life at Company</h1>
            <p className="description">{lifeAtCompany}</p>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobs-details-bottom-view">
          {this.renderWithApiCall()}
        </div>
      </>
    )
  }
}
export default JobView
