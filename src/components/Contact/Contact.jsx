import { FaPhone } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import css from "./Contact.module.css";
import { LuUserMinus } from "react-icons/lu";
import { LiaUserEditSolid } from "react-icons/lia";
import { useDispatch } from "react-redux";
import { setContactForEdit } from "../../redux/contacts/slice";
import {
  Avatar,
  Card,
  CardActions,
  CardHeader,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Contact = ({ contact, openModal }) => {
  const { _id, name, phoneNumber } = contact;
  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(setContactForEdit({ _id, name, phoneNumber }));
  };

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children:
        name.split(" ").length === 1
          ? name[0]
          : `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  return (
    <li className={css.listItem}>
      <Card sx={{ width: 320 }}>
        <CardHeader
          avatar={
            <Avatar
              {...stringAvatar(name)}
              //! src={contact.avatar} //доробити бек, і доати до фронту
              alt={name}
              aria-label="contact-item"
            />
          }
          // action={
          //   <IconButton aria-label="settings">
          //     <MoreVertIcon />
          //   </IconButton>
          // }
          title={name}
          subheader={phoneNumber}
        />

        <CardActions disableSpacing>
          <IconButton aria-label="edit" onClick={handleEdit}>
            <EditIcon />
          </IconButton>

          <IconButton aria-label="delete" onClick={() => openModal(_id)}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </li>
    // <li className={css.listItem}>
    //   <div className={css.leftWrapper}>
    //     <div className={css.nameWrapper}>
    //       <FaUser />
    //       <span className={css.name}>{name}</span>
    //     </div>
    //     <div className={css.numberWrapper}>
    //       <FaPhone />
    //       <span className={css.number}>{phoneNumber}</span>
    //     </div>
    //   </div>
    //   <div className={css.btnWrapper}>
    //     <button className={css.btnDelete} onClick={() => openModal(_id)}>
    //       <LuUserMinus className={css.deleteIcon} />
    //       Delete
    //     </button>

    //     <button className={css.btnEdit} onClick={handleEdit}>
    //       <LiaUserEditSolid className={css.editIcon} />
    //       Edit
    //     </button>
    //   </div>
    // </li>
  );
};

export default Contact;
