import '../StyleCode/AdminDashboard.css';
import { useNavigate } from 'react-router-dom';

function Header() {

    const navigate = useNavigate();
    return (
        <div >
            <div className="header-div">
                    <div className="left-arrow">
                        <button onClick={() => navigate('/AdminPage')}><i class="fa-solid fa-angles-left"></i></button>
                    </div>
                    <div className='right-content gap-2'>
                        <form class="form-inline my-2 my-lg-0">
                            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" style={{width: "250px"}} />
                            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
                        <button class="head-btn"><i class="fa-solid fa-moon"></i></button>
                        <button class="head-btn"><i class="fa-solid fa-gear"></i></button>
                        <div className='col-sm'>
                        <button type="button" class="btn btn-primary position-relative" style={{height:"2.5rem", backgroundColor: "#ffffff", color: "#000"}}>
                        <i class="fa-solid fa-bell"></i>
                            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                99+
                                <span class="visually-hidden">unread messages</span>
                            </span>
                        </button>
                        </div>
                        <button class="head-btn" style={{marginLeft: "1rem"}}>
                            <img src="Boy.png" style={{height: "1.5rem", width: "1.5rem"}}/>
                        </button>
                    </div>
                </div>
        </div>
    );
}

export default Header;