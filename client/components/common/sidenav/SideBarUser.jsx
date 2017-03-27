/* eslint-disable indent */
import React, { PropTypes } from 'react';

export function getRole(roleId) {
  switch (roleId) {
    case 1:
      return 'Owner';
    case 2:
      return 'Administrator';
    default:
      return 'User';
  }
}

const SideBarUser = ({ firstName, lastName, roleId, logout }) => {
  const role = getRole(roleId);
  return (
    <div className="dropdown profile-element">
      <a data-toggle="dropdown" className="dropdown-toggle" href="#">
        <span className="clear"> <span className="block m-t-xs"> <strong className="font-bold">{firstName} {lastName}</strong>
        </span>
          <span className="text-muted text-xs block">
            {role} <b className="caret" />
          </span>
        </span>
      </a>
      <ul className="dropdown-menu animated fadeInRight m-t-xs">
        <li><a className="logout-link-side-nav" onClick={logout}>Logout</a></li>
      </ul>
    </div>
  );
};


SideBarUser.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  roleId: PropTypes.number.isRequired,
  logout: PropTypes.func.isRequired
};

export default SideBarUser;
