import { useNavigation } from "react-router-dom"

function SubmitBtn({text}) {
  const navigate = useNavigation()
  const isSubmitting = navigate.state === 'submitting'

    return (
      <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>
        {isSubmitting? 'Submitting...' : text}
      </button>
    )
}
export default SubmitBtn