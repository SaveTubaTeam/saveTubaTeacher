import React from 'react';
import '../App.css';

const Profile = () => {
    return (
        <div className="profile-container" style ={{fontFamily: "Montserrat, sans-serif"}}>
            <h1 className="profile-name">James Chang</h1>
            <div className="profile-info">
                <h2 className="profile-heading">Classes</h2>
                <ul className="profile-class-list">
                    <li className="profile-class-item">
                        Class 1 - Class Code 1
                    </li>
                    <li className="profile-class-item">
                        Class 2 - Class Code 2
                    </li>
                    <li className="profile-class-item">
                        Class 3 - Class Code 3
                    </li>
                </ul>
            </div>
            <div className="profile-info">
                <h2 className="profile-heading">Contact</h2>
                <p className="profile-email">Email: teacher@example.com</p>
                <p className="profile-password">Password: ********</p>
                <button className="profile-reset-button">Reset Password</button>
            </div>
        </div>
    );
};

export default Profile;