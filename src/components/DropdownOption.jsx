import classes from "./DropdownOption.module.css";
import checkmark from "../assets/images/icon-checkmark.svg";
import clsx from "clsx";

const DropdownOption = ({ name, checked }) => {
  return (
    <>
      <div className={clsx(classes.dropdownContainer, { [classes.dropdownSelected]: checked })}>
        <p className={classes.dropdownName}>{name}</p>
        {checked ? <img src={checkmark} /> : <></>}
      </div>
    </>
  );
};

export default DropdownOption;
