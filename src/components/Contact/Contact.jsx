import { FaPhone } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import css from "./Contact.module.css";
import { LuUserMinus } from "react-icons/lu";
import { LiaUserEditSolid } from "react-icons/lia";
import { useDispatch } from "react-redux";
import { setContactForEdit } from "../../redux/contacts/slice";

const Contact = ({ contact, openModal }) => {
  const { _id, name, phoneNumber } = contact;
  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(setContactForEdit({ _id, name, phoneNumber }));
  };

  return (
    <li className={css.listItem}>
      <div className={css.leftWrapper}>
        <div className={css.nameWrapper}>
          <FaUser />
          <span className={css.name}>{name}</span>
        </div>
        <div className={css.numberWrapper}>
          <FaPhone />
          <span className={css.number}>{phoneNumber}</span>
        </div>
      </div>
      <div className={css.btnWrapper}>
        <button className={css.btnDelete} onClick={() => openModal(_id)}>
          <LuUserMinus className={css.deleteIcon} />
          Delete
        </button>

        <button className={css.btnEdit} onClick={handleEdit}>
          <LiaUserEditSolid className={css.editIcon} />
          Edit
        </button>
      </div>
    </li>
  );
};

export default Contact;
