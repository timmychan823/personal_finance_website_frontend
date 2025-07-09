import { Outlet } from 'react-router-dom'

const BasePageWrapper = () => {
    return (
        <div>
            <Outlet/>
        </div>
    )
}

export default BasePageWrapper

