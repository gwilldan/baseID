import { BsTwitter, BsDiscord } from "react-icons/bs";
import { FaMedium } from "react-icons/fa";

function Footer() {
  const LinkStyle =
    "dark:font-semibold dark:text-white text-[18px] hover:text-priBlue";

  return (
    <div className="pt-16 dark:font-semibold dark:text-white py-4 px-small md:px-Large grid justify-center md:grid-cols-2 md:justify-items-between">
      <p className="font-semibold"> 2023 Base ID</p>
      <div className="flex justify-center md:justify-end gap-3 my-1">
        <a href="#">
          <BsTwitter className={LinkStyle} />
        </a>
        <a href="#">
          <BsDiscord className={LinkStyle} />
        </a>
        <a href="#">
          <FaMedium className={LinkStyle} />
        </a>
      </div>
    </div>
  );
}

export default Footer;
