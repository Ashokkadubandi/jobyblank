import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Profile from '../ProfileDetails'
import Filter from '../JobFilters'
import JobsView from '../JobDetailView'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobDetails extends Component {
  state = {
    jobDetails: [],
    employmentId: '',
    salaryId: '',
    searchValue: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.jobDetailApi()
  }

  jobDetailApi = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const {employmentId, salaryId, searchValue} = this.state
    const URL = `https://apis.ccbp.in/jobs?employment_type=${employmentId}&minimum_package=${salaryId}&search=${searchValue}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const fetching = await fetch(URL, options)

    if (fetching.ok === true) {
      const data = await fetching.json()
      console.log(data)

      const updatedDetails = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDesc: each.job_description,
        location: each.location,
        packageSalary: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        jobDetails: updatedDetails,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  changeEmploymentId = id => {
    console.log(id)
    this.setState({employmentId: id}, this.jobDetailApi)
  }

  changeSalaryId = id => {
    this.setState({salaryId: id}, this.jobDetailApi)
  }

  changeSearch = event => {
    console.log(event.target.value)
    this.setState({searchValue: event.target.value})
  }

  enterEventTrigger = event => {
    if (event.key === 'Enter') {
      this.jobDetailApi()
    }
  }

  applyFilters = () => {
    const {salaryId, employmentId} = this.state
    return (
      <>
        <Filter
          employmentList={employmentTypesList}
          salaryList={salaryRangesList}
          salaryId={salaryId}
          employmentId={employmentId}
          changeEmploymentId={this.changeEmploymentId}
          changeSalaryId={this.changeSalaryId}
        />
      </>
    )
  }

  jobDetailsView = () => {
    const {jobDetails} = this.state
    const JobsLength = jobDetails.length

    return JobsLength > 0 ? (
      <ul className="jobs-detail-ul">
        {jobDetails.map(each => (
          <JobsView eachJob={each} key={each.id} />
        ))}
      </ul>
    ) : (
      <div className="no-data-found">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="no-data-image"
        />
        <h1>No jobs Found</h1>
        <p>We could not find any jobs.Try other filters.</p>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="job-details-ul">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-res">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" className="failure-btn">
        Retry
      </button>
    </div>
  )

  loadingView = () => (
    <div className="no-data-found">
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </div>
  )

  renderApiStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.jobDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.loading:
        return this.loadingView()

      default:
        return null
    }
  }

  render() {
    const {searchValue} = this.state
    return (
      <div className="profile-section">
        <div className="profile-filters">
          <Profile />
          {this.applyFilters()}
        </div>
        {/* Render Job Details here */}
        <div className="job-search-con">
          <input
            type="text"
            className="search-inp"
            value={searchValue}
            onChange={this.changeSearch}
            onKeyDown={this.enterEventTrigger}
          />

          {this.renderApiStatus()}
        </div>
      </div>
    )
  }
}
export default JobDetails
