import { Helmet } from "react-helmet"
import Layout from "../components/Layout"

const Profile = () => {
    return(
        <div>
            <Helmet>
                <title>profile</title>
            </Helmet>
            profile
        </div>
    )
}
Profile.layout = page => <Layout user={page.props.user} children={page} />
export default Profile