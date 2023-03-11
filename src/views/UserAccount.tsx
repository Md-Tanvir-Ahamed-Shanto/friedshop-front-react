import React, { SyntheticEvent, useState } from 'react'
import Header from './includes/Header'
import Footer from './includes/Footer'

const UserDashboard = () => {
    return (
        <div className="user-dashboard p-3 border border-2 text-black">
            <h3>Dashboard</h3>
            <p className="opacity-75">From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details</p>
        </div>
    )
}

const UserOrders = () => {
    return (
        <div className="user-orders p-3 border border-2 text-black">
            <h3>Orders</h3>
            <div className="table-responsive">
                <table className="table table-default table-bordered text-center">
                    <thead>
                        <tr>
                            <th scope="col">Commande</th>
                            <th scope="col">Date</th>
                            <th scope="col">Status</th>
                            <th scope="col">Total</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="">
                            <td scope="row">1</td>
                            <td>01 Dec 2023</td>
                            <td>R1C3</td>
                            <td>$250</td>
                            <td><a href="#" className='text-info'>Voir</a></td>
                        </tr>
                        <tr>
                            <td scope="row">2</td>
                            <td>01 Dec 2023</td>
                            <td>R1C3</td>
                            <td>$250</td>
                            <td><a href="#" className='text-info'>Voir</a></td>
                        </tr>
                        <tr>
                            <td scope="row">3</td>
                            <td>01 Dec 2023</td>
                            <td>R1C3</td>
                            <td>$250</td>
                            <td><a href="#" className='text-info'>Voir</a></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
        </div>
    )
}

const UserAddress = () => {

    return (
        <div className="user-address p-3 border border-2 text-black">
            <h3>Billing Address</h3>
            <div className="opacity-75">
                <h6>BP 065 Market, Cotonou</h6>
                <h6>BP 452 Hotel, Porto-Novo</h6>
                <h6><span className="fw-bold">Mobile:</span>(229) 96457545</h6>
            </div>
        </div>
    )
}

const UserDetails = () => {

    return (
        <div className="user-edit-details p-3 border border-2 text-black">
            <h3>Account Details</h3>
            <form action="" method="post" className="checkout-service p-3">
                    <div className='d-flex gap-2'>
                        <label className='w-50'>
                            <span>First Name</span>
                            <input type="text" name="firstname" className="form-control w-100 rounded-0 p-2" placeholder='First Name'/>
                        </label>
                        <label className='w-50'>
                            <span>Last Name</span>
                            <input type="text" name="lastname" className="form-control w-100 rounded-0 p-2" placeholder='Last Name'/>
                        </label>
                    </div>
                    <div className='my-4'>
                        <label className='w-100'>
                            <span>Email</span>
                            <input type="email" name="email" className="form-control w-100 rounded-0 p-2" placeholder='Email'/>
                        </label>
                    </div>
                    <div>
                        <label className='w-100'>
                            <span>Address</span>
                            <input type="text" name="firstname" className="form-control w-100 rounded-0 p-2" placeholder='Address'/>
                        </label>
                    </div>
                    <div className='my-4'>
                        <label className='w-100'>
                            <span>Password</span>
                            <input type="password" name="password" className="form-control w-100 rounded-0 p-2" placeholder='Password'/>
                        </label>
                    </div>
                    <div>
                        <label className='w-100'>
                            <span>Confirm Password</span>
                            <input type="password" name="confirm_password" className="form-control w-100 rounded-0 p-2" placeholder='Confirm Password'/>
                        </label>
                    </div>
                    <div className='my-4'>
                        <label>
                            <span>Description</span>
                        </label>
                        <textarea name="description" cols={100} rows={10} className='w-100 p-2 border' placeholder='Description'></textarea>
                    </div>
                    <div><a href="#" className="fd-btn w-25 text-center">SAVE NOW</a></div>
                </form>
        </div>
    )
}

const UserAccount = () => {

    const [mainComponent, setMainComponent] = useState(<UserDashboard />)

    const setDashboard = (e : SyntheticEvent) => {
        e.preventDefault();
        setMainComponent(<UserDashboard />)
    };

    const setOrder = (e : SyntheticEvent) => {
        e.preventDefault();
        setMainComponent(<UserOrders />)
    };

    const setUserAddress = (e : SyntheticEvent) => {
        e.preventDefault();
        setMainComponent(<UserAddress />)
    }

    const setDetails = (e : SyntheticEvent) => {
        e.preventDefault();
        setMainComponent(<UserDetails />)
    }
    // const setLogout;

  return (
    <>
        <Header />
        <div className='d-flex justify-content-between gap-3 px-5 my-5'>
            <aside className='user-page w-25 fw-bold border border-1 h-25'>
                <div onClick={setDashboard}><a href='#' className="d-block p-3 text-black">Dashboard<i className="bi bi-house float-end"></i></a></div>
                <div onClick={setOrder}><a href='#' className="d-block p-3 text-black">Orders<i className="bi bi-newspaper float-end"></i></a></div>
                <div onClick={setUserAddress}><a href='#' className="d-block p-3 text-black">Address<i className="bi bi-geo-alt float-end"></i></a></div>
                <div onClick={setDetails}><a href='#' className="d-block p-3 text-black">Account Details<i className="bi bi-person float-end"></i></a></div>
                <div onClick={setDashboard}><a href='#' className="d-block p-3 text-black">Logout<i className="bi bi-person-slash float-end"></i></a></div>
            </aside>
            <div className="w-75 mt-3">{mainComponent}</div>
        </div>
        <Footer/>
    </>
  )
}

export default UserAccount