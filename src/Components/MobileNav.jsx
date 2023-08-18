import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import { Button } from "../Components";

const MobileNav = ({ setOpen, modalToggle, setModalToggle }) => {
  return (
    <div className=" bg-primary-color h-[70px] flex items-center justify-evenly">
      <NavLink
        onClick={() => setOpen(false)}
        className={`dark:text-white`}
        to="./"
      >
        Home
      </NavLink>
      <NavLink
        onClick={() => setOpen(false)}
        className={`dark:text-white`}
        to="./Profile"
      >
        Profile      
      </NavLink>
      <NavLink
        onClick={() => setOpen(false)}
        className={`dark:text-white`}
        to = "/d-mail"
      >
        D-Mail      
      </NavLink>
      <Button className="overflow-auto max-w-[195px]" modalToggle={modalToggle} setModalToggle={setModalToggle} />
    </div>
  );
};

MobileNav.propTypes = {
  setOpen: PropTypes.func,
  modalToggle: PropTypes.bool,
  setModalToggle: PropTypes.func,
};

export default MobileNav;
