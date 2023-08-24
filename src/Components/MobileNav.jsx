import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import { Button } from "../Components";

const MobileNav = ({ handleToggle, toggledElementRef }) => {
  return (
    <div
      ref={toggledElementRef}
      className=" bg-primary-color h-[70px] flex items-center justify-evenly"
    >
      <NavLink
        onClick={() => handleToggle()}
        className={`dark:text-white`}
        to="./"
      >
        Home
      </NavLink>
      <NavLink
        onClick={() => handleToggle()}
        className={`dark:text-white`}
        to="./Profile"
      >
        Profile
      </NavLink>
      <NavLink
        onClick={() => handleToggle()}
        className={`dark:text-white`}
        to="/d-mail"
      >
        D-Mail
      </NavLink>
      <Button className="overflow-auto max-w-[195px]" />
    </div>
  );
};

MobileNav.propTypes = {
  handleToggle: PropTypes.func,
  toggledElementRef: PropTypes.any,
};

export default MobileNav;
